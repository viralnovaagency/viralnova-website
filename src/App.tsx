import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Rocket, TrendingUp, Megaphone, PenTool, Users, BarChart3,
  Mail, Phone, MapPin, Instagram, MessageCircle, ArrowRight,
  Check, Star, Sparkles, Menu, X, Loader2, ChevronDown,
  Play, Zap, Target, Award, Shield, Clock, LineChart,
  Brain, Globe, Heart, Quote, ArrowUpRight,
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

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add('is-visible');
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { show(); io.unobserve(e.target); } }); },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    const t = setTimeout(show, 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
      <nav className="container-px flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="group flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="glow-text">ViralNova</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/65 transition-colors hover:text-white">{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary !px-5 !py-2.5">Book a Call <ArrowRight className="h-4 w-4" /></a>
        </div>
        <button onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2">Book a Free Strategy Call <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px] animate-orb" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-accent-500/10 blur-[100px]" />

      <div className="container-px relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="section-eyebrow"><Sparkles className="h-3.5 w-3.5" /> AI-Powered Digital Marketing Agency</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Scale Your Brand.<br />
              <span className="text-gradient glow-text">Dominate Social Media.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl">
              We help businesses grow with AI-powered content, high-converting websites, social media management, and performance marketing.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#contact" className="btn-primary w-full sm:w-auto">
                Book a Free Strategy Call <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#portfolio" className="btn-ghost w-full sm:w-auto">
                <Play className="h-4 w-4" /> View Our Work
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: '250+', label: 'Campaigns Launched' },
                { value: '12M+', label: 'Reach Generated' },
                { value: '4.8x', label: 'Avg. ROAS' },
                { value: '98%', label: 'Client Retention' },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}

// ─── Logo Marquee ─────────────────────────────────────────────────────────────
const CLIENTS = ['BrewCraft', 'Lumen Skincare', 'FitFuel', 'NovaBites', 'PulseWear', 'ZenBot AI', 'Aura Labs', 'Verde Co'];
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
  { icon: Brain,      title: 'AI-Powered Content',     desc: 'AI-driven content strategy, copywriting, and creative production that scales your output without sacrificing quality.' },
  { icon: Globe,      title: 'High-Converting Websites', desc: 'Lightning-fast, conversion-optimized websites engineered to turn visitors into paying customers.' },
  { icon: Users,      title: 'Social Media Management',  desc: 'Full-service management across Instagram, TikTok, LinkedIn, and YouTube — content to community.' },
  { icon: Megaphone,  title: 'Performance Marketing',    desc: 'Data-driven paid ad campaigns across Meta, Google, and TikTok engineered for maximum ROAS.' },
  { icon: PenTool,    title: 'Brand & Creative',         desc: 'Scroll-stopping visual identity, motion graphics, and creative that makes your brand unmissable.' },
  { icon: BarChart3,  title: 'Analytics & Reporting',    desc: 'Real-time dashboards and transparent reporting so you always know exactly what is driving results.' },
];

function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">What We Do</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to <span className="text-gradient">scale online</span>
            </h2>
            <p className="mt-4 text-white/70">A full-stack digital growth engine — from AI content to performance ads, all under one roof.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="card group h-full p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-700/10 text-violet-300 ring-1 ring-violet-400/30 transition-all duration-300 group-hover:from-violet-500 group-hover:to-violet-600 group-hover:text-white group-hover:shadow-glow">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ───────────────────────────────────────────────────────────────
