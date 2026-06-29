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

      <div className="bg-gray-100 rounded-xl px-8 py-6 my-6 max-w-[600px] w-full text-center">
        <p className="text-[17px] font-medium text-[#1A1A2E] leading-[1.6]">{sentence}</p>
      </div>

      <div className="flex items-start justify-center gap-12 mt-10">
        {/* 가이드 음성 듣기 */}
        <button
          id={`btn-guide-listen-${stepNumber}`}
          type="button"
          className="flex flex-col items-center cursor-pointer bg-none border-none p-0 group"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-transform duration-250 group-hover:scale-105">
            <svg className="w-8 h-8 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 32 32">
              <path d="M5 12h4l6-6v20l-6-6H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
              <path d="M20 10a6 6 0 0 1 0 12" />
              <path d="M23 6a10 10 0 0 1 0 20" />
            </svg>
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
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-transform duration-250 group-hover:scale-105">
            {/* Pulse rings when recording */}
            {isRecording && (
              <>
                <span className="absolute -inset-[6px] rounded-full border-[3px] border-indigo-500/50 animate-pulse-ring" />
                <span
                  className="absolute -inset-3 rounded-full border-2 border-indigo-500/25 animate-pulse-ring"
                  style={{ animationDelay: '0.4s' }}
                />
              </>
            )}
            <svg className="w-8 h-8 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 32 32">
              <rect x="11" y="3" width="10" height="16" rx="5" />
              <path d="M7 17a9 9 0 0 0 18 0" />
              <line x1="16" y1="26" x2="16" y2="30" />
              <line x1="12" y1="30" x2="20" y2="30" />
            </svg>
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
