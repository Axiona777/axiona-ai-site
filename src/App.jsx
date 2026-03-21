import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, ArrowRight, ChevronRight,
  Zap, Brain, BarChart3, Settings, Shield, TrendingUp,
  AlertTriangle, Layers, Mail, CheckCircle,
} from 'lucide-react';
import { companyData, mailtoConfig } from './data/config.js';
import { heroContent, statsContent, doloresContent, portafolioContent, metodologiaContent, contactoContent } from './data/content.js';

// ═══════════════════════════════════════════════
// LOGO SVG
// ═══════════════════════════════════════════════
const AxionaLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="92" stroke="#2BCBCA" strokeWidth="5"/>
    <path d="M56 150L88 58L102 92L72 150Z" fill="#1C3D6E"/>
    <path d="M144 150L112 58L98 92L128 150Z" fill="#2BCBCA"/>
    <path d="M100 92L88 58L112 58Z" fill="#153260" opacity="0.85"/>
  </svg>
);

// ═══════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════
const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      setWidth(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
};

// ═══════════════════════════════════════════════
// REVEAL — 3 VARIANTES
// ═══════════════════════════════════════════════
const Reveal = ({ children, delay = 0, className = '', variant = 'up' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '40px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hiddenStyles = {
    up:    { opacity: 0, transform: 'translateY(32px)' },
    blur:  { opacity: 0, transform: 'scale(0.97)', filter: 'blur(12px)' },
    left:  { opacity: 0, transform: 'translateX(-40px)' },
    right: { opacity: 0, transform: 'translateX(40px)' },
  };
  const shownStyles = {
    up:    { opacity: 1, transform: 'translateY(0px)' },
    blur:  { opacity: 1, transform: 'scale(1.0)',    filter: 'blur(0px)' },
    left:  { opacity: 1, transform: 'translateX(0px)' },
    right: { opacity: 1, transform: 'translateX(0px)' },
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1), filter 800ms cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${delay}ms`,
        ...(visible ? shownStyles[variant] : hiddenStyles[variant]),
      }}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════
// MAGNETIC CARD — 3D TILT ON HOVER
// ═══════════════════════════════════════════════
const MagneticCard = ({ children, className = '' }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const ry = ((x - cx) / cx) * 8;
    const rx = -((y - cy) / cy) * 8;
    setTilt({ rx, ry });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <div className={`magnetic-wrap ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.rx !== 0 || tilt.ry !== 0 ? 10 : 0}px)`,
          transition: tilt.rx === 0 && tilt.ry === 0 ? 'transform 0.6s ease' : 'transform 0.08s ease',
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// COUNT UP
// ═══════════════════════════════════════════════
const CountUp = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ═══════════════════════════════════════════════
// TYPEWRITER
// ═══════════════════════════════════════════════
const Typewriter = ({ text, speed = 35 }) => {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
        // blink cursor 3 times then hide
        let blinks = 0;
        const blink = setInterval(() => {
          setCursorVisible(v => !v);
          blinks++;
          if (blinks >= 6) {
            clearInterval(blink);
            setCursorVisible(false);
            setDone(true);
          }
        }, 400);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            background: '#2BCBCA',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      )}
    </span>
  );
};

// ═══════════════════════════════════════════════
// ANIMATED CONNECTOR LINE (metodología)
// ═══════════════════════════════════════════════
const ConnectorLine = () => {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="hidden md:block absolute top-[60px] left-[16.66%] right-[16.66%] h-[1px] pointer-events-none z-0">
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, transparent, #2BCBCA, transparent)',
          width: drawn ? '100%' : '0%',
          transition: 'width 1200ms cubic-bezier(0.16,1,0.3,1)',
          transitionDelay: '300ms',
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════
// STEP NUMBER (animated reveal)
// ═══════════════════════════════════════════════
const StepNumber = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute top-6 right-6 font-mono text-[80px] font-black text-white/[0.035] leading-none pointer-events-none select-none"
      style={{
        transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(1.5)',
      }}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════
// UI PRIMITIVES
// ═══════════════════════════════════════════════
const Button = ({ children, variant = 'primary', className = '', href, onClick }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none cursor-pointer';
  const variants = {
    primary: 'bg-[#2BCBCA] text-[#07080F] hover:bg-[#5DDBD9] hover:-translate-y-0.5 shadow-[0_0_24px_rgba(43,203,202,0.25)] hover:shadow-[0_0_40px_rgba(43,203,202,0.5)] px-7 py-3.5 text-sm',
    secondary: 'bg-white/[0.05] text-[#EDF0FF] border border-white/[0.10] hover:bg-white/[0.09] hover:border-white/[0.18] px-7 py-3.5 text-sm backdrop-blur-sm',
    outline: 'bg-transparent text-[#7B84AA] border border-white/[0.08] hover:border-[#2BCBCA]/40 hover:text-[#2BCBCA] px-7 py-3.5 text-sm',
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  const inner = variant === 'primary' ? (
    <>
      {children}
      <span className="shimmer-inner" aria-hidden="true" />
    </>
  ) : children;

  const wrapCls = variant === 'primary' ? `btn-shimmer ${cls}` : cls;

  if (href) return <a href={href} className={wrapCls}>{inner}</a>;
  return <button onClick={onClick} className={wrapCls}>{inner}</button>;
};

const MonoTag = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2BCBCA]/[0.08] border border-[#2BCBCA]/[0.18] text-[#2BCBCA] text-[11px] font-mono font-semibold tracking-[3px] uppercase">
    {children}
  </span>
);

const Section = ({ children, id, className = '' }) => (
  <section id={id} className={`py-28 md:py-36 relative z-10 ${className}`}>
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      {children}
    </div>
  </section>
);

// ═══════════════════════════════════════════════
// DATA — aliases from content.js
// ═══════════════════════════════════════════════
const dolores = doloresContent.items;
const servicios = portafolioContent.servicios;
const metodologia = metodologiaContent.etapas;
const proceso = metodologiaContent.proceso;
const statsData = statsContent.items;

// ═══════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    ['portafolio',  'Portafolio'],
    ['metodologia', 'Metodología'],
    ['contacto',    'Contacto'],
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#07080F]/85 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_1px_0_rgba(43,203,202,0.04)]' : ''
      }`}
      style={{ marginTop: '2px' /* leave room for progress bar */ }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[62px]">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
          <AxionaLogo size={26} />
          <span className="font-black text-[17px] tracking-[-0.5px] text-[#EDF0FF] group-hover:text-[#2BCBCA] transition-colors">Axiona</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="text-[13px] font-medium text-[#7B84AA] hover:text-[#2BCBCA] transition-colors duration-200 tracking-tight">
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex">
          <Button href={mailtoConfig.href} variant="primary" className="text-xs px-5 py-2.5 rounded-lg">
            Agendar diagnóstico <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 text-[#7B84AA] hover:text-[#EDF0FF] transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0D0F1C]/95 backdrop-blur-2xl border-t border-white/[0.05] px-5 pt-4 pb-6 flex flex-col gap-1">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="text-left text-sm text-[#7B84AA] hover:text-[#EDF0FF] transition-colors py-3 border-b border-white/[0.04] last:border-0">
              {label}
            </button>
          ))}
          <Button href={mailtoConfig.href} variant="primary" className="mt-4 w-full justify-center text-sm">
            Agendar diagnóstico
          </Button>
        </div>
      )}
    </nav>
  );
};

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
const Hero = () => {
  const heroTitleRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!heroTitleRef.current) return;
      const y = window.scrollY * 0.15;
      heroTitleRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-[62px] overflow-hidden">

      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(43,203,202,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(43,203,202,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 62% 48%, black 0%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse 75% 65% at 62% 48%, black 0%, transparent 72%)',
          animation: 'grid-move 20s linear infinite',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 68% 52% at 64% 44%, rgba(43,203,202,0.07) 0%, transparent 65%), radial-gradient(ellipse 48% 68% at 84% 82%, rgba(28,61,110,0.14) 0%, transparent 60%)',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width: 400, height: 400,
          top: '10%', left: '-8%',
          background: 'rgba(43,203,202,0.08)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width: 600, height: 600,
          top: '30%', right: '-15%',
          background: 'rgba(28,61,110,0.15)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width: 300, height: 300,
          bottom: '5%', left: '35%',
          background: 'rgba(43,203,202,0.05)',
          animation: 'float 16s ease-in-out infinite',
          animationDelay: '-8s',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28 relative z-10">

        {/* Eyebrow with shimmer container */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 mb-9 relative overflow-hidden rounded-full">
            {/* shimmer sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(43,203,202,0.18) 50%, transparent 100%)',
                animation: 'shimmer-sweep 3s ease-in-out infinite',
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#2BCBCA] relative z-10"
              style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-[#2BCBCA] relative z-10 pr-2">
              Colombia · Estados Unidos · 2026
            </span>
          </div>
        </Reveal>

        {/* Title — parallax + animated gradient */}
        <div ref={heroTitleRef} style={{ willChange: 'transform' }}>
          <Reveal delay={100} variant="blur">
            <h1 className="text-[clamp(46px,8vw,92px)] font-black tracking-[-3px] leading-[0.88] mb-8">
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #EDF0FF 0%, rgba(237,240,255,0.55) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Transformamos
              </span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(125deg, #2BCBCA 0%, #7EEAE9 45%, #ffffff 85%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 4s ease-in-out infinite alternate',
                }}
              >
                datos en resultados.
              </span>
            </h1>
          </Reveal>
        </div>

        {/* Description — typewriter */}
        <Reveal delay={200}>
          <p className="text-[17px] md:text-xl text-[#7B84AA] max-w-[560px] leading-[1.75] mb-12 font-light">
            <Typewriter text="IA y automatización para PYMES y empresas que quieren crecer con claridad. No somos un proveedor — somos el puente entre tu visión financiera y la ejecución técnica." speed={22} />
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button href={mailtoConfig.href} variant="primary" className="text-[13px] px-8 py-4 rounded-xl">
              Diagnóstico sin costo <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth' })}
              variant="secondary"
              className="text-[13px] px-8 py-4 rounded-xl"
            >
              Ver portafolio <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Reveal>

        {/* Meta bar */}
        <Reveal delay={450}>
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-20 pt-10 border-t border-white/[0.05]">
            {[
              ['AXIONA INTELIGENCIA', 'IA Estratégica'],
              ['AXIONA OPERA',        'Automatización'],
              ['DIAGNÓSTICO',         'Sin costo · 60 min'],
              ['MERCADOS',            'Colombia · US'],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="font-mono text-[9px] tracking-[2.5px] uppercase text-[#3D4566] mb-1">{label}</div>
                <div className="text-sm font-semibold text-[#7B84AA] tracking-tight">{val}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════
const Stats = () => (
  <section className="relative z-10 py-20 border-t border-white/[0.04]" style={{ background: '#0D0F1C' }}>
    {/* subtle top/bottom glow lines */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2BCBCA]/20 to-transparent pointer-events-none" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2BCBCA]/20 to-transparent pointer-events-none" />

    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {statsData.map((stat, i) => (
          <Reveal key={i} delay={i * 100} variant="up">
            <div
              className="relative flex flex-col items-center text-center px-6 py-8 group"
              style={{
                borderRight: i < statsData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(43,203,202,0.04) 0%, transparent 70%)' }} />

              <div
                className="text-[clamp(40px,5vw,62px)] font-black tracking-[-2px] leading-none mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2BCBCA 0%, #7EEAE9 60%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <CountUp target={stat.number} suffix={stat.suffix} duration={2000} />
              </div>
              <div className="text-[13px] font-bold text-[#EDF0FF] mb-1 tracking-tight">{stat.label}</div>
              <div className="font-mono text-[10px] text-[#3D4566] tracking-wider uppercase leading-relaxed">{stat.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════
// DOLORES
// ═══════════════════════════════════════════════
const Dolores = () => (
  <Section id="dolores" className="border-t border-white/[0.04]">
    <Reveal variant="blur">
      <div className="text-center mb-16">
        <MonoTag>El problema</MonoTag>
        <h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-[-2px] mt-6 mb-5 text-[#EDF0FF] leading-tight">
          ¿Alguno de estos<br />te suena familiar?
        </h2>
        <p className="text-[#7B84AA] text-[17px] font-light max-w-lg mx-auto leading-relaxed">
          Los dolores que frenan a las empresas más capaces. Axiona existe para resolverlos.
        </p>
      </div>
    </Reveal>

    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 rounded-[28px] overflow-hidden"
      style={{ gap: '2px', background: 'rgba(255,255,255,0.04)' }}
    >
      {dolores.map((dolor, i) => {
        const Icon = dolor.icon;
        return (
          <Reveal key={i} delay={i * 70}>
            <MagneticCard className="h-full">
              <div className="card-glow bg-[#0D0F1C] p-8 h-full hover:bg-[#131829] transition-colors duration-300 group cursor-default rounded-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <Icon className="w-4 h-4 text-[#2BCBCA]/50 group-hover:text-[#2BCBCA] transition-colors duration-300 flex-shrink-0" />
                  <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-[#3D4566] group-hover:text-[#2BCBCA]/60 transition-colors">{dolor.tag}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#EDF0FF] mb-3 leading-snug tracking-tight">{dolor.title}</h3>
                <p className="text-sm text-[#7B84AA] leading-relaxed font-light">{dolor.desc}</p>
              </div>
            </MagneticCard>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

// ═══════════════════════════════════════════════
// PORTAFOLIO
// ═══════════════════════════════════════════════
const Portafolio = () => (
  <Section id="portafolio" className="border-t border-white/[0.04]">
    <Reveal variant="blur">
      <div className="text-center mb-16">
        <MonoTag>Portafolio</MonoTag>
        <h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-[-2px] mt-6 mb-5 text-[#EDF0FF] leading-tight">
          Dos servicios.<br />Un solo objetivo.
        </h2>
        <p className="text-[#7B84AA] text-[17px] font-light max-w-lg mx-auto leading-relaxed">
          Inteligencia y operación, diseñados para trabajar juntos o de forma independiente según la madurez de tu empresa.
        </p>
      </div>
    </Reveal>

    <div
      className="grid md:grid-cols-2 rounded-[28px] overflow-hidden"
      style={{ gap: '2px', background: 'rgba(255,255,255,0.04)' }}
    >
      {servicios.map((s, i) => (
        <Reveal key={s.id} delay={i * 120} variant={i === 0 ? 'left' : 'right'}>
          <MagneticCard className="h-full">
            <div className="card-glow bg-[#0D0F1C] p-10 h-full flex flex-col hover:bg-[#131829] transition-colors duration-300 relative overflow-hidden group rounded-sm">

              {/* BG glow */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: i === 0 ? 'rgba(43,203,202,0.06)' : 'rgba(28,61,110,0.2)' }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Badge */}
                <div className="mb-6">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-semibold tracking-[2.5px] uppercase mb-3"
                    style={i === 0
                      ? { background: 'rgba(43,203,202,0.08)', borderColor: 'rgba(43,203,202,0.22)', color: '#2BCBCA' }
                      : { background: 'rgba(28,61,110,0.25)', borderColor: 'rgba(28,61,110,0.5)', color: '#6A94D9' }
                    }
                  >
                    {s.tag}
                  </span>
                  <h3 className="text-[22px] font-black tracking-tight text-[#EDF0FF] mb-2">{s.tagline}</h3>
                  <p
                    className="text-[13px] italic font-light leading-relaxed"
                    style={{ color: i === 0 ? 'rgba(43,203,202,0.75)' : 'rgba(106,148,217,0.75)' }}
                  >
                    "{s.quote}"
                  </p>
                </div>

                <p className="text-[#7B84AA] text-sm leading-relaxed mb-8 font-light">{s.desc}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#7B84AA]">
                      <span
                        className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: i === 0 ? '#2BCBCA' : '#1C3D6E' }}
                      />
                      <span className="font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="p-4 rounded-xl border text-[12px] font-mono leading-relaxed"
                  style={i === 0
                    ? { background: 'rgba(43,203,202,0.04)', borderColor: 'rgba(43,203,202,0.12)', color: 'rgba(43,203,202,0.75)' }
                    : { background: 'rgba(28,61,110,0.15)', borderColor: 'rgba(28,61,110,0.3)', color: 'rgba(106,148,217,0.75)' }
                  }
                >
                  <span className="font-semibold tracking-widest uppercase text-[9px] block mb-1 opacity-60">Resultado esperado</span>
                  {s.resultado}
                </div>
              </div>
            </div>
          </MagneticCard>
        </Reveal>
      ))}
    </div>

    <Reveal delay={250}>
      <div className="text-center mt-12">
        <p className="text-[#7B84AA] text-sm mb-5">¿No sabes cuál necesitas? En el diagnóstico lo definimos juntos — sin costo.</p>
        <Button href={mailtoConfig.href} variant="primary">
          Agendar diagnóstico gratuito <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Reveal>
  </Section>
);

// ═══════════════════════════════════════════════
// METODOLOGÍA
// ═══════════════════════════════════════════════
const Metodologia = () => (
  <Section id="metodologia" className="border-t border-white/[0.04]">
    <Reveal variant="blur">
      <div className="text-center mb-16">
        <MonoTag>Metodología</MonoTag>
        <h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-[-2px] mt-6 mb-5 text-[#EDF0FF] leading-tight">
          El crecimiento no ocurre<br />por azar. Ocurre por diseño.
        </h2>
        <p className="text-[#7B84AA] text-[17px] font-light max-w-lg mx-auto leading-relaxed">
          Diagnosticamos tu nivel actual y diseñamos el camino exacto al siguiente. Resultados medibles en cada etapa.
        </p>
      </div>
    </Reveal>

    {/* Steps — with connector line */}
    <div className="relative mb-5">
      <ConnectorLine />
      <div
        className="grid md:grid-cols-3 rounded-[28px] overflow-hidden"
        style={{ gap: '2px', background: 'rgba(255,255,255,0.04)' }}
      >
        {metodologia.map((m, i) => (
          <Reveal key={i} delay={i * 120}>
            <MagneticCard className="h-full">
              <div className="card-glow bg-[#0D0F1C] p-10 h-full hover:bg-[#131829] transition-colors duration-300 relative group cursor-default overflow-hidden rounded-sm">
                <StepNumber>{m.step}</StepNumber>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2BCBCA]/[0.08] border border-[#2BCBCA]/[0.18] text-[#2BCBCA] text-[10px] font-mono font-semibold tracking-[2.5px] uppercase mb-6 relative z-10">
                  {m.tag}
                </span>
                <h3 className="text-2xl font-black tracking-[-0.5px] text-[#EDF0FF] mb-4 relative z-10">{m.name}</h3>
                <p className="text-sm text-[#7B84AA] leading-[1.8] font-light relative z-10">{m.desc}</p>
              </div>
            </MagneticCard>
          </Reveal>
        ))}
      </div>
    </div>

    {/* Proceso comercial */}
    <Reveal delay={200}>
      <div className="bg-[#0D0F1C] border border-white/[0.06] rounded-[20px] p-10">
        <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#3D4566] mb-8">Proceso de trabajo</div>
        <div className="grid md:grid-cols-3 gap-10">
          {proceso.map((p, i) => (
            <div key={i} className="flex gap-4">
              <div className="font-mono text-xl font-bold text-[#2BCBCA] flex-shrink-0 mt-0.5">{p.n}</div>
              <div>
                <div className="font-black text-[#EDF0FF] mb-1 tracking-tight">{p.title}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-[#2BCBCA]/55 mb-2.5">{p.sub}</div>
                <p className="text-sm text-[#7B84AA] font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </Section>
);

// ═══════════════════════════════════════════════
// CONTACTO
// ═══════════════════════════════════════════════
const Contacto = () => (
  <Section id="contacto" className="border-t border-white/[0.04]">
    <Reveal variant="blur">
      <div
        className="relative rounded-[28px] overflow-hidden text-center px-8 py-20 md:py-24"
        style={{ background: 'linear-gradient(135deg, rgba(28,61,110,0.35) 0%, rgba(7,8,15,0.95) 60%)' }}
      >
        <div className="absolute inset-0 rounded-[28px] border border-[#1C3D6E]/30 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(43,203,202,0.07) 0%, transparent 68%)' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#2BCBCA]"
              style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-[#2BCBCA]">Diagnóstico sin costo · 60 minutos</span>
          </div>

          <h2 className="text-[clamp(32px,5.5vw,60px)] font-black tracking-[-2px] text-[#EDF0FF] mb-6 leading-[1.05]">
            Tu operación merece<br />
            <span style={{
              background: 'linear-gradient(125deg, #2BCBCA 0%, #7EEAE9 60%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 4s ease-in-out infinite alternate',
            }}>
              más claridad.
            </span>
          </h2>

          <p className="text-[#7B84AA] text-[17px] font-light mb-10 leading-relaxed">
            En 60 minutos identificamos las oportunidades más grandes de tu negocio y diseñamos el camino. Sin costo. Sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={mailtoConfig.href} variant="primary" className="text-[14px] px-10 py-4 rounded-xl">
              Escribirnos ahora <Mail className="w-4 h-4" />
            </Button>
            <Button href={`mailto:${companyData.contactEmail}`} variant="secondary" className="text-[12px] px-10 py-4 rounded-xl font-mono tracking-wider">
              {companyData.contactEmail}
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  </Section>
);

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════
const Footer = () => (
  <footer className="border-t border-white/[0.05] px-5 sm:px-8 py-10">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
        <AxionaLogo size={22} />
        <div>
          <div className="font-black text-sm text-[#EDF0FF] group-hover:text-[#2BCBCA] transition-colors">Axiona</div>
          <div className="font-mono text-[10px] text-[#3D4566] tracking-[1px]">axiona-tech.com</div>
        </div>
      </button>

      <p className="font-mono text-[10px] text-[#3D4566] tracking-[1px] leading-relaxed max-w-xs text-center">
        "La tecnología que piensa con la<br />misma visión financiera que tú."
      </p>

      <div className="font-mono text-[10px] text-[#3D4566] tracking-[1px]">
        Colombia · United States · © 2026
      </div>
    </div>
  </footer>
);

// ═══════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════
export default function App() {
  return (
    <div className="bg-[#07080F] text-[#EDF0FF] min-h-screen font-sans antialiased overflow-x-hidden">
      <ScrollProgressBar />
      <Nav />
      <Hero />
      <Stats />
      <Dolores />
      <Portafolio />
      <Metodologia />
      <Contacto />
      <Footer />
    </div>
  );
}
