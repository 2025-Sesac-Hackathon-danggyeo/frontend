import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewScriptModal from '../components/NewScriptModal';
import { useScripts } from '../hooks/useScripts';
import type { Slide } from '../types';

const PER_PAGE = 7; // 4열 2행 기준 add 카드 1개 포함 = 스크립트 7개

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

const MyScript = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { scripts, createScript, deleteScript } = useScripts();

  const totalPages = Math.max(1, Math.ceil(scripts.length / PER_PAGE));

  // 삭제 후 현재 페이지가 비어 있으면 앞 페이지로 이동
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedScripts = scripts.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const handleSaveScript = async (newScript: { title: string; content: string; slides: Slide[] }) => {
    await createScript(newScript);
    setCurrentPage(1); // 새 대본은 항상 1페이지 맨 앞에 추가됨
  };

  const handleDeleteConfirm = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await deleteScript(id);
    setDeletingId(null);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-20 bg-[#E8ECF1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mt-[60px] mb-8">
            <h1 className="text-2xl font-[800] text-[#1A1A2E]">내 발표 대본</h1>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-12">
            {/* Add New Script Card */}
            <button
              className="h-[280px] rounded-2xl px-6 py-8 flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-slate-300 cursor-pointer transition-all duration-250 hover:bg-white/50 hover:border-gray-400 hover:-translate-y-1"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-gray-500">새 대본 추가</span>
            </button>

            {/* Script Cards */}
            {paginatedScripts.map(script => (
              <div
                key={script.id}
                className="group relative h-[280px] rounded-2xl px-6 py-8 flex flex-col bg-white border border-gray-200 shadow-sm cursor-pointer transition-all duration-250 text-left hover:shadow-md hover:-translate-y-1"
                onClick={() => deletingId !== script.id && navigate(`/my-script/${script.id}`)}
              >
                {/* 삭제 버튼 */}
                <button
                  type="button"
                  aria-label="대본 삭제"
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-150 hover:text-red-500 hover:bg-red-50"
                  onClick={(e) => { e.stopPropagation(); setDeletingId(script.id); }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>

                <h3 className="text-[17px] font-bold text-[#1A1A2E] mb-4 leading-[1.4] pr-6">{script.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.6] flex-grow overflow-hidden line-clamp-4">{script.content}</p>
                <span className="text-[13px] text-gray-400 mt-4">{script.date}</span>

                {/* 삭제 확인 오버레이 */}
                {deletingId === script.id && (
                  <div
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-5 p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </div>
                      <p className="text-[15px] font-semibold text-[#1A1A2E]">정말 삭제하시겠어요?</p>
                      <p className="text-xs text-gray-400 text-center">삭제된 대본은 복구할 수 없습니다.</p>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button
                        type="button"
                        className="flex-1 h-9 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium transition-colors hover:bg-gray-50"
                        onClick={(e) => { e.stopPropagation(); setDeletingId(null); }}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-9 rounded-lg bg-red-500 text-white text-sm font-medium transition-colors hover:bg-red-600"
                        onClick={(e) => handleDeleteConfirm(e, script.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1 mt-[60px]">
              {/* 이전 */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-sm text-gray-500 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                &lt;
              </button>

              {/* 페이지 번호 */}
              {pageNumbers.map((item, i) =>
                item === '...' ? (
                  <span key={`ellipsis-${i}`} className="w-8 h-8 inline-flex items-center justify-center text-sm text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item)}
                    className={`w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-medium transition-all duration-150 ${
                      item === currentPage
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              {/* 다음 */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-sm text-gray-500 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <NewScriptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveScript}
        />
      )}
    </div>
  );
};

export default MyScript;
