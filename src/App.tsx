import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Globe, Share2, Clapperboard, Film, Palette, Search,
  Mail, Phone, MapPin, Instagram, MessageCircle, ArrowRight,
  Check, Star, Sparkles, Menu, X, Loader2, ChevronDown,
  Play, Zap, Shield, Clock, TrendingUp, Award,
  Rocket, Target, Heart, Quote, ArrowUpRight, Cpu,
  Code2, Megaphone, BarChart3, Users,
} from 'lucide-react';
import { supabase } from './lib/supabase';

// ─── Business Details ────────────────────────────────────────────────────────
const B = {
  name: 'ViralNova',
  email: 'Urrehmanmargoob@gmail.com',
  phone: '+91 6398202864',
  whatsapp: '916398202864',
  location: 'Bijnor, Uttar Pradesh, India',
  instagram: 'https://instagram.com/mr_nobody6398',
  instagramHandle: '@mr_nobody6398',
};

// ─── Motion Variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const stepTime = 16;
    const steps = Math.ceil((duration * 1000) / stepTime);
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 20));
  }, [scrollY]);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}
    >
      <nav className="container-px flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="group flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-500 to-electric-500 shadow-glow-mix transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="glow-text">ViralNova</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/65 transition-colors hover:text-white">{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary !px-5 !py-2.5">Get Consultation <ArrowRight className="h-4 w-4" /></a>
        </div>
        <button onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-neon-600/25 blur-[140px] animate-orb" />
      <div className="pointer-events-none absolute -top-20 right-1/4 h-[32rem] w-[32rem] translate-x-1/2 rounded-full bg-electric-600/20 blur-[140px] animate-orb" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-accent-500/10 blur-[100px]" />

      <motion.div style={{ y, opacity }} className="container-px relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="section-eyebrow"><Sparkles className="h-3.5 w-3.5" /> Premium Digital Marketing Agency</span>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="mt-7 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Scale Your Brand.<br />
            <span className="text-gradient-mix glow-text">Dominate Social Media.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="mx-auto mt-7 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
          >
            We help businesses grow with high-converting websites, AI-powered content, social media marketing, and premium branding.
          </motion.p>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#portfolio" className="btn-ghost w-full sm:w-auto">
              <Play className="h-4 w-4" /> View Portfolio
            </a>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: 250, suffix: '+', label: 'Projects Delivered' },
              { value: 12, suffix: 'M+', label: 'Reach Generated' },
              { value: 98, suffix: '%', label: 'Client Satisfaction' },
              { value: 5, suffix: '+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-2 w-1 rounded-full bg-white/50"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Logo Marquee ─────────────────────────────────────────────────────────────
const CLIENTS = ['National UPVC', 'ZenBot AI', 'Lumen Skincare', 'FitFuel', 'NovaBites', 'PulseWear', 'Aura Labs', 'Verde Co'];
function LogoMarquee() {
  return (
    <section className="border-y border-white/5 bg-ink-900/50 py-8">
      <div className="container-px">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Trusted by ambitious brands worldwide</p>
        <div className="mask-fade-edges overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="font-display text-xl font-bold text-white/30 transition-colors hover:text-white/60">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Code2,       title: 'Website Development',      desc: 'Lightning-fast, conversion-optimized websites built with modern tech. Custom designs that turn visitors into customers.', color: 'from-neon-500 to-neon-700' },
  { icon: Share2,      title: 'Social Media Management',   desc: 'Full-service management across Instagram, TikTok, LinkedIn, and YouTube. Content to community, end to end.', color: 'from-electric-500 to-electric-700' },
  { icon: Clapperboard, title: 'AI Advertisement Videos',  desc: 'AI-powered video ads that capture attention and drive conversions. Cutting-edge production at fraction of the cost.', color: 'from-neon-500 to-electric-500' },
  { icon: Film,        title: 'Reels Editing',             desc: 'Scroll-stopping reels engineered for maximum reach and engagement. Fast turnaround, premium quality.', color: 'from-electric-500 to-neon-600' },
  { icon: Palette,     title: 'Graphic Design',            desc: 'Premium visual identity, motion graphics, and creative that makes your brand unmissable across every touchpoint.', color: 'from-neon-400 to-neon-600' },
  { icon: Search,      title: 'SEO Optimization',          desc: 'Climb the rankings with data-driven SEO. Technical, on-page, and content strategies that deliver sustainable traffic.', color: 'from-electric-400 to-electric-600' },
];

function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="container-px">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">What We Do</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Services that <span className="text-gradient">drive real growth</span>
          </h2>
          <p className="mt-4 text-white/70">A full-stack digital growth engine — from websites to AI ads, all under one roof.</p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={scaleIn} whileHover={{ y: -6 }} className="card group h-full p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-glow transition-all duration-300 group-hover:scale-110`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">{s.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-neon-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Portfolio ───────────────────────────────────────────────────────────────
const PORTFOLIO = [
  { img: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'National UPVC', result: '+840% Instagram reach in 90 days', tag: 'Social Media + Branding' },
  { img: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'Restaurant Marketing', result: '3x footfall in 4 months', tag: 'Social Media + Ads' },
  { img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'AI Advertisement', result: '5.2x ROAS on video campaigns', tag: 'AI Video Ads' },
  { img: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'Business Website', result: '2.4x conversion rate uplift', tag: 'Web Development' },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-neon-600/10 blur-[120px]" />
      <div className="container-px relative">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Our Work</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Results that <span className="text-gradient">speak for themselves</span>
          </h2>
          <p className="mt-4 text-white/70">A snapshot of projects we have designed, launched, and scaled.</p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {PORTFOLIO.map((p) => (
            <motion.div key={p.client} variants={scaleIn} whileHover={{ y: -6 }} className="card group overflow-hidden">
              <div className="relative h-56 overflow-hidden sm:h-64">
                <img
                  src={p.img}
                  alt={p.client}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/40 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-neon-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur shadow-glow-sm">{p.tag}</span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">{p.client}</h3>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-2 text-sm text-neon-300">
                  <TrendingUp className="h-4 w-4 shrink-0" /> {p.result}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a href="#contact" className="btn-primary">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WHY_US = [
  { icon: Zap,       title: 'Fast Delivery',          desc: 'We move at the speed of your ambition. Content delivered on schedule, campaigns launched in days not weeks.' },
  { icon: Award,     title: 'Premium Quality',         desc: 'Every pixel, every frame, every word is crafted to perfection. We do not do average — only exceptional.' },
  { icon: Target,    title: 'Affordable Pricing',      desc: 'Premium agency quality without the premium agency price tag. Transparent plans that scale with your budget.' },
  { icon: Clock,     title: '24/7 Support',            desc: 'Round-the-clock support via WhatsApp, email, and phone. We are always here when you need us.' },
  { icon: TrendingUp, title: 'Result Driven Strategy', desc: 'Every recommendation is backed by data. No guesswork, no vanity metrics — just measurable, explosive growth.' },
  { icon: Heart,     title: 'Genuine Partnership',     desc: 'We treat your brand like our own. Your goals are our goals, and we are invested in your long-term success.' },
];

function WhyChooseUs() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
      <div className="container-px relative">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Why ViralNova</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            The agency that <span className="text-gradient">actually delivers</span>
          </h2>
          <p className="mt-4 text-white/70">We are not just another agency. We are your growth partner — obsessed with results, transparency, and speed.</p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US.map((w) => (
            <motion.div key={w.title} variants={scaleIn} whileHover={{ y: -6 }} className="glass-card group h-full p-7 transition-all duration-300 hover:border-neon-400/40 hover:bg-neon-500/5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-500/20 to-electric-500/10 text-neon-300 ring-1 ring-neon-400/30 transition-all duration-300 group-hover:from-neon-500 group-hover:to-electric-500 group-hover:text-white group-hover:shadow-glow-mix">
                <w.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{w.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { icon: TrendingUp, value: 340, suffix: '%', label: 'Avg. Growth' },
            { icon: Zap,        value: 220, suffix: '%', label: 'Engagement Boost' },
            { icon: Target,     value: 48,  suffix: 'h',  label: 'Avg. Delivery' },
            { icon: Award,      value: 98,  suffix: '%',  label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto h-7 w-7 text-neon-300" />
              <div className="mt-3 font-display text-3xl font-extrabold">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/55">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Aarav Sharma',  role: 'Founder, National UPVC',     quote: 'ViralNova transformed our brand presence. The website they built converts 3x better and our social media has never been stronger.', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'Priya Nair',    role: 'Owner, Spice Route Restaurant', quote: 'The AI advertisement videos ViralNova created went viral in our city. Our footfall tripled in four months. Absolutely incredible work.' },
  { name: 'Rahul Verma',   role: 'CEO, FitFuel',               quote: 'From reels to SEO to our website, everything ViralNova touches turns to gold. Best agency partnership we have ever had.' },
  { name: 'Sneha Kapoor',  role: 'Co-founder, NovaBites',      quote: 'Their reels editing is top-tier. We went from 2K to 45K followers in five months. The quality is genuinely premium.' },
  { name: 'Arjun Mehta',   role: 'CMO, PulseWear',            quote: 'They cut our CPL by 60% with AI-powered ad videos. Data-driven, creative, and genuinely invested in our growth.' },
  { name: 'Divya Singh',   role: 'Founder, ZenBot AI',         quote: 'ViralNova built our entire brand identity and website in two weeks. Fast, premium, and result-obsessed. Highly recommend.' },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-500/40 to-transparent" />
      <div className="container-px">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Client Love</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Brands that grew <span className="text-gradient">with ViralNova</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure key={t.name} variants={scaleIn} whileHover={{ y: -6 }} className="card h-full p-7">
              <Quote className="h-8 w-8 text-neon-400/30" />
              <blockquote className="mt-4 text-sm leading-relaxed text-white/80">{t.quote}</blockquote>
              <div className="mt-5 flex gap-1 text-neon-300">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                {t.img ? (
                  <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-neon-400/30" loading="lazy" />
                ) : (
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-neon-500/20 to-electric-500/10 font-display font-bold text-neon-200 ring-1 ring-neon-400/30">
                    {t.name.charAt(0)}
                  </span>
                )}
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'What makes ViralNova different from other agencies?', a: 'We combine AI-powered tools with creative storytelling and data-driven strategy. Every project is custom-built for your brand — no templates, no cookie-cutter approaches. We obsess over your results as much as you do.' },
  { q: 'How quickly will I see results?', a: 'Most clients see measurable improvement in engagement and reach within the first 30 days. Significant growth and ROAS improvements typically show within 60 to 90 days of full campaign execution.' },
  { q: 'Which services do you offer?', a: 'Website development, social media management, AI advertisement videos, reels editing, graphic design, and SEO optimization. We are a full-stack digital growth agency.' },
  { q: 'Do you create the content or do I?', a: 'We handle everything end-to-end — ideation, scripting, design, production, editing, and scheduling. You just approve the content before it goes live.' },
  { q: 'Is there a minimum contract length?', a: 'No long-term contracts. We work on a monthly rolling basis because we believe our results should be the reason you stay, not a contract.' },
  { q: 'How do I get started?', a: 'Simply book a free consultation via the contact form or WhatsApp. We will audit your current presence, understand your goals, and present a custom plan — at no cost.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container-px">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Got questions? <span className="text-gradient">We have got answers.</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} custom={i * 0.05}
              className={`card overflow-hidden ${open === i ? 'border-neon-400/50' : ''}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 shrink-0 text-neon-300" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/70">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Band ────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-px">
        <motion.div
          variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="relative overflow-hidden rounded-3xl border border-neon-400/30 bg-gradient-to-br from-neon-700/30 via-ink-800 to-electric-800/20 p-8 text-center shadow-glow-mix-lg md:p-16"
        >
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-neon-500/30 blur-[100px] animate-orb" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-electric-500/20 blur-[80px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Ready to make your brand <span className="text-gradient-mix glow-text">unmissable?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Book a free consultation. Get a custom growth plan. No commitment required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#contact" className="btn-primary w-full sm:w-auto">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`https://wa.me/${B.whatsapp}`} target="_blank" rel="noreferrer" className="btn-ghost w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact Form ────────────────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name    = String(fd.get('name')    || '').trim();
    const email   = String(fd.get('email')   || '').trim();
    const service = String(fd.get('service') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) { setStatus('error'); setErrorMsg('Please fill in all required fields.'); return; }
    if (!supabase) { setStatus('error'); setErrorMsg('Form is not configured. Please email us directly.'); return; }
    const { error } = await supabase.from('contact_submissions').insert({ name, email, message: `[${service || 'General'}] ${message}` });
    if (error) { setStatus('error'); setErrorMsg('Something went wrong. Please email us directly.'); return; }
    setStatus('success');
    form.reset();
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-card flex flex-col items-center justify-center p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-neon-500/20 text-neon-300 ring-1 ring-neon-400/40 shadow-glow">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold">Message sent!</h3>
        <p className="mt-2 text-white/70">We will get back to you within 24 hours with a custom plan.</p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">Send another message</button>
      </motion.div>
    );
  }

  const inputCls = 'w-full rounded-xl border border-white/10 bg-ink-700/60 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:border-neon-400/60 focus:ring-2 focus:ring-neon-500/30';

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-white/80">Full Name *</label>
          <input id="cf-name" name="name" type="text" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-white/80">Email *</label>
          <input id="cf-email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="cf-service" className="mb-2 block text-sm font-medium text-white/80">Service Interested In</label>
        <select id="cf-service" name="service" className={inputCls}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
          <option value="Custom Package">Custom Package</option>
        </select>
      </div>
      <div className="mt-5">
        <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-white/80">Message *</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="Tell us about your brand and growth goals" className={`${inputCls} resize-none`} />
      </div>
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <>Send Message <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

function Contact() {
  const items = [
    { icon: MessageCircle, label: 'WhatsApp',  value: 'Chat with us',           href: `https://wa.me/${B.whatsapp}` },
    { icon: Mail,          label: 'Email',     value: B.email,                   href: `mailto:${B.email}` },
    { icon: Instagram,     label: 'Instagram',  value: B.instagramHandle,         href: B.instagram },
    { icon: MapPin,        label: 'Location',   value: B.location,                href: undefined },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-neon-600/20 blur-[120px]" />
      <div className="container-px relative">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Let's build your <span className="text-gradient">viral moment</span>
          </h2>
          <p className="mt-4 text-white/70">Tell us about your brand. We will reply within 24 hours with a custom growth plan.</p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-4">
              {items.map((it) => {
                const inner = (
                  <div className="glass-card group flex items-center gap-4 p-5 transition-all duration-300 hover:border-neon-400/40">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-500/15 to-electric-500/10 text-neon-300 ring-1 ring-neon-400/30 transition-all duration-300 group-hover:from-neon-500 group-hover:to-electric-500 group-hover:text-white group-hover:shadow-glow-mix">
                      <it.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-white/50">{it.label}</div>
                      <div className="truncate text-sm font-semibold">{it.value}</div>
                    </div>
                  </div>
                );
                return it.href ? (
                  <a key={it.label} href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">{inner}</a>
                ) : (
                  <div key={it.label}>{inner}</div>
                );
              })}
              <a href={`https://wa.me/${B.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary mt-2 w-full">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={0.1}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { heading: 'Services', links: SERVICES.map((s) => ({ label: s.title, href: '#services' })) },
    {
      heading: 'Company',
      links: [
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'About', href: '#about' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80 py-14">
      <div className="container-px">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-500 to-electric-500 shadow-glow-mix">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="glow-text">ViralNova</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Scale your brand. Dominate social media. Premium digital marketing agency based in {B.location}.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href: `mailto:${B.email}`, icon: Mail, label: 'Email' },
                { href: `https://wa.me/${B.whatsapp}`, icon: MessageCircle, label: 'WhatsApp' },
                { href: B.instagram, icon: Instagram, label: 'Instagram' },
              ].map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-neon-400/50 hover:bg-neon-500/15 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Contact</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li><a href={`mailto:${B.email}`} className="hover:text-white transition-colors">{B.email}</a></li>
              <li><a href="tel:+916398202864" className="hover:text-white transition-colors">{B.phone}</a></li>
              <li>{B.location}</li>
              <li><a href={B.instagram} target="_blank" rel="noreferrer" className="text-neon-300 hover:text-neon-200 transition-colors">{B.instagramHandle}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          (c) {new Date().getFullYear()} {B.name}. All rights reserved. Built with premium quality in Bijnor, Uttar Pradesh, India
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (y) => setVisible(y > 300));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          href={`https://wa.me/${B.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_0_24px_-4px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_36px_-4px_rgba(37,211,102,0.9)]"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-neon-500 to-electric-500"
    />
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
