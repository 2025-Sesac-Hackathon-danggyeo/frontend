import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewScriptModal from '../components/NewScriptModal';
import { useScript } from '../hooks/useScript';
import { practiceApi } from '../api/practice';
import type { PracticeFeedback, FeedbackCategoryDetail, WordHighlight, Slide } from '../types';

type RecordingState = 'idle' | 'recording' | 'uploading' | 'done' | 'error' | 'timeout';

// ── Mock (백엔드 연결 전 UI 확인용) ──────────────────────────────────
const MOCK_FEEDBACK: PracticeFeedback = {
  score: 82,
  volumeComment: '기준 음성보다 조용한 편입니다.',
  volumeDetail: {
    commentEmphasis: '조용한 편',
    highlights: [{ word: '안녕하세요.', type: 'below' }, { word: '여러분', type: 'above' }],
    legendAbove: '기준보다 큰 구간', legendBelow: '기준보다 작은 구간',
    detail: '"안녕하세요"는 기준보다 40% 작게 들렸고, "여러분"은 20% 더 크게 들렸어요.\n이 부분들을 조금 더 신경써서 연습하면 좋을 것 같아요!',
  },
  paceComment: '기준 음성보다 더 빠른 편입니다.',
  paceDetail: {
    commentEmphasis: '더 빠른 편',
    highlights: [{ word: '여러분', type: 'above' }, { word: '안녕하세요.', type: 'above' }],
    legendAbove: '기준보다 빠른 구간', legendBelow: '기준보다 느린 구간',
    detail: '전체적으로 발화 속도가 기준보다 약 15% 빠릅니다.\n천천히 또박또박 말하는 연습을 해보세요.',
  },
  pitchComment: '기준 음성보다 음정 변화가 더 큰 편입니다.',
  pitchDetail: {
    commentEmphasis: '음정 변화가 더 큰 편',
    highlights: [{ word: '여러분', type: 'above' }],
    legendAbove: '기준보다 높은 구간', legendBelow: '기준보다 낮은 구간',
    detail: '"여러분" 부분에서 음정이 기준보다 높게 올라갔어요.\n자연스러운 억양을 유지해보세요.',
  },
  clarityComment: '기준 음성과 비슷한 발음 정확도입니다.',
  clarityDetail: {
    commentEmphasis: '비슷한 발음 정확도',
    highlights: [],
    legendAbove: '발음 불명확 구간', legendBelow: '발음 명확 구간',
    detail: '전반적으로 발음이 명확합니다. 계속 유지해주세요!',
  },
  suggestions: [],
};

// ── 분석 카테고리 정의 ────────────────────────────────────────────────
const ANALYSIS_LABELS: {
  key: string;
  label: string;
  commentKey: keyof PracticeFeedback;
  detailKey: keyof PracticeFeedback;
}[] = [
  { key: 'volume',  label: '말의 크기',     commentKey: 'volumeComment',  detailKey: 'volumeDetail'  },
  { key: 'pace',    label: '말의 빠르기',   commentKey: 'paceComment',    detailKey: 'paceDetail'    },
  { key: 'pitch',   label: '말의 높낮이',   commentKey: 'pitchComment',   detailKey: 'pitchDetail'   },
  { key: 'clarity', label: '발음의 정확성', commentKey: 'clarityComment', detailKey: 'clarityDetail' },
];

// ── 헬퍼 함수들 ──────────────────────────────────────────────────────
function splitSentences(text: string): string[] {
  return text.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean);
}

