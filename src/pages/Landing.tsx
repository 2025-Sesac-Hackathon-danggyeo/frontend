import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const FEATURE_CARDS = [
  { id: 'feat-speed',  title: '발표 속도 (SPM)', img: '/circle-1.png' },
  { id: 'feat-voice',  title: '목소리 톤',        img: '/circle-2.png' },
  { id: 'feat-volume', title: '볼륨 & 발음',       img: '/circle-3.png' },
  { id: 'feat-report', title: '정확도 분석',       img: '/circle-4.png' },
];

const PROCESS_STEPS = [
  {
    step: 'STEP 1',
    title: '목소리 녹음하기',
    desc: '목소리를 녹음만 해도됩니다. AI가 목소리를\n분석하여 최적의 발표 발표 목소리 진행됩니다.\n\n녹음된 목소리는 안전하게 저장되어, 이후\n다른 연습에서도 활용할 수 있습니다.',
    img: '/step1.png',
  },
  {
    step: 'STEP 2',
    title: '발표 대본 저장',
    desc: '발표 대본을 직접 입력하거나 불러올 수 있습니다.\n매번 다시 입력할 필요 없이 한 번만 저장해두면\n언제든지 불러와 바로 연습할 수 있습니다.',
    img: null,
  },
  {
    step: 'STEP 3',
    title: '발표 연습',
    desc: '저장된 대본을 기준으로 발표 연습을 시작하세요.\n음정·볼륨·속도·발음이 실시간으로 분석되고,\n연습 이후 한눈에 결과를 확인할 수 있어요.',
    img: null,
  },
];

