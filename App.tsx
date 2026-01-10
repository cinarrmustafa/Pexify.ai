
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Menu, X, Check, ChevronRight, FileCheck, Globe, TrendingUp, AlertTriangle, ShieldCheck, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from './components/Button';
import { LiveDemo } from './components/LiveDemo';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { DashboardPage } from './components/DashboardPage';
import { PaymentPage } from './components/PaymentPage';
import { ContactPage } from './components/ContactPage';
import { ScheduleDemoPage } from './components/ScheduleDemoPage';
import { useAuth } from './contexts/AuthContext';

// --- Translations ---

const translations = {
  en: {
    nav: {
      overview: "Overview",
      problem: "Problem",
      features: "Features",
      howItWorks: "How It Works",
      pricing: "Pricing",
      login: "Log in",
      getStarted: "Get Started"
    },
    hero: {
      newBadge: "NEW: GEMINI 2.5 OCR INTEGRATION",
      headlineStart: "Optimize your textile",
      headlineEnd: "export processes with AI.",
      subheadline: "An intelligent AI engine that automatically reads and compares all your textile export documents and finds errors for you.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "Schedule Live Demo",
      trustedBy: "Trusted by exporters in:",
      countries: ["TURKEY", "INDIA", "VIETNAM", "BANGLADESH"]
    },
    whatIs: {
      title: "What is Pexify AI?",
      p1Part1: "Pexify AI",
      p1Part2: "is an AI-powered document verification platform designed to automate the pre-shipment document preparation and control processes for textile exporters. It scans commercial documents (Invoices, Packing Lists, Bills of Lading, ATR/EUR.1, and other shipping forms) in seconds, extracts critical data, and analyzes consistency across all files.",
      p2: "Traditionally, this verification is performed manually—a process where human error, fatigue, and high volume lead to oversight. These missed errors often result in incorrect declarations, missing information, or compliance issues, causing financial penalties, shipment delays, or cancellations.",
      highlight: "Pexify AI is engineered specifically to",
      highlightColor: "eliminate these operational risks."
    },
    problem: {
      titleStart: "The Hidden Cost of",
      titleStrike: "Human Error",
      subtitle: "Manual verification of complex textile documentation is a bottleneck that costs millions in delays and penalties.",
      cards: [
        { title: "Customs Rejections", desc: "A single digit mismatch in HS codes or weights can trigger days of customs hold-ups and demurrage charges." },
        { title: "Inconsistent Data", desc: "Packing lists that don't match invoices lead to payment disputes and damaged buyer relationships." },
        { title: "Operational Drag", desc: "Export teams spend 30% of their week manually cross-checking PDFs instead of focusing on growth." }
      ]
    },
    workflow: {
      title: "From Chaos to Clarity",
      subtitle: "Three steps to a standardized export process.",
      steps: [
        { title: "Upload Documents", desc: "Easily upload all your export documents to the system and our scanner will start reviewing them instantly." },
        { title: "AI Analysis", desc: "Pexify extracts all important data from your documents and detects inconsistencies between this data with AI support." },
        { title: "One-Click Export", desc: "Finally, you receive a report and easily see the erroneous parts of your documents. Thus, you solve the problem with Pexify before it even starts." }
      ]
    },
    features: {
      f1: {
        title: "AI That Truly “Understands” Textile Documents",
        desc: "Pexify doesn't just do OCR. It distinguishes textile-specific fields like Gross, Net, and Cone Weight, catching even the smallest errors in your documents. It validates in 1 second what takes hours manually.",
        list: ["Ultra-precise data extraction", "Document-specific context reading", "Automated compliance checks"]
      },
      f2: {
        title: "Automated Document Comparison",
        desc: "Don't review export documents one by one. Pexify automatically compares all values between documents like Invoices – Bills of Lading – Packing Lists – COs and flags inconsistencies. It prevents cost errors, customs delays, and high penalties before they occur.",
        list: ["Scans multiple documents simultaneously", "Flags inconsistent and mismatched fields", "Generates reports in seconds"]
      }
    },
    pricing: {
      title: "Simple, transparent pricing",
      subtitle: "Choose the plan that fits your export volume.",
      tiers: [
        { name: "Starter", price: "$299", period: "/month", btn: "Get Started", features: ["Up to 500 documents/mo", "Basic OCR Extraction", "Email Support", "1 User Seat"] },
        { name: "Growth", price: "$599", period: "/month", btn: "Get Started", features: ["Up to 2,500 documents/mo", "Advanced Logic Checks", "Priority Support", "5 User Seats", "Export to ERP"] },
        { name: "Enterprise", price: "Custom", period: "", btn: "Contact Sales", features: ["Unlimited documents", "Custom API Integration", "Dedicated Success Manager", "SLA & SSO", "On-premise deployment"] }
      ],
      badge: "Most Popular"
    },
    security: {
      title: "Security First",
      desc: "Your trade secrets stay secret. We are SOC2 Type II compliant and use end-to-end encryption for all document processing."
    },
    cta: {
      title: "Eliminate the Risk of",
      titleColor: "Customs Penalties.",
      subtitle: "The industry is shifting to AI. Join the transformation.",
      btnPrimary: "Get Started Now",
      btnSecondary: "View Pricing",
      note: "No credit card required. 14-day free trial."
    },
    footer: {
      desc: "Empowering textile exporters with precision AI tools to eliminate errors and accelerate global trade.",
      col1: "Product",
      col2: "Company",
      copyright: "© 2024 Pexify AI Inc. All rights reserved.",
      madeFor: "Made for Global Trade",
      productLinks: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#changelog" }
      ],
      companyLinks: [
        { label: "About", href: "#overview" },
        { label: "Contact", href: "#contact" }, 
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" }
      ]
    }
  },
  tr: {
    nav: {
      overview: "Genel Bakış",
      problem: "Problem",
      features: "Özellikler",
      howItWorks: "Nasıl Çalışır",
      pricing: "Fiyatlandırma",
      login: "Giriş Yap",
      getStarted: "Hemen Başla"
    },
    hero: {
      newBadge: "YENİ: GEMINI 2.5 OCR ENTEGRASYONU",
      headlineStart: "Tekstil ihracatınızı",
      headlineEnd: "yapay zeka ile kusursuz hale getirin.",
      subheadline: "Tüm tekstil ihracat belgelerinizi otomatik olarak okuyan, karşılaştıran ve sizin için hataları bulan akıllı bir yapay zeka motoru.",
      ctaPrimary: "Ücretsiz Deneyin",
      ctaSecondary: "Canlı Demo Planla",
      trustedBy: "İhracatçıların tercihi:",
      countries: ["TÜRKİYE", "HİNDİSTAN", "VİETNAM", "BANGLADEŞ"]
    },
    whatIs: {
      title: "Pexify AI Nedir?",
      p1Part1: "Pexify AI",
      p1Part2: ", ihracat yapan tekstil firmalarının yükleme öncesi evrak hazırlama ve kontrol süreçlerini otomatikleştiren yapay zeka destekli bir belge doğrulama platformudur. Firmaların hazırladığı ticari belgeleri (fatura, çeki listesi, konşimento, ATR/EUR.1 ve diğer sevkiyat evrakları) saniyeler içinde tarar, içindeki kritik bilgileri çıkarır ve belgeler arasında olması gereken veri tutarlılığını analiz eder.",
      p2: "Geleneksel yöntemlerde bu kontrol, çalışanların belgeleri tek tek karşılaştırmasıyla yapılır ve yoğun iş temposunda gözden kaçan hatalar hem zaman kaybettirir hem de yanlış beyan, eksik bilgi veya uyumsuzluk nedeniyle maddi ceza, gecikme veya sevkiyat iptali gibi ciddi sonuçlar doğurabilir.",
      highlight: "Pexify AI, tam olarak",
      highlightColor: "bu riski ortadan kaldırmak için tasarlanmıştır."
    },
    problem: {
      titleStart: "İnsan Hatalarının",
      titleStrike: "Gizli Maliyeti",
      subtitle: "Karmaşık tekstil belgelerinin manuel doğrulanması, gecikmelere ve cezalara neden olan maliyetli bir darboğazdır.",
      cards: [
        { title: "Gümrük Redleri", desc: "GTİP kodlarında veya ağırlıklarda tek haneli bir uyuşmazlık bile günlerce süren gümrük beklemelerine ve ardiye masraflarına yol açabilir." },
        { title: "Tutarsız Veriler", desc: "Fatura ile uyuşmayan çeki listeleri, ödeme anlaşmazlıklarına ve alıcı ilişkilerinin zarar görmesine neden olur." },
        { title: "Operasyonel Yük", desc: "İhracat ekipleri, iş geliştirmeye odaklanmak yerine haftalarının %30'unu PDF'leri manuel olarak kontrol ederek geçirir." }
      ]
    },
    workflow: {
      title: "Kaostan Netliğe",
      subtitle: "Standartlaştırılmış bir ihracat süreci için üç adım.",
      steps: [
        { title: "Belgeleri Yükle", desc: "Tüm ihracat evraklarınızı kolayca sisteme yükleyin ve tarayıcımız hızlıca incelemeye başlasın" },
        { title: "Yapay Zeka Analizi", desc: "Pexify evraklarınızdaki tüm önemli verileri çıkartır ve bu veriler arasındaki tutarsızlıkları yapay zeka desteğiyle tespit eder." },
        { title: "Tek Tıkla Dışa Aktar", desc: "Son olarak bir rapor alırsınız ve evraklarınızdaki hatalı kısımları kolayca görürsünüz. Böylece sorun daha başlamadan Pexify ile çözmüş olursunuz." }
      ]
    },
    features: {
      f1: {
        title: "Tekstil Evraklarını Gerçekten “Anlayan” AI",
        desc: "Pexify, sadece OCR yapmaz. Brüt, Net ve Masura Ağırlığı gibi tekstile özgü alanları ayırt ederek belgelerinizdeki en küçük hatayı bile yakalar. Elle kontrolün saatler süren işini, 1 saniyede doğrular.",
        list: ["Ultra hassas veri çıkarma", "Belgeye özgü bağlam okuma", "Otomatik uyumluluk kontrolü"]
      },
      f2: {
        title: "Otomatik Evrak Karşılaştırma",
        desc: "Tüm ihracat belgelerini tek tek incelemeyin. Pexify, Fatura – Konşimento – Çeki Listesi – Packing List – CO gibi belgeler arasındaki tüm değerleri otomatik olarak karşılaştırır ve tutarsızlıkları işaretler. Maliyet hatalarını, gümrük gecikmelerini ve yüksek cezaları daha oluşmadan engeller.",
        list: ["Aynı anda birçok belgeyi tarar", "Tutarsız ve eşleşmeyen alanları işaretler", "Saniyeler içinde rapor üretir"]
      },
    },
    pricing: {
      title: "Basit, şeffaf fiyatlandırma",
      subtitle: "İhracat hacminize uygun planı seçin.",
      tiers: [
        { name: "Başlangıç", price: "$299", period: "/ay", btn: "Hemen Başla", features: ["Ayda 500 belgeye kadar", "Temel OCR Çıkarma", "E-posta Desteği", "1 Kullanıcı"] },
        { name: "Büyüme", price: "$599", period: "/ay", btn: "Hemen Başla", features: ["Ayda 2,500 belgeye kadar", "Gelişmiş Mantık Kontrolleri", "Öncelikli Destek", "5 Kullanıcı", "ERP'ye Aktarım"] },
        { name: "Kurumsal", price: "Özel", period: "", btn: "Satışla İletişime Geç", features: ["Sınırsız belge", "Özel API Entegrasyonu", "Özel Müşteri Yöneticisi", "SLA & SSO", "Yerinde (On-premise) kurulum"] }
      ],
      badge: "En Popüler"
    },
    security: {
      title: "Önce Güvenlik",
      desc: "Ticari sırlarız gizli kalır. SOC2 Tip II uyumluyuz ve tüm belge işlemlerinde uçtan uca şifreleme kullanıyoruz."
    },
    cta: {
      title: "Riskini Bitirin",
      titleColor: "Gümrük Cezası",
      subtitle: "Sektör yapay zekaya geçiyor. Siz de dönüşüme katılın.",
      btnPrimary: "Hemen Başlayın",
      btnSecondary: "Fiyatları Gör",
      note: "Kredi kartı gerekmez. 14 gün ücretsiz deneme."
    },
    footer: {
      desc: "Hataları ortadan kaldırmak ve küresel ticareti hızlandırmak için hassas yapay zeka araçlarıyla tekstil ihracatçılarını güçlendiriyoruz.",
      col1: "Ürün",
      col2: "Şirket",
      copyright: "© 2024 Pexify AI Inc. Tüm hakları saklıdır.",
      madeFor: "Küresel Ticaret için Üretildi",
      productLinks: [
        { label: "Özellikler", href: "#features" },
        { label: "Fiyatlandırma", href: "#pricing" },
        { label: "Sürüm Notları", href: "#changelog" }
      ],
      companyLinks: [
        { label: "Hakkında", href: "#overview" },
        { label: "İletişim", href: "#contact" }, 
        { label: "Gizlilik Politikası", href: "#privacy" },
        { label: "Kullanım Şartları", href: "#terms" }
      ]
    }
  }
};

