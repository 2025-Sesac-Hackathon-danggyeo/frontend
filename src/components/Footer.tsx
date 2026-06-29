interface TeamMember {
  name: string;
  role: string;
  university: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  { name: '전준범', role: 'PM / UI Design',       university: '한국공학대학교 미디어디자인공학전공', email: 'jb_jeon@naver.com' },
  { name: '홍 빈', role: 'Back-end Develop',       university: '한국공학대학교 전자공학전공',         email: 'ghdqls6996@tukorea.ac.kr' },
  { name: '김지나', role: 'Front-end Develop',     university: '한국공학대학교 산업디자인공학전공',   email: 'ewenhoop44yy@gmail.com' },
  { name: '정동휘', role: 'Back-end Develop',      university: '한국공학대학교 전자공학전공',         email: 'dh_jung@test.com' },
];

const Footer = () => (
  <footer id="footer" className="bg-[#F1F3F6] pt-[60px] pb-10">
    <div className="max-w-[960px] mx-auto px-8">
      <div className="font-black text-[28px] text-[#1A1A2E] tracking-[-0.5px] mb-8">
        SFITZ
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        {teamMembers.map((member) => (
          <div key={member.email} className="flex flex-col gap-1">
            <span className="text-[18px] font-bold text-[#1A1A2E] mb-0.5">{member.name}</span>
            <span className="text-[13px] font-medium text-gray-500">{member.role}</span>
            <span className="text-[13px] text-gray-400 leading-[1.4]">{member.university}</span>
            <a
              href={`mailto:${member.email}`}
              id={`footer-email-${member.email.split('@')[0]}`}
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 no-underline mt-1 transition-colors duration-150 hover:text-blue-600"
            >
              <span className="text-[13px] leading-none flex-shrink-0" aria-hidden="true">✉</span>
              {member.email}
            </a>
          </div>
        ))}
      </div>

      <hr className="border-none border-t border-gray-200 mb-6" />

      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-gray-400 leading-[1.6]">© 2025 Danggyeoa Team. All rights reserved.</p>
        <p className="text-[13px] text-gray-400 leading-[1.6]">Designed and Developed for 2025년 새싹(SeSAC) 해커톤.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
