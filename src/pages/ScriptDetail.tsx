import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScript } from '../hooks/useScript';

const ScriptDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { script, loading } = useScript(id ? Number(id) : undefined);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E8ECF1]">
      <Header />
      <main className="flex-1 pt-16 pb-16">
        <div className="max-w-[960px] mx-auto px-8 py-[60px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[28px] font-bold text-[#1A1A2E]">{script?.title}</h1>
            <div className="flex gap-2">
              <button className="bg-gray-200 text-gray-500 px-5 py-2 rounded-full text-sm font-medium transition-all duration-150 hover:bg-gray-300 hover:text-[#1A1A2E]">
                가이드 음성 듣기
              </button>
              <button
                className="bg-gray-200 text-gray-500 px-5 py-2 rounded-full text-sm font-medium transition-all duration-150 hover:bg-gray-300 hover:text-[#1A1A2E]"
                onClick={() => navigate('/practice')}
              >
                연습 녹음하기
              </button>
            </div>
          </div>

          {/* Content Card: overflow-hidden으로 오른쪽 패널이 카드 끝까지 채워지게 */}
          <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex h-[560px]">
              {/* Slides — 왼쪽 50%, 내용이 넘치면 스크롤 */}
              <div className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
                {script?.slides.map((slide, i) => (
                  <React.Fragment key={slide.order}>
                    {i > 0 && <hr className="border-t border-gray-200 my-1" />}
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-blue-600">{slide.title}</h2>
                      {slide.text.split('\n\n').map((para, j) => (
                        <p key={j} className="text-gray-700 leading-[1.6] text-base">{para}</p>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Right panel — 오른쪽 50%, 카드 끝까지 채움 */}
              <div className="flex-1 bg-[#F4F7FB] border-l border-[#DAEAFF]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScriptDetail;
