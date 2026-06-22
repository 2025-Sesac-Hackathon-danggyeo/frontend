import { useState, type FormEvent } from 'react';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle sign up logic
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-fields">
            <input
              id="signup-username"
              className="signup-input"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="signup-password"
              className="signup-input"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="signup-confirm-password"
              className="signup-input"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="signup-submit-btn" className="signup-submit" type="submit">
            회원가입하기
          </button>
        </form>

        <p className="signup-terms">
          로그인 시, 발표 교정 도우미의{' '}
          <a id="signup-terms-link" className="signup-terms-link" href="/terms">
            서비스 이용약관
          </a>
          과
          <br />
          <a id="signup-privacy-link" className="signup-terms-link" href="/privacy">
            개인정보 보호정책
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
