import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    if (password !== confirmPassword) return;

    const ok = await signUp(username, password);
    if (ok) navigate('/my-script');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8ECF1] p-8">
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-10 w-full max-w-[420px]">
        <h1 className="text-2xl font-bold text-center text-[#1A1A2E] mb-7">회원가입</h1>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <input
              name="username"
              id="signup-username"
              className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-[10px] px-4 text-[15px] bg-[#FAFBFC] text-[#1A1A2E] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              type="text"
              placeholder="아이디"
              required
            />
            <input
              name="password"
              id="signup-password"
              className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-[10px] px-4 text-[15px] bg-[#FAFBFC] text-[#1A1A2E] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              type="password"
              placeholder="비밀번호"
              required
            />
            <input
              name="confirmPassword"
              id="signup-confirm-password"
              className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-[10px] px-4 text-[15px] bg-[#FAFBFC] text-[#1A1A2E] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              type="password"
              placeholder="비밀번호 확인"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
          )}

          <button
            id="signup-submit-btn"
            className="w-full h-[52px] bg-blue-600 text-white text-base font-semibold rounded-[10px] mt-5 cursor-pointer border-none transition-all duration-150 hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] active:translate-y-0 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? '처리 중...' : '회원가입하기'}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-gray-400 leading-[1.6]">
          로그인 시, 발표 교정 도우미의{' '}
          <a id="signup-terms-link" className="text-blue-600 underline cursor-pointer text-[13px] hover:text-blue-700" href="/terms">
            서비스 이용약관
          </a>
          과
          <br />
          <a id="signup-privacy-link" className="text-blue-600 underline cursor-pointer text-[13px] hover:text-blue-700" href="/privacy">
            개인정보 보호정책
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
