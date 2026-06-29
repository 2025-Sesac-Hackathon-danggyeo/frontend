import React, { useState } from 'react';
import type { Slide } from '../types';

interface NewScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (script: { title: string; content: string; slides: Slide[] }) => void;
  initialTitle?: string;
  initialSlides?: string[];
  mode?: 'create' | 'edit';
}

// 한글 호환 자모 범위(U+3131–U+318E): 완성형이 아닌 낱자 자음·모음
function hasLooseJamo(text: string): boolean {
  return /[ㄱ-ㆎ]/.test(text);
}

function validate(title: string, slides: string[]) {
  const titleErr = !title.trim()
    ? '제목을 입력해주세요.'
    : hasLooseJamo(title)
    ? '자음 또는 모음만 사용할 수 없습니다. 다시 입력해주세요.'
    : '';

  const slideErrs = slides.map((text) =>
    hasLooseJamo(text) ? '자음 또는 모음만 사용할 수 없습니다. 다시 입력해주세요.' : ''
  );

  return { titleErr, slideErrs };
}

const NewScriptModal: React.FC<NewScriptModalProps> = ({ isOpen, onClose, onSave, initialTitle = '', initialSlides = [''], mode = 'create' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [slides, setSlides] = useState<string[]>(initialSlides.length > 0 ? initialSlides : ['']);
  const [titleError, setTitleError] = useState('');
  const [slideErrors, setSlideErrors] = useState<string[]>(['']);
  const [triedSave, setTriedSave] = useState(false);

  if (!isOpen) return null;

  /* ── 슬라이드 조작 ── */
  const updateSlide = (i: number, text: string) => {
    const next = slides.map((v, idx) => (idx === i ? text : v));
    setSlides(next);
    if (triedSave) {
      const { slideErrs } = validate(title, next);
      setSlideErrors(slideErrs);
    }
  };

  const addSlide = () => {
    setSlides((s) => [...s, '']);
    setSlideErrors((e) => [...e, '']);
  };

  const removeSlide = (i: number) => {
    if (slides.length === 1) return;
    const next = slides.filter((_, idx) => idx !== i);
    setSlides(next);
    setSlideErrors((e) => e.filter((_, idx) => idx !== i));
  };

  /* ── 제목 변경 ── */
  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (triedSave) {
      const { titleErr } = validate(text, slides);
      setTitleError(titleErr);
    }
  };

  /* ── 저장 ── */
  const handleSave = () => {
    setTriedSave(true);
    const { titleErr, slideErrs } = validate(title, slides);
    setTitleError(titleErr);
    setSlideErrors(slideErrs);

    if (titleErr || slideErrs.some(Boolean)) return;

    onSave({
      title,
      content: slides[0] || '',
      slides: slides.map((text, i) => ({
        order: i + 1,
        title: `슬라이드 ${i + 1}`,
        text,
      })),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-[20px] w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto p-10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <h2 className="text-center text-blue-600 text-2xl font-bold mb-8">{mode === 'edit' ? '대본 수정' : '새 대본 작성'}</h2>

        {/* 제목 */}
        <div>
          <input
            type="text"
            className={`w-full h-[52px] border rounded-lg px-4 text-base text-[#1A1A2E] bg-white placeholder:text-gray-500 focus:outline-none transition-colors ${
              titleError ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            placeholder="대본 제목을 입력하세요"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          {titleError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{titleError}</p>
          )}
        </div>

        {/* 슬라이드 목록 */}
        <div className="flex flex-col gap-4 mt-4">
          {slides.map((text, i) => (
            <div key={i}>
              {/* 슬라이드 레이블 + 삭제 버튼 */}
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold text-gray-500">슬라이드 {i + 1}</p>
                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlide(i)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-150 p-1 rounded"
                    aria-label={`슬라이드 ${i + 1} 삭제`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                )}
              </div>

              <textarea
                className={`w-full h-[160px] border rounded-lg px-4 py-3 resize-y text-base text-[#1A1A2E] bg-white placeholder:text-gray-500 focus:outline-none transition-colors font-[inherit] ${
                  slideErrors[i] ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
                placeholder={`슬라이드 ${i + 1}의 발표 내용을 입력하세요.`}
                value={text}
                onChange={(e) => updateSlide(i, e.target.value)}
              />
              {slideErrors[i] && (
                <p className="text-red-500 text-xs mt-1 ml-1">{slideErrors[i]}</p>
              )}
            </div>
          ))}
        </div>

        {/* 슬라이드 추가 */}
        <button
          className="w-full h-12 border-[1.5px] border-blue-600 bg-transparent text-blue-600 rounded-lg mt-4 flex justify-center items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-blue-600/5 text-sm font-medium"
          onClick={addSlide}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          슬라이드 추가
        </button>

        {/* 액션 버튼 */}
        <div className="flex flex-row gap-4 mt-8">
          <button
            className="flex-1 h-12 border border-blue-600 bg-transparent text-blue-600 rounded-lg cursor-pointer font-[inherit] text-base font-medium transition-colors duration-200 hover:bg-blue-600/5"
            onClick={onClose}
            type="button"
          >
            취소
          </button>
          <button
            className="flex-[2] h-12 bg-blue-600 text-white rounded-lg cursor-pointer font-[inherit] text-base font-medium transition-colors duration-200 hover:bg-blue-700"
            onClick={handleSave}
            type="button"
          >
            {mode === 'edit' ? '수정 완료' : '대본 저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewScriptModal;
