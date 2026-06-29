import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/about', label: '우리 소개' },
    { to: '/practice', label: '연습하기' },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[1000] transition-shadow duration-250 ${
        scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : ''
      }`}
    >
      <div className="max-w-[960px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Left: logo + nav */}
        <div className="flex items-center">
          <Link
            to="/"
            id="header-logo"
            className="font-black text-2xl text-blue-600 tracking-[-0.5px] font-['Inter',sans-serif] no-underline flex-shrink-0 hover:text-blue-600"
          >
            SFITZ
          </Link>

          <nav className="flex items-center gap-7 ml-12" aria-label="주요 네비게이션">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  id={`header-nav-${link.to.replace('/', '')}`}
                  className={`text-[15px] no-underline py-1 relative transition-colors duration-150 ${
                    isActive
                      ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:rounded-[1px]'
                      : 'text-gray-500 font-normal hover:text-[#1A1A2E]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: user info */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            반갑습니다,{' '}
            <span className="font-bold text-blue-600">홍길동</span>님!
          </span>
          <button
            type="button"
            id="header-logout-btn"
            className="text-[13px] font-medium text-gray-500 bg-[#E8ECF1] border border-gray-200 rounded-full px-4 py-1.5 cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-gray-200"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
