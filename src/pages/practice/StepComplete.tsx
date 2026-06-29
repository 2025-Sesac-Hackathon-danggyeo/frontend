const SPARKLES = [
  { top: '-18%', left: '10%',  size: 6,  delay: '0s',    dur: '2.4s' },
  { top: '-10%', left: '80%',  size: 5,  delay: '0.3s',  dur: '2.8s' },
  { top: '50%',  left: '-12%', size: 7,  delay: '0.6s',  dur: '2.2s' },
  { top: '50%',  left: '105%', size: 5,  delay: '0.15s', dur: '2.6s' },
  { top: '105%', left: '20%',  size: 6,  delay: '0.45s', dur: '2.5s' },
  { top: '105%', left: '72%',  size: 5,  delay: '0.9s',  dur: '2.3s' },
];

const StepComplete = () => (
  <section id="step-complete" className="flex flex-col items-center py-10">

    {/* 체크마크 + 리플 */}
    <div className="relative flex items-center justify-center w-28 h-28 mb-8">
      {/* 바깥 리플 */}
      <span
        className="absolute inset-0 rounded-full bg-blue-200 opacity-0"
        style={{ animation: 'ripple 2.4s ease-out 0.2s infinite' }}
      />
      <span
        className="absolute inset-0 rounded-full bg-blue-300 opacity-0"
        style={{ animation: 'ripple 2.4s ease-out 0.8s infinite' }}
      />

      {/* 체크마크 원 */}
      <div
        className="relative w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_8px_40px_rgba(37,99,235,0.45)]"
        style={{ animation: 'popIn 0.55s cubic-bezier(0.175,0.885,0.32,1.275) both' }}
      >
        <svg
          className="w-11 h-11 stroke-white fill-none [stroke-width:3] [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 44 44"
        >
          <polyline points="10,22 19,31 34,13" />
        </svg>
      </div>

      {/* 반짝이 파티클 */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-400 opacity-0"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            animation: `sparkleFloat ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>

    <h2
      className="text-[22px] font-bold text-[#1A1A2E]"
      style={{ animation: 'fadeInUp 0.6s ease-out 0.35s both' }}
    >
      녹음이 모두 완료되었습니다!
    </h2>
    <p
      className="text-[15px] text-gray-500 mt-3 text-center leading-[1.6]"
      style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
    >
      발표 교정 AI가 분석을 시작합니다.<br />
      잠시 후 결과를 확인하실 수 있습니다.
    </p>
  </section>
);

export default StepComplete;
