import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PARTICLES = [
  { top: '20%', left: '10%', size: 4,  dur: '5s',   delay: '0s',    anim: 'floatParticle' },
  { top: '60%', left: '25%', size: 3,  dur: '7s',   delay: '-1.5s', anim: 'floatParticle2' },
  { top: '30%', left: '55%', size: 5,  dur: '8s',   delay: '-3s',   anim: 'floatParticle' },
  { top: '75%', left: '70%', size: 3,  dur: '6s',   delay: '-2s',   anim: 'floatParticle2' },
  { top: '15%', left: '80%', size: 4,  dur: '9s',   delay: '-4s',   anim: 'floatParticle' },
  { top: '50%', left: '45%', size: 3,  dur: '7.5s', delay: '-1s',   anim: 'floatParticle2' },
  { top: '85%', left: '15%', size: 5,  dur: '6.5s', delay: '-5s',   anim: 'floatParticle' },
  { top: '40%', left: '90%', size: 4,  dur: '8.5s', delay: '-2.5s', anim: 'floatParticle2' },
];

const HOW_CARDS = [
  { id: 'how-card-1', gradient: 'from-blue-400 to-blue-600',    title: '음성 분석',     desc: 'AI가 발표 음성을 실시간으로 분석하여 발음, 속도, 억양 등을 정밀하게 평가합니다.' },
  { id: 'how-card-2', gradient: 'from-violet-400 to-violet-600', title: '피드백 리포트', desc: '발표가 끝나면 상세한 분석 리포트를 제공하여 개선 포인트를 한눈에 확인할 수 있습니다.' },
  { id: 'how-card-3', gradient: 'from-emerald-400 to-emerald-600', title: '실시간 코칭', desc: '발표 중 실시간으로 교정 피드백을 받아 즉각적으로 발표를 개선할 수 있습니다.' },
];

