import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowUpRight, ArrowRight, ArrowLeft, Plus } from 'lucide-react';

const portfolioData = {
  name: "陈静",
  enName: "CHEN JING",
  title: "Brand Promotion & Event Planning",
  chineseTitle: "品牌宣传 · 营销策划",
  slogan: "四年雇主品牌实战经验/独立构建品牌矩阵/百场活动布展经验",
  contact: {
    phone: "13866383953",
    email: "Kense_i@126.com",
    location: "Shanghai, CN"
  },
  coreCapabilities: [
    { id: "01", title: "媒体矩阵宣传", enTitle: "Media Matrix", desc: "构建品牌矩阵，多渠道内容分发，提升品牌全网声量与认知度。" },
    { id: "02", title: "大型活动策展", enTitle: "Event Curation", desc: "主导策划大型年会、展陈与执行，精准把控现场视效与流程节奏。" },
    { id: "03", title: "全案视频制作", enTitle: "Video Production", desc: "独立完成视频脚本策划、拍摄跟进及后期剪辑，用动态影像讲好品牌故事。" }
  ],
  experience: [
    {
      period: "2022.07 - Present",
      role: "品宣主管",
      company: "上海营邑城市规划设计股份有限公司",
      desc: "从0到1搭建公司宣传体系，独立负责全部品宣业务；制作符合品牌调性、匹配应用场景的宣传物料；统筹各项内外宣工作，全面统筹公司内外百项活动。",
    },
    {
      period: "2021.10 - 2022.11",
      role: "策展助理 / 新媒体编辑",
      company: "上海规划和自然资源局-上海城市公共空间设计促进中心",
      desc: "熟悉政企合作模式，精准把控G端的设计规范与文案风格。参与上海城市空间艺术季筹备工作，负责省部级策展、活动策划与落地执行。",
    },
    {
      period: "2019.09 - 2022.07",
      role: "硕士研究生",
      company: "上海大学上海美术学院",
      desc: "系统深造艺术与设计理论，奠定了扎实的审美素养、设计思维与品牌视觉化构建能力。以“展览化城市为题”，开展系统学术研究。",
    }
  ],
  skills: {
    design: ["Photoshop", "Illustrator", "InDesign", "Figma"],
    video: ["Premiere", "After effects", "脚本策划", "独立剪辑"],
    model: ["3ds Max", "Rhino", "SketchUp"],
    office: ["Office 全系列"]
  },
  projects: [
    { 
      title: "雇主品牌构建重塑", 
      enTitle: "Brand Identity",
      category: "Strategy & Visual", 
      img: "https://raw.githubusercontent.com/1214836412-droid/kenseiweb/2e4d75be28065f16c5b09b4995e843a21f944c68/%E8%BD%A8%E8%BF%B9%E7%B4%A0%E6%9D%90_008.jpg",
      aspectRatio: "aspect-[16/9]"
    },
    { 
      title: "政企合作参展策展", 
      enTitle: "Exhibition Event",
      category: "Curation", 
      img: "https://placehold.co/1200x1500/F7F4EF/2D2A26?text=PROJECT+02",
      aspectRatio: "aspect-[4/5]"
    },
    { 
      title: "内部文化活动运营", 
      enTitle: "Event Planning",
      category: "Event Planning", 
      img: "https://placehold.co/1200x1500/F7F4EF/2D2A26?text=PROJECT+03",
      aspectRatio: "aspect-[4/5]"
    },
    { 
      title: "视频策划剪辑包装", 
      enTitle: "Video Production",
      category: "Video Production", 
      img: "https://placehold.co/1600x900/F7F4EF/2D2A26?text=PROJECT+04",
      aspectRatio: "aspect-[16/9]"
    },
  ]
};

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const MaskText = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className="overflow-hidden inline-block align-bottom leading-tight">
      <div 
        className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${className} ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const FadeSection = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interactiveElements = document.querySelectorAll('.interactive');
    const handleMouseEnter = () => setIsHoveringLink(true);
    const handleMouseLeave = () => setIsHoveringLink(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [currentView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2D2A26] font-sans selection:bg-[#8F8175] selection:text-white cursor-none">
      
      {/* Custom Cursor */}
      <div 
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out flex items-center justify-center
          ${isHoveringLink ? 'scale-[4] bg-[#8F8175]/20 border border-[#8F8175]' : 'scale-100 bg-[#8F8175]'}`}
        style={{ transform: `translate3d(${mousePos.x - 6}px, ${mousePos.y - 6}px, 0) ${isHoveringLink ? 'scale(4)' : 'scale(1)'}` }}
      />

      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 opacity-20">
        <div className="w-px h-full bg-[#C7BDB1]"></div>
        <div className="w-px h-full bg-[#C7BDB1] hidden md:block"></div>
        <div className="w-px h-full bg-[#C7BDB1] hidden md:block"></div>
        <div className="w-px h-full bg-[#C7BDB1]"></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center bg-[#F7F4EF]/80 backdrop-blur-md border-b border-[#C7BDB1]">
        <div 
          onClick={() => setCurrentView('home')}
          className="text-sm font-bold tracking-widest uppercase cursor-pointer interactive flex items-center gap-2"
        >
          <span className="font-serif">陈静</span> <span className="text-[#C7BDB1] font-normal">/</span> {portfolioData.enName} <span className="text-[#8F8175] font-serif italic text-lg">©</span>
        </div>
        <a href={`mailto:${portfolioData.contact.email}`} className="text-xs font-bold text-[#2D2A26] hover:text-[#8F8175] transition-colors uppercase tracking-widest flex items-center gap-2 interactive">
          Contact <ArrowUpRight size={14} />
        </a>
      </nav>

      <main className="relative z-10 pt-24">
        {currentView === 'home' ? (
          <>
            <section className="min-h-[85vh] px-6 md:px-12 flex flex-col justify-end pb-12">
              <div className="flex flex-col gap-0 border-b border-[#2D2A26] pb-12">
                <h1 className="text-[14vw] md:text-[11vw] font-black uppercase leading-[0.8] tracking-tighter text-[#2D2A26]">
                  <MaskText delay={0}>Brand</MaskText>
                </h1>
                <h1 className="text-[14vw] md:text-[11vw] font-black uppercase leading-[0.8] tracking-tighter text-[#8F8175] flex items-center gap-6">
                  <MaskText delay={150}>Strategy</MaskText>
                  <MaskText delay={300} className="hidden md:inline-block">
                     <span className="text-[4vw] font-serif italic text-[#C7BDB1] tracking-normal font-light align-middle">& Events</span>
                  </MaskText>
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
                <div className="md:col-span-3">
                  <FadeSection delay={300}>
                    <p className="text-xs text-[#8F8175] uppercase tracking-widest mb-1 font-bold">Role</p>
                    <p className="text-base font-semibold text-[#2D2A26]">{portfolioData.title}</p>
                    <p className="text-sm text-[#8F8175] mt-1">{portfolioData.chineseTitle}</p>
                  </FadeSection>
                </div>
                <div className="md:col-span-6">
                  <FadeSection delay={400}>
                    <p className="text-xs text-[#8F8175] uppercase tracking-widest mb-1 font-bold">Focus</p>
                    <p className="text-lg md:text-xl leading-relaxed text-[#2D2A26] font-medium">{portfolioData.slogan}</p>
                  </FadeSection>
                </div>
                <div className="md:col-span-3 flex md:justify-end">
                  <FadeSection delay={500}>
                     <p className="text-xs text-[#8F8175] uppercase tracking-widest mb-1 font-bold">Location</p>
                     <p className="text-base font-semibold text-[#2D2A26]">
                        {portfolioData.contact.location}
                     </p>
                  </FadeSection>
                </div>
              </div>
            </section>

            <section className="py-24 md:py-32 px-6 md:px-12">
              <FadeSection delay={200}>
                <div className="max-w-4xl mx-auto border-t border-[#C7BDB1] pt-16">
                  <h3 className="text-xs text-[#8F8175] uppercase tracking-widest font-bold mb-12">// Timeline</h3>
                  <div className="space-y-12">
                    {portfolioData.experience.map((exp, i) => (
                      <div key={i} className="flex gap-8 group">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#8F8175] ring-4 ring-[#F7F4EF] group-hover:scale-125 transition-transform"></div>
                          {i !== portfolioData.experience.length - 1 && <div className="w-px h-full bg-[#C7BDB1] mt-2"></div>}
                        </div>
                        <div className="pb-8">
                          <p className="text-[#8F8175] font-bold text-sm tracking-widest uppercase mb-1">{exp.period}</p>
                          <h4 className="text-lg md:text-xl font-bold text-[#2D2A26]">{exp.role}</h4>
                          <p className="text-[#8F8175] text-sm">{exp.company}</p>
                          <p className="text-[#2D2A26] mt-2 leading-relaxed max-w-2xl">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeSection>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#C7BDB1] pt-12 mt-12">
                {Object.entries(portfolioData.skills).map(([key, items], idx) => (
                  <FadeSection key={key} delay={idx * 100}>
                    <h3 className="text-xs text-[#8F8175] uppercase tracking-widest font-bold mb-6">
                      // {key}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-[#2D2A26] font-medium text-sm md:text-base">{item}</li>
                      ))}
                    </ul>
                  </FadeSection>
                ))}
              </div>
            </section>

            <section className="py-24 md:py-32 px-6 md:px-12 bg-[#EFEBE4]">
              <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                  <MaskText>Core</MaskText><br />
                  <MaskText delay={100}><span className="text-[#8F8175]">Expertise.</span></MaskText>
                </h2>
              </div>

              <div className="border-t border-[#2D2A26]">
                {portfolioData.coreCapabilities.map((cap, idx) => (
                  <FadeSection key={idx}>
                    <div className="group border-b border-[#C7BDB1] py-8 md:py-12 hover:bg-[#F7F4EF] transition-colors duration-500 cursor-pointer interactive">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center px-4 md:px-0">
                        <div className="md:col-span-1 text-[#C7BDB1] font-mono text-xl md:text-2xl font-light group-hover:text-[#8F8175] transition-colors">
                          {cap.id}
                        </div>
                        <div className="md:col-span-5">
                          <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#2D2A26] group-hover:translate-x-4 transition-transform duration-500">
                            {cap.title}
                          </h3>
                        </div>
                        <div className="md:col-span-5">
                           <p className="text-base text-[#8F8175] leading-relaxed">
                             {cap.desc}
                           </p>
                        </div>
                        <div className="md:col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                           <div className="w-12 h-12 rounded-full border border-[#8F8175] flex items-center justify-center text-[#8F8175]">
                              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </section>

            <section className="py-24 md:py-32 px-6 md:px-12">
              <div className="flex justify-between items-end mb-16 border-b border-[#2D2A26] pb-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
                  Selected <span className="text-[#8F8175]">Works.</span>
                </h2>
                <div className="hidden md:block text-[#8F8175] text-sm font-bold uppercase tracking-widest">
                  [ 01 — 03 ]
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-24">
                {portfolioData.projects.map((project, idx) => {
                  const isFullWidth = idx === 0 || idx === 3;
                  const spanClass = isFullWidth ? "md:col-span-2" : "md:col-span-1";
                  const marginClass = !isFullWidth && idx % 2 !== 0 ? "md:mt-32" : "";

                  return (
                    <FadeSection key={idx} delay={idx * 150} className={`${marginClass} ${spanClass}`}>
                      <div className="group cursor-pointer interactive">
                        <div className={`relative overflow-hidden w-full ${project.aspectRatio} bg-[#C7BDB1] mb-6`}>
                          <img 
                            src={project.img} 
                            alt={project.title}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%] group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#8F8175] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                              <span className="w-4 h-px bg-[#8F8175] block"></span> {project.category}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#2D2A26] group-hover:text-[#8F8175] transition-colors">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </FadeSection>
                  );
                })}
              </div>

              <FadeSection delay={200} className="mt-24 md:mt-32 flex justify-center border-t border-[#C7BDB1] pt-16">
                <button 
                  onClick={() => setCurrentView('projects')}
                  className="interactive group relative overflow-hidden px-12 py-5 bg-[#2D2A26] text-[#F7F4EF] font-bold uppercase tracking-widest text-sm hover:text-[#2D2A26] transition-colors duration-500"
                >
                  <span className="relative z-10 flex items-center gap-3">View All Projects <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" /></span>
                  <div className="absolute inset-0 bg-[#8F8175] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </button>
              </FadeSection>
            </section>
          </>
        ) : (
          <div className="min-h-screen px-6 md:px-12 pb-32">
            <button 
              onClick={() => setCurrentView('home')}
              className="interactive group mb-16 inline-flex items-center gap-3 text-[#8F8175] hover:text-[#2D2A26] transition-colors uppercase tracking-widest text-xs font-bold"
            >
              <div className="w-8 h-8 rounded-full border border-[#C7BDB1] flex items-center justify-center group-hover:border-[#8F8175] transition-colors">
                <ArrowLeft size={14} />
              </div>
              Back to Home
            </button>
            <div className="border-b border-[#2D2A26] pb-12 mb-16 flex justify-between items-end">
              <h1 className="text-6xl md:text-8xl font-black text-[#2D2A26] tracking-tighter uppercase leading-none">
                All <br/><span className="text-[#8F8175]">Works.</span>
              </h1>
              <p className="hidden md:block text-[#8F8175] font-mono">
                [ {portfolioData.projects.length} PROJECTS ]
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {portfolioData.projects.map((project, idx) => (
                <FadeSection key={idx} delay={(idx % 3) * 100} className="group cursor-pointer interactive">
                  <div className="relative w-full aspect-[4/5] bg-[#C7BDB1] mb-5 overflow-hidden">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs text-[#8F8175] font-bold uppercase tracking-widest">{project.category}</span>
                       <span className="text-[#C7BDB1] font-mono text-xs">0{idx + 1}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#2D2A26] group-hover:text-[#8F8175] transition-colors leading-snug">{project.title}</h3>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        )}

        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#2D2A26] text-[#F7F4EF] relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
             <FadeSection>
               <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-12 interactive hover:text-[#8F8175] transition-colors duration-500 cursor-pointer">
                 Let's Talk.
               </h2>
             </FadeSection>
             <FadeSection delay={200} className="flex flex-col sm:flex-row gap-6 items-center">
               <a href={`mailto:${portfolioData.contact.email}`} className="interactive px-8 py-4 bg-[#F7F4EF] text-[#2D2A26] font-bold uppercase tracking-widest text-sm hover:bg-[#8F8175] hover:text-[#F7F4EF] transition-colors duration-300 flex items-center gap-3">
                 <Mail size={16} /> Email Me
               </a>
             </FadeSection>
          </div>
          <div className="mt-32 flex flex-col md:flex-row justify-between items-center text-[#8F8175] text-xs font-bold uppercase tracking-widest border-t border-[#8F8175]/30 pt-8">
            <p>© {new Date().getFullYear()} CHEN JING.</p>
            <p className="mt-4 md:mt-0">Based in Shanghai</p>
          </div>
        </section>
      </main>
    </div>
  );
}