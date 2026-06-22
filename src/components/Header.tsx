import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

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
      className={`header${scrolled ? ' header--scrolled' : ''}`}
    >
      <div className="header__inner">
        <div className="header__left">
          <Link to="/" className="header__logo" id="header-logo">
            SFITZ
          </Link>

          <nav className="header__nav" aria-label="주요 네비게이션">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                id={`header-nav-${link.to.replace('/', '')}`}
                className={`header__nav-link${
                  location.pathname === link.to
                    ? ' header__nav-link--active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="header__right">
          <span className="header__greeting">
            반갑습니다,{' '}
            <span className="header__username">홍길동</span>님!
          </span>
          <button
            type="button"
            id="header-logout-btn"
            className="header__logout"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
