import React, { useState } from 'react';
import './NewScriptModal.css';

interface NewScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (script: any) => void;
}

const NewScriptModal: React.FC<NewScriptModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ title, content });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">새 대본 작성</h2>
        <input 
          type="text" 
          className="modal-input" 
          placeholder="대본 제목을 입력하세요" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          className="modal-textarea" 
          placeholder="슬라이드 1의 발표 내용을 입력하세요. (슬라이드 별로 입력해주세요)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="modal-add-btn" aria-label="슬라이드 추가">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
          <button className="btn-save" onClick={handleSave}>
            대본 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewScriptModal;
