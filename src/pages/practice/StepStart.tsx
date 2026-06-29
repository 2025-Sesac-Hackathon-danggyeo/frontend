const PRECAUTIONS = [
  {
    id: 'precaution-environment',
    title: '녹음 환경',
    desc: '주변 소음이 없는 조용한 공간에서\n진행해주세요.',
    icon: <img src="/icon-silent.png" alt="조용한 환경" className="w-24 h-24 object-contain" />,
  },
  {
    id: 'precaution-pronunciation',
    title: '발음 및 속도',
    desc: '평소 발표하듯이 자연스러운 발음과\n속도를 유지해주세요.',
    icon: <img src="/icon-speaking.png" alt="발음 및 속도" className="w-24 h-24 object-contain" />,
  },
  {
    id: 'precaution-microphone',
    title: '마이크 위치',
    desc: '마이크와 입 사이의 거리를 일정하게\n유지해주세요',
    icon: <img src="/icon-precaution-mic.png" alt="마이크 위치" className="w-24 h-24 object-contain" />,
  },
];

const StepStart = () => (
  <section id="step-start">
    <h2 className="text-[22px] font-bold text-center text-[#1A1A2E] mb-10">녹음 유의사항</h2>
    <div className="grid grid-cols-3 gap-8">
      {PRECAUTIONS.map((p) => (
        <div key={p.id} id={p.id} className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center flex-shrink-0">
            {p.icon}
          </div>
          <h3 className="text-base font-bold text-[#1A1A2E] mt-5">{p.title}</h3>
          <p className="text-sm text-gray-500 text-center mt-2 leading-[1.5]">
            {p.desc.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default StepStart;
