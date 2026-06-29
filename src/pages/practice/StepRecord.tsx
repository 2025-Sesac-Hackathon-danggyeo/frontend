import { useState, useEffect, useRef, useCallback } from 'react';

interface StepRecordProps {
  stepNumber: number;
  sentence: string;
  onRecordComplete?: () => void;
}

const ORDINALS = ['첫', '두', '세'];

const StepRecord = ({ stepNumber, sentence, onRecordComplete }: StepRecordProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ordinal = ORDINALS[stepNumber - 1] || `${stepNumber}`;

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    onRecordComplete?.();
  }, [onRecordComplete]);

  const startRecording = useCallback(() => { setRecordingTime(0); setIsRecording(true); }, []);

  const handleRecordClick = () => { isRecording ? stopRecording() : startRecording(); };

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    }
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
  }, [isRecording]);

  useEffect(() => {
    setIsRecording(false);
    setRecordingTime(0);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, [stepNumber]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <section className="flex flex-col items-center" id={`step-record-${stepNumber}`}>
      <p className="text-[18px] font-semibold text-blue-600 text-center">
        {ordinal} 번째 문장을 자연스럽게 읽어주세요.
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 my-6 w-full text-center">
        <p className="text-[17px] font-medium text-[#1A1A2E] leading-[1.6] whitespace-nowrap">{sentence}</p>
      </div>

      <div className="flex items-start justify-center gap-12 mt-10">
        {/* 가이드 음성 듣기 */}
        <button
          id={`btn-guide-listen-${stepNumber}`}
          type="button"
          className="flex flex-col items-center cursor-pointer bg-none border-none p-0 group"
        >
          <div className="w-20 h-20 flex items-center justify-center transition-transform duration-250 group-hover:scale-105">
            <img src="/icon-guide-audio.png" alt="가이드 음성" className="w-20 h-20 object-contain" />
          </div>
          <span className="text-sm font-semibold text-blue-600 mt-3">가이드 음성 듣기</span>
        </button>

        {/* 녹음 시작 */}
        <button
          id={`btn-record-${stepNumber}`}
          type="button"
          onClick={handleRecordClick}
          className="flex flex-col items-center cursor-pointer bg-none border-none p-0 group"
        >
          <div className="relative w-20 h-20 flex items-center justify-center transition-transform duration-250 group-hover:scale-105">
            {isRecording && (
              <>
                <span className="absolute -inset-[6px] rounded-full border-[3px] border-indigo-500/50 animate-pulse-ring" />
                <span
                  className="absolute -inset-3 rounded-full border-2 border-indigo-500/25 animate-pulse-ring"
                  style={{ animationDelay: '0.4s' }}
                />
              </>
            )}
            <img src="/icon-precaution-mic.png" alt="녹음" className="w-20 h-20 object-contain" />
          </div>
          <span className="text-sm font-semibold text-indigo-500 mt-3">
            {isRecording ? formatTime(recordingTime) : '녹음 시작'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default StepRecord;