const PORTFOLIO = [
  { img: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'BrewCraft', result: '+840% Instagram reach in 90 days', tag: 'Content + Ads' },
  { img: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'Lumen Skincare', result: 'ROAS went from 1.9x to 5.2x', tag: 'Paid Ads' },
  { img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'FitFuel', result: '2K to 45K followers in 5 months', tag: 'Growth Strategy' },
  { img: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'NovaBites', result: '3.1M impressions first campaign', tag: 'Influencer + Content' },
  { img: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'PulseWear', result: '60% lower CPL via A/B testing', tag: 'Paid Ads' },
  { img: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=600', client: 'ZenBot AI', result: '10K subscribers in 30 days', tag: 'Community Growth' },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Our Work</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Results that <span className="text-gradient">speak for themselves</span>
            </h2>
            <p className="mt-4 text-white/70">A snapshot of campaigns we have launched, scaled, and dominated.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.client} delay={i * 60}>
              <div className="card group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.client}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-violet-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur shadow-glow-sm">{p.tag}</span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white">{p.client}</h3>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-2 text-sm text-violet-300">
                    <TrendingUp className="h-4 w-4 shrink-0" /> {p.result}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-10 text-center">
            <a href="#contact" className="btn-primary">
              Get Similar Results <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Why Choose ViralNova ────────────────────────────────────────────────────
const WHY_US = [
  { icon: Brain,     title: 'AI-First Approach',     desc: 'We leverage AI tools for content ideation, A/B testing, and optimization — giving you an unfair advantage.' },
  { icon: LineChart, title: 'Data-Driven Decisions',  desc: 'Every recommendation is backed by data. No guesswork, no vanity metrics — just measurable growth.' },
  { icon: Shield,     title: 'Transparent Reporting',  desc: 'Real-time dashboards and weekly reports. You always know exactly where your budget goes and what it delivers.' },
  { icon: Clock,      title: 'Fast Turnaround',         desc: 'Content delivered on schedule, campaigns launched in days not weeks. We move at the speed of your ambition.' },
  { icon: Award,      title: 'Proven Track Record',     desc: '250+ campaigns, 12M+ reach generated, 4.8x average ROAS. Our results speak louder than any pitch.' },
  { icon: Heart,      title: 'Genuine Partnership',     desc: 'We treat your brand like our own. Your goals are our goals, and we are invested in your long-term success.' },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Why ViralNova</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              The agency that <span className="text-gradient">actually delivers</span>
            </h2>
            <p className="mt-4 text-white/70">We are not just another agency. We are your growth partner — obsessed with results, transparency, and speed.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="glass-card group h-full p-7 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30 transition-all duration-300 group-hover:bg-violet-500 group-hover:text-white group-hover:shadow-glow">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: TrendingUp, value: '+340%', label: 'Avg. Follower Growth' },
              { icon: Zap,        value: '+220%', label: 'Engagement Rate'      },
              { icon: Target,     value: '4.8x',  label: 'Average ROAS'         },
              { icon: Award,      value: '98%',   label: 'Client Satisfaction'  },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-7 w-7 text-violet-300" />
                <div className="mt-3 font-display text-3xl font-extrabold">{s.value}</div>
                <div className="mt-1 text-xs text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Aarav Sharma',  role: 'Founder, BrewCraft',          quote: 'ViralNova took our Instagram from 2K to 45K followers in five months. The AI-powered content strategy was a game changer — our DMs have never been busier.' },
  { name: 'Priya Nair',    role: 'Marketing Lead, Lumen Skincare', quote: 'Our ROAS jumped from 1.9x to 5.2x within two months. Transparent reporting and genuinely creative work that makes us proud.' },
  { name: 'Rahul Verma',   role: 'CEO, FitFuel',                 quote: 'The team treats our brand like their own. Strategy, content, ads — everything is dialed in. Best agency partnership we have ever had.' },
  { name: 'Sneha Kapoor',  role: 'Co-founder, NovaBites',        quote: '3.1 million impressions on our very first campaign. The influencer strategy ViralNova built for us was pure gold.' },
  { name: 'Arjun Mehta',   role: 'CMO, PulseWear',              quote: 'They cut our CPL by 60% in two months through relentless A/B testing. Data-driven, creative, and genuinely invested in our growth.' },
  { name: 'Divya Singh',   role: 'Founder, ZenBot AI',           quote: '10,000 YouTube subscribers in 30 days. ViralNova understands virality better than anyone I have worked with.' },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Client Love</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Brands that grew <span className="text-gradient">with ViralNova</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <figure className="card h-full p-7">
                <Quote className="h-8 w-8 text-violet-400/30" />
                <blockquote className="mt-4 text-sm leading-relaxed text-white/80">{t.quote}</blockquote>
                <div className="mt-5 flex gap-1 text-violet-300">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-500/20 to-violet-700/10 font-display font-bold text-violet-200 ring-1 ring-violet-400/30">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-white/55">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Starter',
    price: '15,000',
    period: '/mo',
    desc: 'Perfect for small brands ready to establish their social presence.',
    features: [
      '2 Platforms managed',
      '12 posts/month',
      'Basic graphic design',
      'Monthly analytics report',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '35,000',
    period: '/mo',
    desc: 'For brands serious about scaling fast with paid ads and premium content.',
    features: [
      '4 Platforms managed',
      '30 posts + 8 reels/month',
      'Paid ad management (up to 50K spend)',
      'Custom brand strategy',
      'Weekly analytics + calls',
      'Priority WhatsApp support',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Dominator',
    price: '75,000',
    period: '/mo',
    desc: 'Full-service growth engine for brands ready to dominate their market.',
    features: [
      'All platforms managed',
      'Unlimited content creation',
      'Paid ads (unlimited spend)',
      'Influencer campaign management',
      'Daily monitoring & optimization',
      'Dedicated account strategist',
      '24/7 priority support',
    ],
    cta: 'Go Dominator',
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Pricing</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Transparent plans, <span className="text-gradient">real results</span>
            </h2>
            <p className="mt-4 text-white/70">No hidden fees. No lock-in. Scale up or down at any time.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div className={`card flex h-full flex-col p-7 ${plan.highlight ? 'shimmer-border border-violet-400/60 shadow-glow ring-1 ring-violet-400/40' : ''}`}>
                {plan.highlight && (
                  <div className="mb-4 inline-flex self-start rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-3 py-1 text-xs font-bold text-white shadow-glow-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold">&#8377;{plan.price}</span>
                  <span className="mb-1 text-white/60">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-white/65">{plan.desc}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-8 ${plan.highlight ? 'btn-primary' : 'btn-ghost'} w-full`}>
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-center text-sm text-white/50">
            Need a custom plan?{' '}
            <a href={`https://wa.me/${B.whatsapp}`} target="_blank" rel="noreferrer" className="text-violet-300 underline-offset-2 hover:underline">
              Chat with us on WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'What makes ViralNova different from other agencies?', a: 'We combine AI-powered tools with creative storytelling and data-driven strategy. Every campaign is custom-built for your brand — no templates, no cookie-cutter approaches. We obsess over your results as much as you do.' },
  { q: 'How quickly will I see results?', a: 'Most clients see measurable improvement in engagement and reach within the first 30 days. Significant follower growth and ROAS improvements typically show within 60 to 90 days of full campaign execution.' },
  { q: 'Which platforms do you manage?', a: 'We specialise in Instagram, Facebook, TikTok, YouTube Shorts, and LinkedIn. We recommend the best platforms based on your target audience and business goals.' },
  { q: 'Do you create the content or do I?', a: 'We handle everything end-to-end — ideation, scripting, design, production (where possible), captions, and scheduling. You just approve the content before it goes live.' },
  { q: 'Is there a minimum contract length?', a: 'No long-term contracts. We work on a monthly rolling basis because we believe our results should be the reason you stay, not a contract.' },
  { q: 'What is included in paid ad management?', a: 'We handle campaign setup, audience targeting, creative production, A/B testing, budget optimisation, and weekly reporting. We treat your ad budget like our own money.' },
  { q: 'How do I get started?', a: 'Simply book a free 30-minute strategy call via the contact form or WhatsApp. We will audit your current presence, understand your goals, and present a custom plan — at no cost.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Got questions? <span className="text-gradient">We have got answers.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className={`card overflow-hidden ${open === i ? 'border-violet-400/50' : ''}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-violet-300 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/70">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
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
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-br from-violet-700/30 via-ink-800 to-ink-900 p-8 text-center shadow-glow-lg md:p-16">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-violet-500/30 blur-[100px] animate-orb" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-violet-600/20 blur-[80px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Ready to make your brand <span className="text-gradient glow-text">unmissable?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Book a free 30-minute strategy call. Get a custom growth plan. No commitment required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#contact" className="btn-primary w-full sm:w-auto">
                  Get Your Free Strategy Call <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`https://wa.me/${B.whatsapp}`} target="_blank" rel="noreferrer" className="btn-ghost w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
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
      <div className="glass-card flex flex-col items-center justify-center p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-violet-500/20 text-violet-300 ring-1 ring-violet-400/40 shadow-glow">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold">Message sent!</h3>
        <p className="mt-2 text-white/70">We will get back to you within 24 hours with a custom plan.</p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">Send another message</button>
      </div>
    );
  }

  const inputCls = 'w-full rounded-xl border border-white/10 bg-ink-700/60 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30';

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
      {status === 'error' && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMsg}</p>
      )}
      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <>Send Message <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

function Contact() {
  const items = [
    { icon: Mail,       label: 'Email',            value: B.email,           href: `mailto:${B.email}` },
    { icon: Phone,      label: 'Phone / WhatsApp',  value: B.phone,          href: 'tel:+916398202864' },
    { icon: MapPin,     label: 'Location',          value: B.location,        href: undefined },
    { icon: Instagram,  label: 'Instagram',         value: B.instagramHandle, href: B.instagram },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Let's build your <span className="text-gradient">viral moment</span>
            </h2>
            <p className="mt-4 text-white/70">Tell us about your brand. We will reply within 24 hours with a custom growth plan.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {items.map((it) => {
                const inner = (
                  <div className="glass-card group flex items-center gap-4 p-5 transition-all duration-300 hover:border-violet-400/40">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30 transition-all duration-300 group-hover:bg-violet-500 group-hover:text-white group-hover:shadow-glow">
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
          </Reveal>

          <Reveal className="lg:col-span-3" delay={120}>
            <ContactForm />
          </Reveal>
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
        { label: 'Why Us', href: '#why-us' },
        { label: 'Pricing', href: '#pricing' },
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="glow-text">ViralNova</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Scale your brand. Dominate social media. AI-powered digital marketing agency based in {B.location}.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href: `mailto:${B.email}`, icon: Mail, label: 'Email' },
                { href: `https://wa.me/${B.whatsapp}`, icon: MessageCircle, label: 'WhatsApp' },
                { href: B.instagram, icon: Instagram, label: 'Instagram' },
              ].map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-violet-400/50 hover:bg-violet-500/15 hover:text-white">
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
              <li><a href={B.instagram} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200 transition-colors">{B.instagramHandle}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          (c) {new Date().getFullYear()} {B.name}. All rights reserved. Built with AI-powered growth in Bijnor, Uttar Pradesh, India
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <a
      href={`https://wa.me/${B.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_0_24px_-4px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_36px_-4px_rgba(37,211,102,0.9)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