const TARGET_ITEMS = [
  '발표만 하면 목소리가 떨리는 분',
  '말이 너무 빠르다는 피드백을 받은 분',
  '발음이 부정확해서 전달력이 부족한 분',
  '중요한 발표를 혼자 준비해야 하는 분',
];

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const els = document.querySelectorAll('[data-fade]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = (e.target as HTMLElement).dataset.delay;
          if (delay) (e.target as HTMLElement).style.transitionDelay = `${Number(delay) * 0.12}s`;
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">

        {/* Section 1: Hero */}
        <section
          id="landing-hero"
          className="relative overflow-hidden"
          style={{ minHeight: '580px' }}
        >
          {/* Hero background image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.png')" }} />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-[2] max-w-[1100px] mx-auto px-12 flex items-end justify-end pb-28" style={{ minHeight: '580px' }}>
            <div className="max-w-[480px] text-right">
              <h1 className="text-[30px] font-extrabold text-white leading-[1.3] mb-6 whitespace-pre-line">
                {'혼자 하는 발표 연습,\n정말 효과가 있을까요?'}
              </h1>
              <div className="text-[14px] text-white/80 leading-[1.9]">
                <p>거울 앞에서, 녹음 앱으로, 반복해서 연습해도</p>
                <p>내 말이 너무 빠른지, 발음이 어색한지 알기 어렵습니다.</p>
                <p>누군가의 피드백이나 의견에 기대기도 어렵고,</p>
                <p>객관적인 '기준' 없이 연습을 반복하는 건 비효율적입니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Impact Statement */}
        <section
          id="landing-statement"
          className="bg-[#F0F2F5] py-48 text-center"
        >
          <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.55]">
            발표 연습엔 '감'이 아니라<br />
            <span className="text-blue-600">데이터</span>가 필요합니다.
          </h2>
        </section>

        {/* Section 3: About — "나의 발표" */}
        <section
          id="landing-about"
          className="bg-[#DCE3ED] flex items-center"
          style={{ minHeight: '560px' }}
        >
          <div className="max-w-[1100px] mx-auto px-12 w-full">
            <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.35] mb-5">
              나의 발표,<br />
              이제 <span className="text-blue-600">데이터로 교정</span>하세요.
            </h2>
            <p className="text-[14px] text-gray-600 leading-[1.9]">
              속도, 음정, 볼륨, 발음을 분석해주는 AI 발표 피드백 서비스<br />
              객관적인 수치와 시·청각적 피드백으로, 발표 실력을<br />
              한 단계 성장시켜보세요.
            </p>
          </div>
        </section>

        {/* Section 4: Features */}
        <section
          id="landing-features"
          className="bg-white py-36 text-center"
        >
          <div className="max-w-[720px] mx-auto px-8 mb-6">
            <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-6">
              발표 교정 도우미가 <span className="text-blue-600">당신의 발표를 분석</span>해드립니다.
            </h2>
            <p className="text-[14px] text-gray-500 leading-[1.9]">
              발표 교정 도우미는 AI 기반 음성 분석 기술을 활용해<br />
              발표자의 음성을 <strong className="text-gray-700 font-semibold">객관적인 수치</strong>로 평가하고 피드백을 제공합니다.<br />
              속도(SPM), 음정, 볼륨, 발음 정확도 등을 <strong className="text-gray-700 font-semibold">정량적으로 분석</strong>해<br />
              어떤 부분이 부족한지, 어떻게 개선할 수 있는지 한눈에 확인할 수 있습니다.
            </p>
          </div>

          <div className="flex justify-center">
            {FEATURE_CARDS.map((card, i) => (
              <div
                key={card.id}
                className="flex-shrink-0 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.13)] rounded-full hover:z-10"
                style={{ marginLeft: i === 0 ? 0 : '-28px' }}
                data-fade="up"
                data-delay={i}
              >
                <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden bg-gray-400">
                  {card.img && (
                    <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {/* Text overlay at center */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white text-[14px] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">{card.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Smart Features */}
        <section
          id="landing-showcase"
          className="bg-[#F2F5F8] py-36 text-center"
        >
          <div className="max-w-[860px] mx-auto px-8 mb-12">
            <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-5">
              발표 연습, 이제 더 <span className="text-blue-600">똑똑하게</span>
            </h2>
            <p className="text-[14px] text-gray-500 leading-[1.9]">
              발표 교정 도우미는 다음과 같은 기능을 제공합니다.<br />
              발표 대본 저장부터 피드백, 연습까지 전부 한 번에 가능합니다.
            </p>
          </div>

          <div className="max-w-[860px] mx-auto px-8 flex items-start justify-center gap-4">
            {/* Card 1 */}
            <div
              className="flex-1 bg-[#E8EDF4] rounded-2xl p-6 flex flex-col items-center cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
              style={{ minHeight: '400px', animation: 'cardIn 0.6s ease-out 0.1s both' }}
            >
              <span className="text-[11px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-5">첫 번째</span>
              <h3 className="text-[16px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-2 text-center">초기 녹음으로 나만의<br />보이스를 생성해요</h3>
              <p className="text-[12px] text-gray-500 leading-[1.7] text-center mb-auto">AI가 내 목소리를 학습해<br />더 정확한 피드백을 제공해요.</p>
              <img src="/icon-mic.png" alt="마이크" className="w-[160px] h-[160px] object-contain mt-auto" style={{ animation: 'floatIllust 3s ease-in-out infinite' }} />
            </div>

            {/* Card 2 — offset down */}
            <div
              className="flex-1 bg-[#E8EDF4] rounded-2xl p-6 flex flex-col items-center mt-10 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
              style={{ minHeight: '400px', animation: 'cardIn 0.6s ease-out 0.25s both' }}
            >
              <span className="text-[11px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-5">두 번째</span>
              <h3 className="text-[16px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-2 text-center">대본을 저장하고<br />언제든지 불러와요</h3>
              <p className="text-[12px] text-gray-500 leading-[1.7] text-center mb-auto">연습하고 싶은 대본을 안전하게 저장하고<br />필요할 때 바로 불러올 수 있어요.</p>
              <img src="/icon-copy.png" alt="대본" className="w-[160px] h-[160px] object-contain mt-auto" style={{ animation: 'floatIllust 3s ease-in-out 0.5s infinite' }} />
            </div>

            {/* Card 3 */}
            <div
              className="flex-1 bg-[#E8EDF4] rounded-2xl p-6 flex flex-col items-center cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
              style={{ minHeight: '400px', animation: 'cardIn 0.6s ease-out 0.4s both' }}
            >
              <span className="text-[11px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-5">세 번째</span>
              <h3 className="text-[16px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-2 text-center">연습 내용은 자동으로<br />기록·정리돼요</h3>
              <p className="text-[12px] text-gray-500 leading-[1.7] text-center mb-auto">말하기 연습을 할 때마다 기록이 자동으로 저장되어<br />나의 변화까지 확인할 수 있어요.</p>
              <img src="/icon-notebook.png" alt="노트" className="w-[160px] h-[160px] object-contain mt-auto" style={{ animation: 'floatIllust 3s ease-in-out 1s infinite' }} />
            </div>
          </div>
        </section>

        {/* Section 6: Process */}
        <section
          id="landing-process"
          className="bg-white py-24 text-center"
        >
          <div className="max-w-[900px] mx-auto px-8">
            <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-20">
              발표 교정, <span className="text-blue-600">이렇게 간단합니다.</span>
            </h2>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2" />

              <div className="flex flex-col gap-20">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className={`relative flex items-center gap-8 text-left ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                    {/* Image side */}
                    <div
                      className="flex-1 flex justify-center"
                      data-fade={i % 2 === 0 ? 'right' : 'left'}
                      style={{ transitionDelay: '0.1s' }}
                    >
                      <div className="w-full max-w-[340px] h-[210px] rounded-2xl bg-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                        {step.img && (
                          <img src={step.img} alt={step.title} className="w-full h-full object-cover scale-[1.18]" />
                        )}
                      </div>
                    </div>

                    {/* Center number circle */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-[15px] font-extrabold flex items-center justify-center z-[1] shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
                      data-fade="pop"
                      style={{ transitionDelay: '0.2s' }}
                    >
                      {i + 1}
                    </div>

                    {/* Text side */}
                    <div
                      className="flex-1"
                      data-fade={i % 2 === 0 ? 'left' : 'right'}
                      style={{ transitionDelay: '0.1s' }}
                    >
                      <span className="text-[11px] font-bold text-blue-600 tracking-widest">{step.step}</span>
                      <h3 className="text-[18px] font-extrabold text-[#1A1A2E] mt-1 mb-2 leading-[1.4]">{step.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-[1.8] whitespace-pre-line">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Target Audience */}
        <section
          id="landing-target"
          className="bg-[#F2F5F8] py-24"
        >
          <div className="max-w-[960px] mx-auto px-8 flex items-center gap-16">
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-blue-600 tracking-widest uppercase mb-3">For you</p>
              <h2 className="text-[30px] font-extrabold text-[#1A1A2E] leading-[1.4] mb-8">
                당신의 발표 기회를 높이는,<br />
                <span className="text-blue-600">이런 분에게</span> 딱 맞습니다.
              </h2>
              <ul className="flex flex-col gap-4">
                {TARGET_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Person photo placeholder */}
            <div className="flex-shrink-0 w-[380px] h-[420px] rounded-2xl bg-gray-300" />
          </div>
        </section>

        {/* Section 8: CTA */}
        <section
          id="landing-cta"
          className="relative overflow-hidden py-28 text-center"
        >
          {/* Presenter photo placeholder */}
          <div className="absolute inset-0 bg-gray-800" />
          <div className="absolute inset-0 bg-[#0F172A]/75" />

          <div className="relative z-[2] max-w-[960px] mx-auto px-8">
            <p className="text-[14px] font-semibold text-blue-400 tracking-widest uppercase mb-4">Start for free</p>
            <h2 className="text-[30px] font-extrabold text-white leading-[1.3] mb-5">
              지금 바로 시작하세요.
            </h2>
            <p className="text-[16px] text-gray-400 mb-10">
              가입 즉시 무료로 발표를 분석받을 수 있습니다.
            </p>
            <button
              id="cta-start-button"
              className="px-10 py-4 text-[16px] rounded-xl bg-blue-600 text-white font-semibold inline-flex items-center gap-2 border-none cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)]"
              onClick={() => navigate('/practice')}
            >
              무료로 시작하기 →
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Landing;