const PROCESS_STEPS = [
  {
    title: 'Step 1 — 발표 영상 업로드',
    desc: '연습한 발표 영상을 업로드하거나 실시간으로 녹화를 시작하세요.\n간단한 몇 번의 클릭으로 분석이 시작됩니다.',
    gradient: 'from-blue-500 to-blue-700',
    dotDelay: '0s',
  },
  {
    title: 'Step 2 — AI 분석 진행',
    desc: 'AI가 음성, 표정, 제스처 등을 종합적으로 분석합니다.\n분석은 몇 분 내에 완료됩니다.',
    gradient: 'from-violet-500 to-violet-700',
    dotDelay: '0.5s',
  },
  {
    title: 'Step 3 — 결과 확인 및 개선',
    desc: '상세한 분석 결과를 확인하고 맞춤형 개선 방안을 받아보세요.\n반복 연습으로 발표 실력이 크게 향상됩니다.',
    gradient: 'from-emerald-500 to-emerald-700',
    dotDelay: '1s',
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">

        {/* Section 1: Hero */}
        <section
          id="landing-hero"
          className="relative overflow-hidden animate-fade-in-up"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1A1A3E 100%)', padding: '100px 0 80px' }}
        >
          {/* Particles */}
          <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-slate-400/50"
                style={{ top: p.top, left: p.left, width: p.size, height: p.size, animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite` }}
              />
            ))}
          </div>

          <div className="max-w-[960px] mx-auto px-8 flex items-center justify-between relative z-[2]">
            <div className="max-w-[520px] flex-shrink-0">
              <p className="text-[18px] text-slate-400">발표가 두려운 당신을 위한</p>
              <h1 className="text-[42px] font-[800] text-white leading-[1.3] mt-3 whitespace-pre-line">
                {'AI로 교정하고,\n진짜 프로처럼 발표하세요'}
              </h1>
              <button
                id="hero-cta-button"
                className="mt-8 px-9 py-4 text-[17px] rounded-xl bg-blue-600 text-white font-semibold inline-flex items-center gap-2 border-none cursor-pointer transition-all duration-250 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
                onClick={() => navigate('/practice')}
              >
                지금 시작하기 →
              </button>
            </div>

            <div className="relative w-[380px] h-[380px] flex-shrink-0" aria-hidden="true">
              <div
                className="absolute w-[300px] h-[300px] rounded-full top-10 left-10 animate-float-blob"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(96,165,250,0.35), rgba(99,102,241,0.2) 50%, rgba(37,99,235,0.1) 100%)', filter: 'blur(40px)' }}
              />
              <div
                className="absolute w-[180px] h-[180px] rounded-full top-[120px] left-[150px]"
                style={{ background: 'radial-gradient(circle at 60% 60%, rgba(139,92,246,0.3), rgba(59,130,246,0.15) 100%)', filter: 'blur(30px)', animation: 'floatBlob 10s ease-in-out -3s infinite' }}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Feature Intro */}
        <section
          id="landing-feature-intro"
          className="bg-white py-20 text-center animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="max-w-[960px] mx-auto px-8">
            <p className="text-[22px] text-gray-700 italic leading-[1.6] whitespace-pre-line max-w-[600px] mx-auto">
              {'"발표 실력을 400% 향상시키는\n혁신적인 AI 코칭 서비스"'}
            </p>
            <p className="text-base text-gray-400 mt-5">
              SFITZ와 함께라면 누구나 프로 발표자가 될 수 있습니다.
            </p>
          </div>
        </section>

        {/* Section 3: About */}
        <section
          id="landing-about"
          className="bg-[#E8ECF1] py-20 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="max-w-[960px] mx-auto px-8 flex items-center justify-between gap-[60px]">
            <div className="flex-1">
              <span className="block text-[72px] font-black text-blue-600/[0.08] leading-none mb-2 select-none" aria-hidden="true">01</span>
              <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-4 leading-[1.4]">발표 교정 AI 서비스를 소개합니다.</h2>
              <p className="text-[15px] text-gray-500 leading-[1.8] max-w-[600px] mt-2">
                SFITZ는 최신 인공지능 기술을 활용하여 여러분의 발표를 분석하고,
                실시간으로 피드백을 제공하는 혁신적인 서비스입니다.
                음성 톤, 발음 정확도, 속도, 표정 등을 종합적으로 분석하여
                발표 실력을 체계적으로 향상시킬 수 있도록 도와드립니다.
              </p>
            </div>
            <div className="flex gap-5 flex-shrink-0" aria-hidden="true">
              <div className="w-[120px] h-[120px] rounded-full flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-500" />
              <div className="w-[120px] h-[120px] rounded-full flex-shrink-0 bg-gradient-to-br from-violet-400 to-violet-600" />
              <div className="w-[120px] h-[120px] rounded-full flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-500" />
            </div>
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section
          id="landing-how"
          className="bg-white py-20 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="max-w-[960px] mx-auto px-8">
            <div className="mb-12">
              <span className="block text-[72px] font-black text-blue-600/[0.08] leading-none select-none" aria-hidden="true">02</span>
              <h2 className="text-[28px] font-bold text-[#1A1A2E] leading-[1.4]">프로그램의 활용을 더 자세하게 알려드립니다.</h2>
            </div>
            <div className="grid grid-cols-3 gap-7">
              {HOW_CARDS.map((card) => (
                <article
                  key={card.id}
                  id={card.id}
                  className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-200 transition-all duration-250 hover:-translate-y-[6px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                >
                  <div className={`w-full h-[200px] rounded-xl mb-5 bg-gradient-to-br ${card.gradient}`} aria-hidden="true" />
                  <h3 className="text-base font-semibold text-[#1A1A2E] mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-[1.6]">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Process / Timeline */}
        <section
          id="landing-process"
          className="bg-[#E8ECF1] py-20 animate-fade-in-up"
          style={{ animationDelay: '0.25s' }}
        >
          <div className="max-w-[960px] mx-auto px-8">
            <div className="mb-12">
              <span className="block text-[72px] font-black text-blue-600/[0.08] leading-none select-none" aria-hidden="true">03</span>
              <h2 className="text-[28px] font-bold text-[#1A1A2E] leading-[1.4]">프로그램의 실제 사용법입니다.</h2>
            </div>

            {/* Timeline: vertical line via before: pseudo-element */}
            <div className="relative pl-12 before:content-[''] before:absolute before:left-[15px] before:top-0 before:w-[3px] before:h-full before:bg-blue-600 before:rounded-sm before:[animation:drawLine_1.5s_ease-out_both]">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="relative mb-12 last:mb-0 flex items-start gap-8">
                  <div
                    className="absolute left-[-42px] top-2 w-[18px] h-[18px] rounded-full bg-blue-600 border-[3px] border-[#E8ECF1] z-[2] animate-pulse-glow"
                    style={{ animationDelay: step.dotDelay }}
                  />
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold text-[#1A1A2E] mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-[1.7] mb-4 whitespace-pre-line">{step.desc}</p>
                  </div>
                  <div className={`w-[300px] h-[180px] rounded-xl flex-shrink-0 bg-gradient-to-br ${step.gradient}`} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: CTA */}
        <section
          id="landing-cta"
          className="relative overflow-hidden py-20 text-center animate-fade-in-up"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1A1A3E 100%)', animationDelay: '0.3s' }}
        >
          <div
            className="absolute w-[250px] h-[250px] rounded-full pointer-events-none top-[-60px] left-[-40px] animate-float-blob"
            style={{ background: 'rgba(96,165,250,0.12)', filter: 'blur(60px)' }}
            aria-hidden="true"
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full pointer-events-none bottom-[-50px] right-[-30px]"
            style={{ background: 'rgba(139,92,246,0.1)', filter: 'blur(60px)', animation: 'floatBlob 12s ease-in-out infinite reverse' }}
            aria-hidden="true"
          />
          <div className="max-w-[960px] mx-auto px-8 relative z-[2]">
            <h2 className="text-[32px] font-bold text-white leading-[1.4] whitespace-pre-line mb-4">
              {'AI 발표 코칭,\n지금 바로 시작하세요'}
            </h2>
            <p className="text-base text-slate-400 mb-9">
              여러분의 발표 실력을 한 단계 업그레이드하세요.
            </p>
            <button
              id="cta-start-button"
              className="px-10 py-4 text-[17px] rounded-xl bg-blue-600 text-white font-semibold inline-flex items-center gap-2 border-none cursor-pointer transition-all duration-250 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
              onClick={() => navigate('/practice')}
            >
              무료로 시작하기
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Landing;
