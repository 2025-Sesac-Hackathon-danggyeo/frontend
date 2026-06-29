const CONFETTI = [
  { color: '#2563EB', left: '20%', delay: '0.1s',  w: 8,  h: 8  },
  { color: '#10B981', left: '35%', delay: '0.2s',  w: 8,  h: 8  },
  { color: '#F59E0B', left: '50%', delay: '0.15s', w: 6,  h: 10 },
  { color: '#EF4444', left: '65%', delay: '0.25s', w: 8,  h: 8  },
  { color: '#8B5CF6', left: '80%', delay: '0.3s',  w: 10, h: 6  },
  { color: '#EC4899', left: '10%', delay: '0.35s', w: 8,  h: 8  },
  { color: '#06B6D4', left: '45%', delay: '0.05s', w: 6,  h: 6, rounded: true },
  { color: '#F97316', left: '75%', delay: '0.4s',  w: 8,  h: 8  },
];

const StepComplete = () => (
  <section id="step-complete" className="flex flex-col items-center py-10">
    {/* Confetti */}
    <div className="relative w-[200px] h-[120px] -mb-5 pointer-events-none">
      {CONFETTI.map((c, i) => (
        <div
          key={i}
          className={`absolute animate-confetti ${c.rounded ? 'rounded-full' : 'rounded-sm'}`}
          style={{ background: c.color, left: c.left, width: c.w, height: c.h, animationDelay: c.delay }}
        />
      ))}
    </div>

    {/* Checkmark */}
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center animate-pop-in">
      <svg className="w-10 h-10 stroke-white fill-none stroke-[3px] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 40 40">
        <polyline points="10,20 18,28 30,12" />
      </svg>
    </div>

    <h2 className="text-[22px] font-bold text-[#1A1A2E] mt-6">녹음이 모두 완료되었습니다!</h2>
    <p className="text-[15px] text-gray-500 mt-3 text-center leading-[1.6]">
      발표 교정 AI가 분석을 시작합니다.<br />
      잠시 후 결과를 확인하실 수 있습니다.
    </p>
  </section>
);

export default StepComplete;