type Language = 'en' | 'tr';
type View = 'landing' | 'login' | 'signup' | 'dashboard' | 'payment' | 'contact' | 'schedule-demo';

// --- Sub Components for Layout ---

const NavBar = ({ 
  lang, 
  setLang, 
  onLoginClick, 
  onSignupClick, 
  onHomeClick 
}: { 
  lang: Language, 
  setLang: (l: Language) => void,
  onLoginClick: () => void,
  onSignupClick: () => void,
  onHomeClick: () => void
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    onHomeClick(); 
    // Increased timeout to 300ms to allow view transition to complete before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }, 300); 
  };

  const scrollToTop = () => {
    onHomeClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'tr' : 'en');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="w-full px-6 md:px-8 relative flex items-center justify-between">
        
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer z-20" onClick={scrollToTop}>
            <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#ffffff]">Pe</span>
                <span className="text-[#dffebc]">x</span>
                <span className="text-[#c1ff72]">ify</span>
            </span>
            </div>

            {/* Centered Navigation */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8 text-sm font-medium text-neutral-400">
            <button onClick={scrollToTop} className="hover:text-white transition-colors">{t.overview}</button>
            <button onClick={() => scrollToSection('problem')} className="hover:text-white transition-colors">{t.problem}</button>
            {/* Swapped order: How It Works first, then Features */}
            <button onClick={() => scrollToSection('live-demo')} className="hover:text-white transition-colors">{t.howItWorks}</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">{t.features}</button>
            
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">{t.pricing}</button>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4 z-20">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-neutral-800"
            >
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
            </button>
            <div className="w-px h-4 bg-neutral-800"></div>
            <button 
                onClick={onLoginClick}
                className="text-sm font-medium text-white hover:text-[#C1FF72] transition-colors"
            >
                {t.login}
            </button>
            <Button variant="primary" className="!px-5 !py-2 !text-xs" onClick={onSignupClick}>{t.getStarted}</Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4 ml-auto z-20">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white"
            >
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
            </button>
            <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-neutral-800 p-6 md:hidden flex flex-col space-y-4 shadow-2xl">
          <button className="text-left text-neutral-400 hover:text-white" onClick={scrollToTop}>{t.overview}</button>
          <button className="text-left text-neutral-400 hover:text-white" onClick={() => scrollToSection('problem')}>{t.problem}</button>
          {/* Swapped order: How It Works first, then Features */}
          <button className="text-left text-neutral-400 hover:text-white" onClick={() => scrollToSection('live-demo')}>{t.howItWorks}</button>
          <button className="text-left text-neutral-400 hover:text-white" onClick={() => scrollToSection('features')}>{t.features}</button>
          
          <button className="text-left text-neutral-400 hover:text-white" onClick={() => scrollToSection('pricing')}>{t.pricing}</button>
          <button className="text-left text-white font-medium" onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}>{t.login}</button>
          <Button className="w-full justify-center" onClick={() => { onSignupClick(); setMobileMenuOpen(false); }}>{t.getStarted}</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ lang, onSignupClick, onScheduleDemoClick }: { lang: Language, onSignupClick: () => void, onScheduleDemoClick: () => void }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] mr-2 animate-pulse"></span>
          <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">{t.newBadge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-8 leading-tight">
          {t.headlineStart} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C1FF72] to-white/70">{t.headlineEnd}</span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.subheadline}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button icon onClick={onSignupClick}>{t.ctaPrimary}</Button>
          <Button variant="secondary" onClick={onScheduleDemoClick}>{t.ctaSecondary}</Button>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900/50 flex flex-col md:flex-row items-center justify-center gap-8 text-neutral-500 text-sm">
          <span>{t.trustedBy}</span>
          <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {t.countries.map((country: string, idx: number) => (
               <span key={idx} className="font-bold tracking-widest hover:text-white">{country}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatIsSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].whatIs;
  return (
    <section id="overview" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">{t.title}</h3>
        </div>

        <div className="space-y-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-light text-justify md:text-center">
          <p>
            <span className="text-white font-medium">{t.p1Part1}</span> {t.p1Part2}
          </p>
          <p>
            {t.p2}
          </p>
          <div className="pt-8 mt-8 border-t border-neutral-900 flex justify-center">
            <p className="text-2xl md:text-3xl font-medium text-white max-w-2xl">
              {t.highlight} <span className="text-[#C1FF72]">{t.highlightColor}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemCard: React.FC<{ title: string, desc: string, icon: any }> = ({ title, desc, icon: Icon }) => (
  <div className="group p-8 rounded-3xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#C1FF72]/50 transition-all duration-500 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mb-6 group-hover:bg-[#C1FF72] transition-colors duration-300">
      <Icon className="w-6 h-6 text-white group-hover:text-black transition-colors" strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-neutral-400 leading-relaxed">{desc}</p>
  </div>
);

const ProblemSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].problem;
  const icons = [AlertTriangle, FileCheck, TrendingUp];

  return (
    <section id="problem" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">{t.titleStart} <span className="text-neutral-500 line-through decoration-[#C1FF72]">{t.titleStrike}</span></h2>
          <p className="text-neutral-400 text-lg">{t.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.cards.map((card, i) => (
            <ProblemCard 
              key={i}
              icon={icons[i]}
              title={card.title} 
              desc={card.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkflowStep: React.FC<{ number: string, title: string, desc: string }> = ({ number, title, desc }) => (
  <div className="relative pl-12 md:pl-0 md:text-center group">
    <div className="absolute left-0 top-0 md:relative md:mx-auto w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 bg-black text-[#C1FF72] font-mono text-lg font-bold mb-6 z-10 group-hover:bg-[#C1FF72] group-hover:text-black transition-colors">
      {number}
    </div>
    <div className="hidden md:block absolute top-5 left-1/2 w-full h-[1px] bg-neutral-800 -z-0 last:hidden"></div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-neutral-400 text-sm">{desc}</p>
  </div>
);

const WorkflowSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].workflow;
  return (
    <section id="workflow" className="py-24 bg-[#050505] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">{t.title}</h2>
          <p className="text-neutral-400">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {t.steps.map((step, i) => (
            <WorkflowStep 
              key={i}
              number={`0${i + 1}`} 
              title={step.title} 
              desc={step.desc} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureRow = ({ title, desc, list, reversed = false }: { title: string, desc: string, list?: string[], reversed?: boolean }) => (
  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-24 border-b border-neutral-900 last:border-0`}>
    <div className="flex-1 space-y-6">
      <h3 className="text-3xl font-semibold text-white">{title}</h3>
      <p className="text-neutral-400 text-lg leading-relaxed">{desc}</p>
      {list && (
        <ul className="space-y-3 mt-6">
          {list.map((item, i) => (
            <li key={i} className="flex items-center text-sm text-white">
              <Check className="w-4 h-4 text-[#C1FF72] mr-3" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="flex-1 w-full">
      <div className="aspect-video bg-[#0F0F0F] rounded-2xl border border-neutral-800 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black opacity-50"></div>
        {/* Abstract UI Representation */}
        <div className="absolute top-8 left-8 right-8 bottom-0 bg-[#1a1a1a] rounded-t-xl border-t border-l border-r border-neutral-700 shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500 p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-1/3 h-2 bg-neutral-700 rounded-full"></div>
            <div className="w-1/4 h-2 bg-neutral-800 rounded-full"></div>
          </div>
          <div className="space-y-3">
             <div className="h-8 w-full bg-neutral-800/50 rounded flex items-center px-3 border border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <div className="w-1/2 h-1.5 bg-neutral-700 rounded-full"></div>
             </div>
             <div className="h-8 w-full bg-neutral-800/50 rounded flex items-center px-3 border border-[#C1FF72]/20">
                <div className="w-2 h-2 bg-[#C1FF72] rounded-full mr-3"></div>
                <div className="w-2/3 h-1.5 bg-neutral-700 rounded-full"></div>
             </div>
             <div className="h-8 w-full bg-neutral-800/50 rounded flex items-center px-3">
                <div className="w-2 h-2 bg-neutral-600 rounded-full mr-3"></div>
                <div className="w-1/3 h-1.5 bg-neutral-700 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].features;
  return (
    <section id="features" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <FeatureRow 
          title={t.f1.title} 
          desc={t.f1.desc} 
          list={t.f1.list}
        />
        <FeatureRow 
          title={t.f2.title} 
          desc={t.f2.desc}
          list={t.f2.list}
          reversed
        />
      </div>
    </section>
  );
};

const PricingCard = ({ tier, price, period, features, btnText, recommended = false, badgeText, onPlanSelect }: { tier: string, price: string, period: string, features: string[], btnText: string, recommended?: boolean, badgeText?: string, onPlanSelect: (plan: string, price: string, period: string) => void }) => (
  <div className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${recommended ? 'bg-neutral-900/50 border-[#C1FF72] shadow-[0_0_30px_rgba(193,255,114,0.1)] transform md:-translate-y-4' : 'bg-[#0A0A0A] border-neutral-800 hover:border-neutral-700'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C1FF72] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {badgeText}
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-lg font-medium text-white mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-neutral-500">{period}</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-sm text-neutral-300">
          <Check className={`w-4 h-4 mr-3 mt-0.5 ${recommended ? 'text-[#C1FF72]' : 'text-neutral-600'}`} />
          {feature}
        </li>
      ))}
    </ul>
    <Button variant={recommended ? 'primary' : 'outline'} className="w-full" onClick={() => onPlanSelect(tier, price, period)}>
      {btnText}
    </Button>
  </div>
);

const PricingSection = ({ lang, onPlanSelect }: { lang: Language, onPlanSelect: (plan: string, price: string, period: string) => void }) => {
  const t = translations[lang].pricing;
  return (
    <section id="pricing" className="py-24 bg-black relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">{t.title}</h2>
          <p className="text-neutral-400">{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          <PricingCard 
            tier={t.tiers[0].name} 
            price={t.tiers[0].price}
            period={t.tiers[0].period}
            btnText={t.tiers[0].btn}
            features={t.tiers[0].features} 
            onPlanSelect={onPlanSelect}
          />
          <PricingCard 
            tier={t.tiers[1].name} 
            price={t.tiers[1].price}
            period={t.tiers[1].period}
            btnText={t.tiers[1].btn}
            recommended
            badgeText={t.badge}
            features={t.tiers[1].features}
            onPlanSelect={onPlanSelect} 
          />
          <PricingCard 
            tier={t.tiers[2].name} 
            price={t.tiers[2].price}
            period={t.tiers[2].period}
            btnText={t.tiers[2].btn}
            features={t.tiers[2].features}
            onPlanSelect={onPlanSelect} 
          />
        </div>
      </div>
    </section>
  );
};

const SecuritySection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].security;
  return (
    <section className="py-24 border-y border-neutral-900 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <ShieldCheck className="w-12 h-12 text-[#C1FF72] mx-auto mb-6" />
            <h2 className="text-3xl font-semibold mb-8">{t.title}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-12">{t.desc}</p>
            <div className="flex justify-center gap-8 opacity-50 grayscale">
                {/* Mock Compliance Badges */}
                <div className="h-12 w-24 bg-neutral-800 rounded"></div>
                <div className="h-12 w-24 bg-neutral-800 rounded"></div>
                <div className="h-12 w-24 bg-neutral-800 rounded"></div>
            </div>
        </div>
    </section>
  );
};

const CTASection = ({ lang, onSignupClick }: { lang: Language, onSignupClick: () => void }) => {
  const t = translations[lang].cta;
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[#C1FF72] opacity-[0.02]"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight">
          {lang === 'tr' ? (
            <>
              <span className="text-[#C1FF72]">{t.titleColor}</span> <br />
              {t.title}
            </>
          ) : (
            <>
              {t.title} <br />
              <span className="text-[#C1FF72]">{t.titleColor}</span>
            </>
          )}
        </h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button className="w-full md:w-auto h-14 px-10 text-lg" onClick={onSignupClick}>{t.btnPrimary}</Button>
          <button className="w-full md:w-auto h-14 px-10 text-lg text-white border border-neutral-800 rounded-full hover:bg-neutral-900 transition-colors" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>{t.btnSecondary}</button>
        </div>
        <p className="mt-6 text-sm text-neutral-600">{t.note}</p>
      </div>
    </section>
  );
};

const LegalModal = ({ id, lang, onClose }: { id: string, lang: Language, onClose: () => void }) => {
  // Simple modal content based on ID
  const title = id === '#privacy' ? (lang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy') : (lang === 'tr' ? 'Kullanım Şartları' : 'Terms of Service');
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>
        <div className="p-6 overflow-y-auto text-neutral-400 text-sm leading-relaxed custom-scrollbar">
            <p>
                {lang === 'tr' 
                    ? "Bu bir demo uygulamasıdır. Gerçek bir yasal metin buraya gelecektir. Kişisel verilerinizin işlenmesi ve hizmet şartları hakkında detaylı bilgi."
                    : "This is a demo application. Actual legal text would appear here. Detailed information regarding personal data processing and terms of service."
                }
            </p>
            <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <div className="p-6 border-t border-neutral-800 flex justify-end">
            <Button onClick={onClose}>
                {lang === 'tr' ? 'Kapat' : 'Close'}
            </Button>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ lang, onLoginClick, onOpenLegal, onContactClick, onScrollToSection }: { 
  lang: Language, 
  onLoginClick: () => void, 
  onOpenLegal: (id: string) => void, 
  onContactClick: () => void,
  onScrollToSection: (id: string) => void
}) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-[#050505] border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="text-2xl font-bold tracking-tight mb-6 block">
              <span className="text-[#ffffff]">Pe</span>
              <span className="text-[#dffebc]">x</span>
              <span className="text-[#c1ff72]">ify</span>
            </span>
            <p className="text-neutral-400 max-w-sm mb-8 leading-relaxed">
              {t.desc}
            </p>
            <div className="flex gap-4">
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#C1FF72] hover:text-black transition-colors cursor-pointer text-neutral-400"
                >
                    <Facebook className="w-5 h-5" />
                </a>
                {/* Twitter */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#C1FF72] hover:text-black transition-colors cursor-pointer text-neutral-400"
                >
                     <Twitter className="w-5 h-5" />
                </a>
                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#C1FF72] hover:text-black transition-colors cursor-pointer text-neutral-400"
                >
                    <Instagram className="w-5 h-5" />
                </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t.col1}</h4>
            <ul className="space-y-4">
              {t.productLinks.map((link: any, i: number) => (
                <li key={i}>
                  <button 
                    onClick={() => onScrollToSection(link.href)}
                    className="text-neutral-500 hover:text-[#C1FF72] transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t.col2}</h4>
            <ul className="space-y-4">
              {t.companyLinks.map((link: any, i: number) => {
                let onClick = () => onScrollToSection(link.href);
                if (link.href === '#contact') onClick = onContactClick;
                else if (link.href === '#privacy' || link.href === '#terms') onClick = () => onOpenLegal(link.href);

                return (
                    <li key={i}>
                      <button 
                        onClick={onClick}
                        className="text-neutral-500 hover:text-[#C1FF72] transition-colors text-sm text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-sm">{t.copyright}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C1FF72] rounded-full"></span>
            <span className="text-neutral-500 text-sm">{t.madeFor}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('landing');
  const [legalModalId, setLegalModalId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, period: string} | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    if (user && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [user]);

  const handleSignup = () => {
    // Direct signup without selecting a plan first (e.g. from hero)
    setSelectedPlan(null);
    setCurrentView('signup');
  };

  const handleScheduleDemo = () => {
    setCurrentView('schedule-demo');
  };

  const handlePlanSelection = (plan: string, price: string, period: string) => {
    // If it's a "Custom" plan, we might want a different flow (e.g. contact sales), 
    // but for now we route to signup with context or mock payment if needed.
    // Per request: Pricing -> Payment -> Signup -> Dashboard.
    if (price === 'Custom' || price === 'Özel') {
        // Skip payment for Enterprise/Custom, go to signup or contact
        setSelectedPlan({ name: plan, price, period });
        setCurrentView('signup');
    } else {
        setSelectedPlan({ name: plan, price, period });
        setCurrentView('payment');
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentView('signup');
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleContact = () => {
    setCurrentView('contact');
  };

  const handleDashboardRedirect = () => {
    setCurrentView('dashboard');
  }

  const handleScrollToSection = (id: string) => {
    setCurrentView('landing');
    setTimeout(() => {
      const elementId = id.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        if (!user) {
          setCurrentView('login');
          return null;
        }
        return (
          <DashboardPage
            lang={language}
            onLogout={async () => {
              await signOut();
              setCurrentView('landing');
            }}
            setLang={setLanguage}
          />
        );
      case 'login':
        return (
          <LoginPage 
            lang={language} 
            onBack={() => setCurrentView('landing')}
            onSignupClick={handleSignup}
            onLoginSuccess={handleDashboardRedirect}
          />
        );
      case 'payment':
        return (
            <PaymentPage
                lang={language}
                plan={selectedPlan?.name || ''}
                price={selectedPlan?.price || ''}
                period={selectedPlan?.period || ''}
                onBack={() => setCurrentView('landing')}
                onContinue={handlePaymentSuccess}
            />
        );
      case 'signup':
        return (
          <SignUpPage 
            lang={language} 
            onBack={() => setCurrentView('landing')}
            onLoginClick={handleLogin}
            onSignupSuccess={handleDashboardRedirect}
            selectedPlan={selectedPlan?.name}
          />
        );
      case 'contact':
        return (
          <ContactPage 
            lang={language}
            onBack={() => setCurrentView('landing')}
          />
        );
      case 'schedule-demo':
        return (
          <ScheduleDemoPage
            lang={language}
            onBack={() => setCurrentView('landing')}
          />
        );
      default:
        return (
          <>
            <NavBar 
              lang={language} 
              setLang={setLanguage} 
              onLoginClick={handleLogin}
              onSignupClick={handleSignup} 
              onHomeClick={() => setCurrentView('landing')}
            />
            <main>
              <Hero 
                lang={language} 
                onSignupClick={handleSignup} 
                onScheduleDemoClick={handleScheduleDemo}
              />
              <WhatIsSection lang={language} />
              <ProblemSection lang={language} />
              <LiveDemo lang={language} />
              <WorkflowSection lang={language} />
              <FeaturesSection lang={language} />
              <PricingSection lang={language} onPlanSelect={handlePlanSelection} />
              <SecuritySection lang={language} />
              <CTASection lang={language} onSignupClick={handleSignup} />
            </main>
            <Footer 
              lang={language} 
              onLoginClick={handleLogin}
              onOpenLegal={setLegalModalId}
              onContactClick={handleContact}
              onScrollToSection={handleScrollToSection}
            />
            {legalModalId && (
              <LegalModal 
                id={legalModalId} 
                lang={language} 
                onClose={() => setLegalModalId(null)} 
              />
            )}
          </>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#C1FF72] selection:text-black">
      {renderView()}
    </div>
  );
};

export default App;
