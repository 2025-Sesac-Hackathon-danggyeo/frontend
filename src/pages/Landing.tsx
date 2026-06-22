import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content">
        {/* Section 1: Hero */}
        <section id="landing-hero" className="landing-hero landing-section">
          {/* Floating particles */}
          <div className="landing-hero__particles">
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
            <span className="landing-hero__particle" />
          </div>

          <div className="container landing-hero__inner">
            <div className="landing-hero__content">
              <p className="landing-hero__subtitle">발표가 두려운 당신을 위한</p>
              <h1 className="landing-hero__title">
                {'AI로 교정하고,\n진짜 프로처럼 발표하세요'}
              </h1>
              <button id="hero-cta-button" className="landing-hero__cta" onClick={() => navigate('/practice')}>
                지금 시작하기 →
              </button>
            </div>
            <div className="landing-hero__decoration" aria-hidden="true">
              <div className="landing-hero__blob" />
              <div className="landing-hero__blob landing-hero__blob--secondary" />
            </div>
          </div>
        </section>

        {/* Section 2: Feature Intro */}
        <section id="landing-feature-intro" className="landing-feature-intro landing-section">
          <div className="container">
            <p className="landing-feature-intro__quote">
              {'"발표 실력을 400% 향상시키는\n혁신적인 AI 코칭 서비스"'}
            </p>
            <p className="landing-feature-intro__tagline">
              SFITZ와 함께라면 누구나 프로 발표자가 될 수 있습니다.
            </p>
          </div>
        </section>

        {/* Section 3: About */}
        <section id="landing-about" className="landing-about landing-section">
          <div className="container landing-about__inner">
            <div className="landing-about__text">
              <span className="section-label" aria-hidden="true">01</span>
              <h2 className="section-title">발표 교정 AI 서비스를 소개합니다.</h2>
              <p className="landing-about__desc">
                SFITZ는 최신 인공지능 기술을 활용하여 여러분의 발표를 분석하고,
                실시간으로 피드백을 제공하는 혁신적인 서비스입니다.
                음성 톤, 발음 정확도, 속도, 표정 등을 종합적으로 분석하여
                발표 실력을 체계적으로 향상시킬 수 있도록 도와드립니다.
              </p>
            </div>
            <div className="landing-about__visuals" aria-hidden="true">
              <div className="landing-about__circle landing-about__circle--1" />
              <div className="landing-about__circle landing-about__circle--2" />
              <div className="landing-about__circle landing-about__circle--3" />
            </div>
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section id="landing-how" className="landing-how landing-section">
          <div className="container">
            <div className="landing-how__header">
              <span className="section-label" aria-hidden="true">02</span>
              <h2 className="section-title">프로그램의 활용을 더 자세하게 알려드립니다.</h2>
            </div>
            <div className="landing-how__cards">
              <article id="how-card-1" className="landing-how__card">
                <div className="landing-how__card-image landing-how__card-image--1" aria-hidden="true" />
                <h3 className="landing-how__card-title">음성 분석</h3>
                <p className="landing-how__card-desc">
                  AI가 발표 음성을 실시간으로 분석하여 발음, 속도, 억양 등을 정밀하게 평가합니다.
                </p>
              </article>
              <article id="how-card-2" className="landing-how__card">
                <div className="landing-how__card-image landing-how__card-image--2" aria-hidden="true" />
                <h3 className="landing-how__card-title">피드백 리포트</h3>
                <p className="landing-how__card-desc">
                  발표가 끝나면 상세한 분석 리포트를 제공하여 개선 포인트를 한눈에 확인할 수 있습니다.
                </p>
              </article>
              <article id="how-card-3" className="landing-how__card">
                <div className="landing-how__card-image landing-how__card-image--3" aria-hidden="true" />
                <h3 className="landing-how__card-title">실시간 코칭</h3>
                <p className="landing-how__card-desc">
                  발표 중 실시간으로 교정 피드백을 받아 즉각적으로 발표를 개선할 수 있습니다.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 5: Process / Timeline */}
        <section id="landing-process" className="landing-process landing-section">
          <div className="container">
            <div className="landing-process__header">
              <span className="section-label" aria-hidden="true">03</span>
              <h2 className="section-title">프로그램의 실제 사용법입니다.</h2>
            </div>
            <div className="landing-process__timeline">
              <div className="landing-process__step">
                <div className="landing-process__dot" />
                <div className="landing-process__step-content">
                  <h3 className="landing-process__step-title">Step 1 — 발표 영상 업로드</h3>
                  <p className="landing-process__step-desc">
                    연습한 발표 영상을 업로드하거나 실시간으로 녹화를 시작하세요.
                    간단한 몇 번의 클릭으로 분석이 시작됩니다.
                  </p>
                </div>
                <div className="landing-process__step-visual landing-process__step-visual--1" aria-hidden="true" />
              </div>
              <div className="landing-process__step">
                <div className="landing-process__dot" />
                <div className="landing-process__step-content">
                  <h3 className="landing-process__step-title">Step 2 — AI 분석 진행</h3>
                  <p className="landing-process__step-desc">
                    AI가 음성, 표정, 제스처 등을 종합적으로 분석합니다.
                    분석은 몇 분 내에 완료됩니다.
                  </p>
                </div>
                <div className="landing-process__step-visual landing-process__step-visual--2" aria-hidden="true" />
              </div>
              <div className="landing-process__step">
                <div className="landing-process__dot" />
                <div className="landing-process__step-content">
                  <h3 className="landing-process__step-title">Step 3 — 결과 확인 및 개선</h3>
                  <p className="landing-process__step-desc">
                    상세한 분석 결과를 확인하고 맞춤형 개선 방안을 받아보세요.
                    반복 연습으로 발표 실력이 크게 향상됩니다.
                  </p>
                </div>
                <div className="landing-process__step-visual landing-process__step-visual--3" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: CTA */}
        <section id="landing-cta" className="landing-cta landing-section">
          <div className="landing-cta__blob landing-cta__blob--1" aria-hidden="true" />
          <div className="landing-cta__blob landing-cta__blob--2" aria-hidden="true" />
          <div className="landing-cta__inner container">
            <h2 className="landing-cta__title">
              {'AI 발표 코칭,\n지금 바로 시작하세요'}
            </h2>
            <p className="landing-cta__subtitle">
              여러분의 발표 실력을 한 단계 업그레이드하세요.
            </p>
            <button id="cta-start-button" className="landing-cta__button" onClick={() => navigate('/practice')}>
              무료로 시작하기
            </button>
          </div>
        </section>

        {/* Section 7: Quote / Team */}
        <section id="landing-quote" className="landing-quote landing-section">
          <div className="container landing-quote__inner">
            <div className="landing-quote__text">
              <blockquote className="landing-quote__content">
                "SFITZ를 사용한 후 발표에 대한 두려움이 사라졌습니다.
                AI가 제 약점을 정확히 짚어주고 개선 방법까지 알려줘서
                자신감이 크게 향상되었습니다."
              </blockquote>
              <p className="landing-quote__author">— 김지수, 대학생 발표 대회 수상자</p>
            </div>
            <div className="landing-quote__visual" aria-hidden="true">
              <div className="landing-quote__person">
                <div className="landing-quote__person-head" />
                <div className="landing-quote__person-body" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
