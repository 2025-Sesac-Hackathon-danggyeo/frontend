import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StepStart from './practice/StepStart';
import StepRecord from './practice/StepRecord';
import StepComplete from './practice/StepComplete';
import './Practice.css';

const STEP_DATA = [
  {
    title: '시작하기',
    desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n아래 유의사항을 확인 후 다음 버튼을 눌러주세요.',
  },
  {
    title: '녹음 1단계',
    desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.',
  },
  {
    title: '녹음 2단계',
    desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.',
  },
  {
    title: '녹음 3단계',
    desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.',
  },
  {
    title: '녹음 완료',
    desc: '모든 녹음이 완료되었습니다. 수고하셨습니다!',
  },
];

const SENTENCES = [
  '안녕하십니까. 지금부터 발표를 시작하겠습니다.',
  '다음 그래프는, 저희 시스템의 성능을 보여주는 자료입니다. 참고해 주시기 바랍니다.',
  '이상으로 발표를 마치겠습니다. 감사합니다.',
];

const Practice = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const stepInfo = STEP_DATA[currentStep - 1];

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/my-script');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepStart />;
      case 2:
        return <StepRecord stepNumber={1} sentence={SENTENCES[0]} />;
      case 3:
        return <StepRecord stepNumber={2} sentence={SENTENCES[1]} />;
      case 4:
        return <StepRecord stepNumber={3} sentence={SENTENCES[2]} />;
      case 5:
        return <StepComplete />;
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content">
        <div className="practice-container">
          {/* Step Title Area */}
          <div className="practice-title-area">
            <div className="practice-title-row">
              <div className="practice-title-left">
                <h1 className="practice-title">{stepInfo.title}</h1>
                <p className="practice-desc">
                  {stepInfo.desc.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < stepInfo.desc.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <div className="practice-step-badge" id="practice-step-badge">
                {currentStep} / 5
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="practice-card">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="practice-nav">
            {currentStep > 1 && (
              <button
                className="practice-nav-btn practice-nav-prev"
                id="btn-practice-prev"
                onClick={handlePrev}
              >
                이전
              </button>
            )}
            {currentStep === 1 && <div />}
            <button
              className="practice-nav-btn practice-nav-next"
              id="btn-practice-next"
              onClick={handleNext}
            >
              {currentStep === 5 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
