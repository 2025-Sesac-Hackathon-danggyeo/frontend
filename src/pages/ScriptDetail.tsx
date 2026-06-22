import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ScriptDetail.css';

const ScriptDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content script-detail-page">
        <div className="container">
          <div className="script-detail-header">
            <h1 className="script-detail-title">2025년 신제품 런칭 발표</h1>
            <div className="script-detail-actions">
              <button className="btn-pill">가이드 음성 듣기</button>
              <button className="btn-pill" onClick={() => navigate('/practice')}>
                연습 녹음하기
              </button>
            </div>
          </div>

          <div className="script-detail-card">
            <div className="script-detail-content">
              <div className="script-detail-left">
                <div className="slide-block">
                  <h2 className="slide-title">슬라이드 1</h2>
                  <p className="slide-text">
                    안녕하십니까, 2025년 신제품 런칭 발표를 맡은 영업본부 김민수입니다. 바쁘신 와중에도 오늘 이 자리에 참석해주신 여러분께 깊은 감사의 말씀을 드립니다.
                  </p>
                  <p className="slide-text">
                    오늘 발표에서는 저희 회사가 야심 차게 준비한 새로운 라인업의 핵심 가치와 시장 전략에 대해 말씀드리고자 합니다. 이번 신제품은 고객의 니즈를 철저히 분석하고 최신 기술을 접목하여 완성된 결과물입니다.
                  </p>
                </div>

                <hr className="slide-divider" />

                <div className="slide-block">
                  <h2 className="slide-title">슬라이드 2</h2>
                  <p className="slide-text">
                    먼저 제품의 주요 특징에 대해 설명드리겠습니다. 가장 큰 변화는 바로 사용자 경험의 혁신입니다. 기존 모델 대비 처리 속도를 30% 향상시켰으며, 직관적인 UI를 도입하여 누구나 쉽게 사용할 수 있도록 설계했습니다.
                  </p>
                </div>
              </div>

              <div className="script-detail-right" id="slide-placeholder-panel">
                {/* Structural placeholder */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScriptDetail;
