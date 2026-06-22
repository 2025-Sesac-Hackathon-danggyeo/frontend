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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onRecordComplete?.();
  }, [onRecordComplete]);

  const startRecording = useCallback(() => {
    setRecordingTime(0);
    setIsRecording(true);
  }, []);

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRecording]);

  // Reset when stepNumber changes
  useEffect(() => {
    setIsRecording(false);
    setRecordingTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [stepNumber]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="step-record" id={`step-record-${stepNumber}`}>
      <p className="step-record-instruction">
        {ordinal} 번째 문장을 자연스럽게 읽어주세요.
      </p>

      <div className="step-record-sentence-box">
        <p className="step-record-sentence">{sentence}</p>
      </div>

      <div className="step-record-actions">
        {/* 가이드 음성 듣기 */}
        <button
          className="step-record-action"
          id={`btn-guide-listen-${stepNumber}`}
          type="button"
        >
          <div className="step-record-action-circle guide">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              {/* Speaker / Sound icon */}
              <path d="M5 12h4l6-6v20l-6-6H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
              <path d="M20 10a6 6 0 0 1 0 12" />
              <path d="M23 6a10 10 0 0 1 0 20" />
            </svg>
          </div>
          <span className="step-record-action-label guide">가이드 음성 듣기</span>
        </button>

        {/* 녹음 시작 */}
        <button
          className="step-record-action"
          id={`btn-record-${stepNumber}`}
          type="button"
          onClick={handleRecordClick}
        >
          <div
            className={`step-record-action-circle record ${isRecording ? 'recording' : ''}`}
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              {/* Microphone icon */}
              <rect x="11" y="3" width="10" height="16" rx="5" />
              <path d="M7 17a9 9 0 0 0 18 0" />
              <line x1="16" y1="26" x2="16" y2="30" />
              <line x1="12" y1="30" x2="20" y2="30" />
            </svg>
          </div>
          <span className="step-record-action-label record">
            {isRecording ? formatTime(recordingTime) : '녹음 시작'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default StepRecord;
