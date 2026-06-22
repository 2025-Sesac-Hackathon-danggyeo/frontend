const StepStart = () => {
  return (
    <section className="step-start" id="step-start">
      <h2 className="step-start-title">녹음 유의사항</h2>
      <div className="step-start-grid">
        {/* Card 1: 녹음 환경 */}
        <div className="step-start-card" id="precaution-environment">
          <div className="step-start-icon">
            <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              {/* Speaker with X (mute/quiet) */}
              <path d="M8 16h6l8-8v28l-8-8H8a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2z" />
              <line x1="30" y1="16" x2="38" y2="28" />
              <line x1="38" y1="16" x2="30" y2="28" />
            </svg>
          </div>
          <h3 className="step-start-card-title">녹음 환경</h3>
          <p className="step-start-card-desc">
            주변 소음이 없는 조용한 공간에서 진행해주세요.
          </p>
        </div>

        {/* Card 2: 발음 및 속도 */}
        <div className="step-start-card" id="precaution-pronunciation">
          <div className="step-start-icon">
            <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              {/* Person speaking */}
              <circle cx="16" cy="12" r="5" />
              <path d="M6 36v-4a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v4" />
              <path d="M30 14c1.5 1.5 2.5 3.5 2.5 6s-1 4.5-2.5 6" />
              <path d="M34 10c2.5 2.5 4 6 4 10s-1.5 7.5-4 10" />
            </svg>
          </div>
          <h3 className="step-start-card-title">발음 및 속도</h3>
          <p className="step-start-card-desc">
            평소 발표하듯이 자연스러운 발음과 속도를 유지해주세요.
          </p>
        </div>

        {/* Card 3: 마이크 위치 */}
        <div className="step-start-card" id="precaution-microphone">
          <div className="step-start-icon">
            <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              {/* Microphone */}
              <rect x="16" y="4" width="12" height="20" rx="6" />
              <path d="M10 22a12 12 0 0 0 24 0" />
              <line x1="22" y1="34" x2="22" y2="40" />
              <line x1="16" y1="40" x2="28" y2="40" />
            </svg>
          </div>
          <h3 className="step-start-card-title">마이크 위치</h3>
          <p className="step-start-card-desc">
            마이크와 입 사이의 거리를 일정하게 유지해주세요
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepStart;
