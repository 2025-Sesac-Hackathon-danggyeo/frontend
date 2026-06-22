const StepComplete = () => {
  return (
    <section className="step-complete" id="step-complete">
      {/* Confetti */}
      <div className="step-complete-confetti">
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
      </div>

      {/* Checkmark Icon */}
      <div className="step-complete-icon">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <polyline points="10,20 18,28 30,12" />
        </svg>
      </div>

      <h2 className="step-complete-title">녹음이 모두 완료되었습니다!</h2>
      <p className="step-complete-desc">
        발표 교정 AI가 분석을 시작합니다.
        <br />
        잠시 후 결과를 확인하실 수 있습니다.
      </p>
    </section>
  );
};

export default StepComplete;
