import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewScriptModal from '../components/NewScriptModal';
import './MyScript.css';

// Mock data
const INITIAL_SCRIPTS = [
  { id: 1, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 2, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 3, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 4, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 5, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 6, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
  { id: 7, title: '2025년 신제품 런칭 발표', content: '안녕하세요, 오늘 저희가 새롭게 선보일 혁신적인 제품에 대해 ...', date: '2025. 11. 15. 오후 6:12' },
];

const MyScript = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scripts, setScripts] = useState(INITIAL_SCRIPTS);

  const handleCardClick = (id: number) => {
    navigate(`/my-script/${id}`);
  };

  const handleSaveScript = (newScript: any) => {
    // 임시로 목록의 맨 앞에 추가
    setScripts([{
      id: Date.now(),
      title: newScript.title || '새로운 대본',
      content: newScript.content || '내용 없음',
      date: '방금 전'
    }, ...scripts]);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content script-page">
        <div className="container-wide">
          <div className="script-header">
            <h1 className="script-title">내 발표 대본</h1>
          </div>
          
          <div className="script-grid">
            {/* Add New Script Card */}
            <button 
              className="script-card script-card--add" 
              onClick={() => setIsModalOpen(true)}
            >
              <span className="script-card-add-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/O/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="script-card-add-text">새 대본 추가</span>
            </button>

            {/* Script List */}
            {scripts.map(script => (
              <div 
                key={script.id} 
                className="script-card script-card--item"
                onClick={() => handleCardClick(script.id)}
              >
                <h3 className="script-item-title">{script.title}</h3>
                <p className="script-item-content">{script.content}</p>
                <span className="script-item-date">{script.date}</span>
              </div>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="script-pagination">
            <button className="page-arrow">&lt;</button>
            <button className="page-number page-number--active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <button className="page-number">4</button>
            <button className="page-number">5</button>
            <button className="page-number">6</button>
            <button className="page-arrow">&gt;</button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal */}
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
