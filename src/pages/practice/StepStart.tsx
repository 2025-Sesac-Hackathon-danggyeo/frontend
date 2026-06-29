const PRECAUTIONS = [
  {
    id: 'precaution-environment',
    title: '녹음 환경',
    desc: '주변 소음이 없는 조용한 공간에서 진행해주세요.',
    icon: (
      <svg viewBox="0 0 44 44" className="w-11 h-11 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M8 16h6l8-8v28l-8-8H8a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2z" />
        <line x1="30" y1="16" x2="38" y2="28" />
        <line x1="38" y1="16" x2="30" y2="28" />
      </svg>
    ),
  },
  {
    id: 'precaution-pronunciation',
    title: '발음 및 속도',
    desc: '평소 발표하듯이 자연스러운 발음과 속도를 유지해주세요.',
    icon: (
      <svg viewBox="0 0 44 44" className="w-11 h-11 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
        <circle cx="16" cy="12" r="5" />
        <path d="M6 36v-4a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v4" />
        <path d="M30 14c1.5 1.5 2.5 3.5 2.5 6s-1 4.5-2.5 6" />
        <path d="M34 10c2.5 2.5 4 6 4 10s-1.5 7.5-4 10" />
      </svg>
    ),
  },
  {
    id: 'precaution-microphone',
    title: '마이크 위치',
    desc: '마이크와 입 사이의 거리를 일정하게 유지해주세요',
    icon: (
      <svg viewBox="0 0 44 44" className="w-11 h-11 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
        <rect x="16" y="4" width="12" height="20" rx="6" />
        <path d="M10 22a12 12 0 0 0 24 0" />
        <line x1="22" y1="34" x2="22" y2="40" />
        <line x1="16" y1="40" x2="28" y2="40" />
      </svg>
    ),
  },
];

const StepStart = () => (
  <section id="step-start">
    <h2 className="text-[22px] font-bold text-center text-[#1A1A2E] mb-10">녹음 유의사항</h2>
    <div className="grid grid-cols-3 gap-8">
      {PRECAUTIONS.map((p) => (
        <div key={p.id} id={p.id} className="flex flex-col items-center text-center">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            {p.icon}
          </div>
          <h3 className="text-base font-bold text-[#1A1A2E] mt-5">{p.title}</h3>
          <p className="text-sm text-gray-500 text-center mt-2 leading-[1.5]">{p.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StepStart;
