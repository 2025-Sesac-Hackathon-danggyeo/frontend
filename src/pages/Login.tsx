import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const id = data.get('id') as string;
    const password = data.get('password') as string;

    setLoading(true);
    setError(null);
    const err = await login(id, password);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8ECF1] p-8">
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-10 w-full max-w-[420px]">
        <h1 className="text-2xl font-bold text-center text-[#1A1A2E] mb-7">로그인</h1>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <input
              name="id"
              className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-[10px] px-4 text-[15px] bg-[#FAFBFC] text-[#1A1A2E] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              type="text"
              placeholder="아이디"
              required
            />
            <input
              name="password"
              className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-[10px] px-4 text-[15px] bg-[#FAFBFC] text-[#1A1A2E] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              type="password"
              placeholder="비밀번호"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
          )}

          <button
            className="w-full h-[52px] bg-blue-600 text-white text-base font-semibold rounded-[10px] mt-5 cursor-pointer border-none transition-all duration-150 hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-gray-400">
          아직 계정이 없으신가요?{' '}
          <Link to="/signup" className="text-blue-600 underline hover:text-blue-700">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
