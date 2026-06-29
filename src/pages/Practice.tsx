import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StepStart from './practice/StepStart';
import StepRecord from './practice/StepRecord';
import StepComplete from './practice/StepComplete';

const STEP_DATA = [
  { title: '시작하기',  desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n아래 유의사항을 확인 후 다음 버튼을 눌러주세요.' },
  { title: '녹음 1단계', desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.' },
  { title: '녹음 2단계', desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.' },
  { title: '녹음 3단계', desc: '발표 교정 AI 모델 학습에 사용될 목소리 샘플을 녹음합니다.\n정확한 피드백을 위해 편안하게 읽어주세요.' },
  { title: '녹음 완료',  desc: '모든 녹음이 완료되었습니다. 수고하셨습니다!' },
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

  const handlePrev = () => { if (currentStep > 1) setCurrentStep(s => s - 1); };
  const handleNext = () => { if (currentStep < 5) setCurrentStep(s => s + 1); else navigate('/my-script'); };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepStart />;
      case 2: return <StepRecord stepNumber={1} sentence={SENTENCES[0]} />;
      case 3: return <StepRecord stepNumber={2} sentence={SENTENCES[1]} />;
      case 4: return <StepRecord stepNumber={3} sentence={SENTENCES[2]} />;
      case 5: return <StepComplete />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="max-w-[960px] mx-auto px-8 py-[60px]">

          {/* Step Title Area */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-[28px] font-[800] text-[#1A1A2E] leading-[1.3]">{stepInfo.title}</h1>
              <p className="text-base text-gray-700 mt-2 leading-[1.6]">
                {stepInfo.desc.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            <div
              id="practice-step-badge"
              className="w-[50px] h-[50px] border-2 border-blue-600 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0 ml-6"
            >
              {currentStep} / 5
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[20px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-12 mt-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                id="btn-practice-prev"
                className="px-10 py-3 rounded-lg border-[1.5px] border-blue-600 text-blue-600 bg-white font-semibold text-base cursor-pointer transition-all duration-250 hover:bg-blue-50 hover:-translate-y-px"
                onClick={handlePrev}
              >
                이전
              </button>
            ) : (
              <div />
            )}
            <button
              id="btn-practice-next"
              className="px-10 py-3 rounded-lg bg-blue-600 text-white font-semibold text-base border-none cursor-pointer transition-all duration-250 hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
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