function formatTime(sec: number) {
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

function renderComment(comment: string, emphasis: string) {
  const idx = emphasis ? comment.indexOf(emphasis) : -1;
  if (idx === -1) return <span className="text-[14px] text-gray-600">{comment}</span>;
  return (
    <span className="text-[14px] text-gray-600">
      {comment.slice(0, idx)}
      <strong className="text-blue-600 font-bold">{emphasis}</strong>
      {comment.slice(idx + emphasis.length)}
    </span>
  );
}

function renderHighlightedSentence(sentence: string, highlights: WordHighlight[]) {
  return sentence.split(' ').map((word, i, arr) => {
    const clean = word.replace(/[.!?。,]$/, '');
    const hl = highlights.find(h => h.word === clean || h.word === word);
    const color = hl?.type === 'above' ? 'text-orange-500' : hl?.type === 'below' ? 'text-blue-500' : 'text-[#1A1A2E]';
    return (
      <span key={i} className={`font-bold text-[16px] ${color}`}>
        {word}{i < arr.length - 1 ? ' ' : ''}
      </span>
    );
  });
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────
const ScriptDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { script, loading, updateScript } = useScript(id ? Number(id) : undefined);

  const [selectedKey, setSelectedKey]     = useState<string | null>(null);
  const [showModal, setShowModal]         = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [elapsed, setElapsed]             = useState(0);
  const [analyzedMap, setAnalyzedMap]     = useState<Record<string, PracticeFeedback>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // 녹음 관련 ref
  const mediaRecorderRef  = useRef<MediaRecorder | null>(null);
  const chunksRef         = useRef<Blob[]>([]);
  const streamRef         = useRef<MediaStream | null>(null);
  const timerRef          = useRef<ReturnType<typeof setInterval> | null>(null);
  // 클로저 문제 방지: 녹음 시작 시점의 key를 캡처
  const capturedKeyRef    = useRef<string | null>(null);
  // 폴링 취소용 플래그
  const abortPollingRef   = useRef(false);
  // unmount 감지
  const isMountedRef      = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortPollingRef.current = true;
      cleanupStream();
    };
  }, []);

  // 히스토리 로드: 기존 분석 결과를 서버에서 가져와 문장별로 매핑
  useEffect(() => {
    if (!script) return;
    practiceApi.getHistory(script.id).then(sessions => {
      const map: Record<string, PracticeFeedback> = {};
      sessions.forEach(session => {
        if (session.feedback && (session as any).sentenceText) {
          // 서버가 sentenceText를 포함해 반환한다면 key를 찾아 매핑
          const sentenceText = (session as any).sentenceText as string;
          script.slides.forEach(slide => {
            slide.text.split('\n\n').forEach((para, j) => {
              splitSentences(para).forEach(sentence => {
                if (sentence === sentenceText) {
                  const key = `${slide.order}::${j}::${sentence}`;
                  map[key] = session.feedback!;
                }
              });
            });
          });
        }
      });
      if (isMountedRef.current) setAnalyzedMap(prev => ({ ...map, ...prev }));
    }).catch(() => {/* 히스토리 로드 실패는 무시 */});
  }, [script]);

  const selectedSentence = selectedKey?.split('::').slice(2).join('::') ?? null;
  const currentFeedback  = selectedKey ? (analyzedMap[selectedKey] ?? null) : null;

  // ── 스트림 정리 (항상 안전하게) ─────────────────────────────────────
  const cleanupStream = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    try { mediaRecorderRef.current?.stop(); } catch {}
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
  };

  // ── 녹음 시작 ────────────────────────────────────────────────────────
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current  = stream;
      capturedKeyRef.current = selectedKey; // 클로저 문제 방지
      chunksRef.current  = [];

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = handleRecordingDone;
      recorder.start();
      mediaRecorderRef.current = recorder;

      setElapsed(0);
      setRecordingState('recording');
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    } catch {
      setRecordingState('error');
    }
  };

  // ── 녹음 중단 (사용자가 "녹음 완료" 또는 "취소" 클릭) ──────────────
  const handleStopRecording = (cancel = false) => {
    cleanupStream();
    if (cancel) {
      setRecordingState('idle');
    }
    // cancel=false면 onstop → handleRecordingDone 자동 호출
  };

  // ── 녹음 완료 후 업로드 & 폴링 ──────────────────────────────────────
  const handleRecordingDone = async () => {
    const capturedKey = capturedKeyRef.current;
    const capturedSentence = capturedKey?.split('::').slice(2).join('::') ?? '';
    if (!script || !capturedKey || !capturedSentence) return;

    if (!isMountedRef.current) return;
    setRecordingState('uploading');
    abortPollingRef.current = false;

    const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
    try {
      const session = await practiceApi.start(script.id, capturedSentence);
      let result    = await practiceApi.uploadAudio(session.id, blob);

      // 최대 20초(10회 × 2초) 폴링
      const MAX_POLLS = 10;
      for (let i = 0; i < MAX_POLLS && !result.feedback; i++) {
        if (abortPollingRef.current || !isMountedRef.current) return;
        await new Promise(r => setTimeout(r, 2000));
        if (abortPollingRef.current || !isMountedRef.current) return;
        result = await practiceApi.getResult(session.id);
      }

      if (!isMountedRef.current) return;

      if (result.feedback) {
        setAnalyzedMap(prev => ({ ...prev, [capturedKey]: result.feedback! }));
        setRecordingState('done');
      } else {
        // 폴링 소진 — 타임아웃 처리
        setRecordingState('timeout');
      }
    } catch {
      if (isMountedRef.current) setRecordingState('error');
    }
  };

  // ── 모달 닫기 ────────────────────────────────────────────────────────
  const handleCloseModal = (cancelRecording = false) => {
    abortPollingRef.current = true;
    if (cancelRecording) cleanupStream();
    setShowModal(false);
    setRecordingState('idle');
    setElapsed(0);
  };

  const toggleExpand = (key: string) =>
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));

  // ── 로딩 ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16" />
        <Footer />
      </div>
    );
  }

  // ── 렌더링 ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-[#E8ECF1]">
      <Header />
      <main className="flex-1 pt-16 pb-16">
        <div className="max-w-[960px] mx-auto px-8 py-[60px]">

          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-600 mb-5 transition-colors"
          >
            ← 목록으로
          </button>

          {/* 상단 헤더 */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold text-[#1A1A2E]">{script?.title}</h1>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-full px-3 py-1.5 transition-all"
                title="대본 수정"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                수정
              </button>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-all">
                가이드 음성 듣기
              </button>
              <button
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedKey ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                onClick={() => { if (selectedKey) setShowModal(true); }}
                disabled={!selectedKey}
                title={!selectedKey ? '먼저 문장을 선택해주세요' : ''}
              >
                연습 녹음하기
              </button>
            </div>
          </div>

          {!selectedKey && (
            <p className="text-[13px] text-blue-500 mb-4 text-right">왼쪽에서 연습할 문장을 먼저 선택해주세요.</p>
          )}

          {/* 본문 카드 */}
          <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex h-[560px]">

              {/* 왼쪽: 문장 목록 */}
              <div className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
                {script?.slides.map((slide, i) => (
                  <React.Fragment key={slide.order}>
                    {i > 0 && <hr className="border-t border-gray-200 my-1" />}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-semibold text-blue-600 mb-1">{slide.title}</h2>
                      {slide.text.split('\n\n').map((para, j) =>
                        splitSentences(para).map((sentence, k) => {
                          const key = `${slide.order}::${j}::${sentence}`;
                          const isSelected  = selectedKey === key;
                          const isAnalyzed  = Boolean(analyzedMap[key]);
                          return (
                            <div
                              key={`${j}-${k}`}
                              onClick={() => setSelectedKey(isSelected ? null : key)}
                              className={`flex items-start gap-2 rounded-xl px-3 py-2 cursor-pointer transition-all duration-150 select-none border
                                ${isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50 border-transparent'}`}
                            >
                              <p className={`flex-1 leading-[1.7] text-base ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                                {sentence}
                              </p>
                              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-1 text-[10px] font-bold
                                ${isAnalyzed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                ✓
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* 오른쪽: 분석 결과 */}
              <div className="flex-1 bg-[#F4F7FB] border-l border-[#DAEAFF] p-8 flex flex-col overflow-y-auto">
                {currentFeedback ? (
                  <>
                    <p className="text-[11px] text-gray-400 mb-4 text-right">- 기준 음성과의 비교 분석 결과입니다 -</p>
                    <div className="flex flex-col">
                      {ANALYSIS_LABELS.map(({ key, label, commentKey, detailKey }) => {
                        const comment = currentFeedback[commentKey] as string | undefined;
                        if (!comment) return null;
                        const detail = currentFeedback[detailKey] as FeedbackCategoryDetail | undefined;
                        const isOpen = !!expandedItems[key];
                        return (
                          <div key={key} className="border-b border-gray-200 py-4">
                            <p className="text-[15px] font-bold text-[#1A1A2E] mb-1">{label}</p>
                            <button
                              onClick={() => toggleExpand(key)}
                              className="w-full flex items-center justify-between text-left gap-2"
                            >
                              {renderComment(comment, detail?.commentEmphasis ?? '')}
                              <span className={`flex-shrink-0 text-blue-500 text-[11px] transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}>▲</span>
                            </button>
                            {isOpen && detail && (
                              <div className="mt-3 flex flex-col gap-3">
                                <p className="leading-[1.9]">
                                  {renderHighlightedSentence(selectedSentence ?? '', detail.highlights)}
                                </p>
                                <div className="flex items-center gap-5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-6 h-4 rounded bg-orange-400 inline-block flex-shrink-0" />
                                    <span className="text-[12px] text-gray-500">{detail.legendAbove}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-6 h-4 rounded bg-blue-400 inline-block flex-shrink-0" />
                                    <span className="text-[12px] text-gray-500">{detail.legendBelow}</span>
                                  </div>
                                </div>
                                <p className="text-[13px] text-gray-600 leading-[1.8] whitespace-pre-line">{detail.detail}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[12px] text-blue-400 mt-4 text-right font-medium">종합 점수: {currentFeedback.score}점</p>
                  </>
                ) : selectedKey ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-[13px] text-gray-400 text-center leading-[1.8]">
                      선택된 문장을 녹음하면<br />분석 결과가 여기에 표시됩니다.
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-[13px] text-gray-400 text-center">- 문장을 선택해주세요 -</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 대본 수정 모달 */}
      {showEditModal && script && (
        <NewScriptModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={(data: { title: string; content: string; slides: Slide[] }) => {
            updateScript({
              ...script,
              title: data.title,
              content: data.content,
              slides: data.slides,
            });
          }}
          initialTitle={script.title}
          initialSlides={script.slides.map(s => s.text)}
          mode="edit"
        />
      )}

      {/* 녹음 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl shadow-2xl w-[440px] p-8 flex flex-col items-center gap-6">

            {/* 준비 */}
            {recordingState === 'idle' && (
              <>
                <h3 className="text-[18px] font-bold text-[#1A1A2E]">녹음 준비</h3>
                <p className="text-[13px] text-gray-500 text-center leading-[1.8] bg-gray-50 rounded-xl px-4 py-3 w-full">{selectedSentence}</p>
                <p className="text-[12px] text-gray-400">아래 버튼을 눌러 녹음을 시작하세요.</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => handleCloseModal()} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50">취소</button>
                  <button onClick={handleStartRecording} className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500">녹음 시작</button>
                </div>
                <button
                  onClick={() => {
                    if (selectedKey) setAnalyzedMap(prev => ({ ...prev, [selectedKey]: MOCK_FEEDBACK }));
                    setRecordingState('done');
                  }}
                  className="text-[11px] text-gray-300 hover:text-gray-400 underline underline-offset-2 transition-colors"
                >
                  테스트 결과 보기 (백엔드 연결 전 미리보기)
                </button>
              </>
            )}

            {/* 녹음 중 */}
            {recordingState === 'recording' && (
              <>
                <h3 className="text-[18px] font-bold text-[#1A1A2E]">녹음 중</h3>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <span className="absolute w-16 h-16 rounded-full bg-red-100 animate-ping opacity-60" />
                  <span className="w-10 h-10 rounded-full bg-red-500 block" />
                </div>
                <p className="text-[24px] font-mono font-bold text-[#1A1A2E]">{formatTime(elapsed)}</p>
                <p className="text-[13px] text-gray-500 text-center leading-[1.8] bg-gray-50 rounded-xl px-4 py-3 w-full">{selectedSentence}</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => handleStopRecording(true)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50">취소</button>
                  <button onClick={() => handleStopRecording(false)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-400">녹음 완료</button>
                </div>
              </>
            )}

            {/* 업로드/분석 중 */}
            {recordingState === 'uploading' && (
              <>
                <h3 className="text-[18px] font-bold text-[#1A1A2E]">분석 중...</h3>
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-[13px] text-gray-400 text-center">AI가 음성을 분석하고 있습니다.<br />잠시만 기다려주세요.</p>
              </>
            )}

            {/* 완료 */}
            {recordingState === 'done' && (
              <>
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E]">녹음이 완료되었습니다!</h3>
                <p className="text-[13px] text-gray-400">오른쪽 패널에서 분석 결과를 확인하세요.</p>
                <button onClick={() => handleCloseModal()} className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500">확인</button>
              </>
            )}

            {/* 타임아웃 */}
            {recordingState === 'timeout' && (
              <>
                <h3 className="text-[18px] font-bold text-yellow-500">분석이 지연되고 있습니다</h3>
                <p className="text-[13px] text-gray-400 text-center">서버가 아직 분석 중입니다.<br />잠시 후 다시 확인해주세요.</p>
                <button onClick={() => handleCloseModal()} className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50">닫기</button>
              </>
            )}

            {/* 에러 */}
            {recordingState === 'error' && (
              <>
                <h3 className="text-[18px] font-bold text-red-500">오류가 발생했습니다</h3>
                <p className="text-[13px] text-gray-400 text-center">마이크 권한을 확인하거나<br />다시 시도해주세요.</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => handleCloseModal()} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50">닫기</button>
                  <button onClick={() => setRecordingState('idle')} className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500">재시도</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptDetail;
