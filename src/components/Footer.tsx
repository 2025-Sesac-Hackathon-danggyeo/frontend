import './Footer.css';

interface TeamMember {
  name: string;
  role: string;
  university: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: '전준범',
    role: 'PM / UI Design',
    university: '한국공학대학교 미디어디자인공학전공',
    email: 'jb_jeon@naver.com',
  },
  {
    name: '홍 빈',
    role: 'Back-end Develop',
    university: '한국공학대학교 전자공학전공',
    email: 'ghdqls6996@tukorea.ac.kr',
  },
  {
    name: '김지나',
    role: 'Front-end Develop',
    university: '한국공학대학교 산업디자인공학전공',
    email: 'ewenhoop44yy@gmail.com',
  },
  {
    name: '정동휘',
    role: 'Back-end Develop',
    university: '한국공학대학교 전자공학전공',
    email: 'dh_jung@test.com',
  },
];

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        {/* Logo */}
        <div className="footer__logo">SFITZ</div>

        {/* Team members */}
        <div className="footer__team">
          {teamMembers.map((member) => (
            <div key={member.email} className="footer__member">
              <span className="footer__member-name">{member.name}</span>
              <span className="footer__member-role">{member.role}</span>
              <span className="footer__member-university">
                {member.university}
              </span>
              <a
                href={`mailto:${member.email}`}
                className="footer__member-email"
                id={`footer-email-${member.email.split('@')[0]}`}
              >
                <span className="footer__member-email-icon" aria-hidden="true">
                  ✉
                </span>
                {member.email}
              </a>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="footer__divider" />

        {/* Bottom copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 Danggyeoa Team. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed and Developed for 2025년 새싹(SeSAC) 해커톤.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
