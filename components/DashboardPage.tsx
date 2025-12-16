
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  History, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileBarChart,
  Filter,
  Download,
  Trash2,
  Eye,
  Globe,
  BarChart3,
  PieChart,
  TrendingUp,
  Map,
  Calendar,
  User,
  CreditCard,
  Lock,
  Mail,
  Save,
  ToggleLeft,
  ToggleRight,
  X,
  File,
  Layers,
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Tag,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Button } from './Button';

interface DashboardPageProps {
  lang: 'en' | 'tr';
  onLogout: () => void;
  setLang: (lang: 'en' | 'tr') => void;
}

// Shared Document Interface
interface Doc {
  id: number;
  name: string;
  date: string;
  type: string;
  size: string;
  status: 'verified' | 'risk' | 'processing' | 'queued';
  issues: number | null;
  tags: string[];
  fileUrl?: string; // URL for previewing the file
}

type PlanType = 'Starter' | 'Growth' | 'Enterprise';
type ModalActionType = 'view' | 'rename' | 'tag' | null;

// Initial Mock Data
const initialDocs: Doc[] = [
  { id: 1, name: "INV-2024-001.pdf", date: "Mar 12, 2024", type: "Invoice", size: "2.4 MB", status: "verified", issues: 0, tags: ["Urgent"] },
  { id: 2, name: "PL-2024-003-US.pdf", date: "Mar 11, 2024", type: "Packing List", size: "1.1 MB", status: "risk", issues: 3, tags: [] },
  { id: 3, name: "BL-DRAFT-V2.pdf", date: "Mar 10, 2024", type: "Bill of Lading", size: "3.5 MB", status: "verified", issues: 0, tags: ["Reviewed"] },
  { id: 4, name: "EUR1-CERT-GER.jpg", date: "Mar 09, 2024", type: "Certificate", size: "0.8 MB", status: "processing", issues: null, tags: [] },
  { id: 5, name: "COMM-INV-002.pdf", date: "Mar 08, 2024", type: "Invoice", size: "1.9 MB", status: "verified", issues: 0, tags: [] },
  { id: 6, name: "PL-FINAL-V3.pdf", date: "Mar 08, 2024", type: "Packing List", size: "1.2 MB", status: "verified", issues: 0, tags: [] },
  { id: 7, name: "WEIGHT-NOTE-001.pdf", date: "Mar 07, 2024", type: "Weight Note", size: "0.5 MB", status: "risk", issues: 1, tags: [] },
  // Adding more mock data to demonstrate pagination
  { id: 8, name: "INV-2024-004.pdf", date: "Mar 06, 2024", type: "Invoice", size: "2.1 MB", status: "verified", issues: 0, tags: [] },
  { id: 9, name: "PL-2024-005.pdf", date: "Mar 05, 2024", type: "Packing List", size: "1.3 MB", status: "verified", issues: 0, tags: [] },
  { id: 10, name: "BL-FINAL.pdf", date: "Mar 04, 2024", type: "Bill of Lading", size: "3.1 MB", status: "verified", issues: 0, tags: [] },
  { id: 11, name: "CERT-ORIGIN.pdf", date: "Mar 03, 2024", type: "Certificate", size: "0.9 MB", status: "verified", issues: 0, tags: [] },
  { id: 12, name: "INV-2024-006.pdf", date: "Mar 02, 2024", type: "Invoice", size: "2.5 MB", status: "risk", issues: 2, tags: [] },
];

const getDocTypeTranslation = (type: string, lang: 'en' | 'tr') => {
  const map: Record<string, string> = lang === 'tr' ? {
    "Invoice": "Fatura",
    "Packing List": "Çeki Listesi",
    "Bill of Lading": "Konşimento",
    "Certificate": "Sertifika",
    "Weight Note": "Ağırlık Listesi",
    "Other": "Diğer",
    "Unknown": "Bilinmiyor"
  } : {
    "Invoice": "Invoice",
    "Packing List": "Packing List",
    "Bill of Lading": "Bill of Lading",
    "Certificate": "Certificate",
    "Weight Note": "Weight Note",
    "Other": "Other",
    "Unknown": "Unknown"
  };
  return map[type] || type;
};

const getMockNotifications = (lang: 'en' | 'tr') => {
  if (lang === 'tr') {
    return [
      { id: 1, title: "Analiz Tamamlandı", msg: "INV-2024-001.pdf başarıyla doğrulandı.", time: "2 dk önce", type: "success" },
      { id: 2, title: "Risk Tespit Edildi", msg: "PL-2024-003-US.pdf ağırlık uyuşmazlığı içeriyor.", time: "1 sa önce", type: "error" },
      { id: 3, title: "Sistem Güncellemesi", msg: "Yeni OCR motoru özellikleri mevcut.", time: "1 gün önce", type: "info" },
      { id: 4, title: "Yeni Belge Yüklendi", msg: "BL-DRAFT-V2.pdf işlenmek üzere sıraya alındı.", time: "2 gün önce", type: "info" },
      { id: 5, title: "Güvenlik Uyarısı", msg: "Hesabınıza farklı bir cihazdan giriş yapıldı.", time: "3 gün önce", type: "error" },
      { id: 6, title: "Plan Yenilendi", msg: "Büyüme planınız başarıyla yenilendi.", time: "1 hafta önce", type: "success" }
    ];
  }
  return [
    { id: 1, title: "Analysis Complete", msg: "INV-2024-001.pdf verified successfully.", time: "2 min ago", type: "success" },
    { id: 2, title: "Risk Detected", msg: "PL-2024-003-US.pdf has weight mismatches.", time: "1 hr ago", type: "error" },
    { id: 3, title: "System Update", msg: "New OCR engine features available.", time: "1 day ago", type: "info" },
    { id: 4, title: "New Document Uploaded", msg: "BL-DRAFT-V2.pdf queued for processing.", time: "2 days ago", type: "info" },
    { id: 5, title: "Security Alert", msg: "New login detected from a new device.", time: "3 days ago", type: "error" },
    { id: 6, title: "Plan Renewed", msg: "Your Growth plan has been renewed.", time: "1 week ago", type: "success" }
  ];
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ lang, onLogout, setLang }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAllNotificationsModalOpen, setIsAllNotificationsModalOpen] = useState(false);
  
  // Active Action Modal State
  const [activeModal, setActiveModal] = useState<{ type: ModalActionType, doc: Doc | null }>({ type: null, doc: null });

  const [allDocs, setAllDocs] = useState<Doc[]>(initialDocs);
  const [notifications, setNotifications] = useState(getMockNotifications(lang));
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPlan, setUserPlan] = useState<PlanType>('Growth');
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Lifted Notification State
  const [notificationSettings, setNotificationSettings] = useState({
    errorAlerts: true,
    weeklyReports: true,
    marketing: true
  });

  // Currency setting
  const [currency, setCurrency] = useState({
    code: 'USD',
    symbol: '$'
  });

  // Update notifications when language changes
  useEffect(() => {
    setNotifications(getMockNotifications(lang));
  }, [lang]);
  
  const t = {
    en: {
      nav: {
        dashboard: "Dashboard",
        documents: "My Documents",
        analytics: "Analytics",
        settings: "Settings",
        logout: "Log Out"
      },
      header: {
        welcome: "Global Textiles",
        search: "Search documents...",
        uploadBtn: "Upload New"
      },
      notifications: {
        title: "Notifications",
        markRead: "Mark all as read",
        empty: "No new notifications",
        viewAll: "View All Notifications",
        modalTitle: "All Notifications"
      },
      stats: {
        totalDocs: "Total Documents",
        issuesFound: "Issues Found",
        accuracy: "Accuracy Rate",
        savings: "Cost Savings"
      },
      modal: {
        title: "Upload Documents",
        dragDrop: "Drag & drop files here or",
        browse: "Browse",
        cancel: "Cancel",
        upload: "Upload",
        uploading: "Uploading...",
        supports: "Supports PDF, JPG, PNG (Max 25MB)",
        files: "Selected Files",
        selectType: "Document Type"
      },
      // Missing keys added here
      upload: {
        title: "Quick Upload",
        dragDrop: "Drag & drop files here or",
        browse: "Browse",
        formats: "PDF, JPG, PNG (Max 25MB)",
        readyToAnalyze: "Ready for Analysis",
        addMore: "Add More",
        startAnalysis: "Start Analysis"
      },
      recent: {
        title: "Recent Uploads",
        viewAll: "View All",
        colName: "Document Name",
        colDate: "Date",
        colStatus: "Status",
        colIssues: "Issues",
        colAction: "Actions",
        found: "Found",
        status: {
            verified: "Verified",
            risk: "Risk Detected",
            processing: "Processing",
            queued: "Queued"
        },
        actions: {
            view: "View",
            rename: "Rename",
            tag: "Tag",
            delete: "Delete"
        }
      },
      actionModals: {
        viewTitle: "Document Details",
        renameTitle: "Rename Document",
        tagTitle: "Add Tag",
        currentName: "Current Name",
        newName: "New Name",
        tagName: "Tag Name",
        save: "Save",
        add: "Add Tag",
        close: "Close",
        cancel: "Cancel",
        labelName: "Name",
        labelType: "Type",
        labelDate: "Date",
        labelSize: "Size",
        labelStatus: "Status",
        labelTags: "Tags",
        noPreview: "Preview not available for this file type"
      },
      plan: {
        title: "Plan Usage",
        desc: "85% used",
        limit: "425/500",
        upgrade: "Upgrade"
      },
      upgrade: {
        title: "Upgrade Your Plan",
        subtitle: "Unlock higher limits and advanced features.",
        current: "Current Plan",
        switch: "Switch Plan",
        contact: "Contact Sales",
        tiers: [
          { name: "Starter", price: "$299", period: "/mo", features: ["500 Docs/mo", "Basic OCR", "Email Support", "1 User"] },
          { name: "Growth", price: "$599", period: "/mo", features: ["2,500 Docs/mo", "Advanced Logic", "Priority Support", "5 Users", "ERP Export"] },
          { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited Docs", "Custom API", "Dedicated Manager", "SLA & SSO", "On-premise"] }
        ],
        security: {
          title: "Enterprise Security Included",
          desc: "All paid plans come with SOC2 Type II compliance, SSO integration, and dedicated support channels.",
          btn: "Learn More"
        }
      },
      uploadStatus: {
        adding: "Adding files..."
      }
    },
    tr: {
      nav: {
        dashboard: "Panel",
        documents: "Belgelerim",
        analytics: "Analizler",
        settings: "Ayarlar",
        logout: "Çıkış Yap"
      },
      header: {
        welcome: "Global Tekstil",
        search: "Belge ara...",
        uploadBtn: "Yeni Yükle"
      },
      notifications: {
        title: "Bildirimler",
        markRead: "Tümünü okundu işaretle",
        empty: "Yeni bildirim yok",
        viewAll: "Tüm Bildirimleri Gör",
        modalTitle: "Tüm Bildirimler"
      },
      stats: {
        totalDocs: "Toplam Belge",
        issuesFound: "Bulunan Hatalar",
        accuracy: "Doğruluk Oranı",
        savings: "Maliyet Tasarrufu"
      },
      modal: {
        title: "Belge Yükle",
        dragDrop: "Dosyaları buraya sürükleyin veya",
        browse: "Gözatın",
        cancel: "İptal",
        upload: "Yükle",
        uploading: "Yükleniyor...",
        supports: "PDF, JPG, PNG desteklenir (Maks 25MB)",
        files: "Seçilen Dosyalar",
        selectType: "Belge Türü"
      },
      // Missing keys added here
      upload: {
        title: "Hızlı Yükleme",
        dragDrop: "Dosyaları buraya sürükleyin veya",
        browse: "Gözatın",
        formats: "PDF, JPG, PNG (Maks 25MB)",
        readyToAnalyze: "Analize Hazır",
        addMore: "Ekle",
        startAnalysis: "Analizi Başlat"
      },
      recent: {
        title: "Son Yüklemeler",
        viewAll: "Tümünü Gör",
        colName: "Belge Adı",
        colDate: "Tarih",
        colStatus: "Durum",
        colIssues: "Sorunlar",
        colAction: "İşlemler",
        found: "Hata Bulundu",
        status: {
            verified: "Doğrulandı",
            risk: "Risk Tespit Edildi",
            processing: "İşleniyor",
            queued: "Sırada"
        },
        actions: {
            view: "Görüntüle",
            rename: "Yeniden Adlandır",
            tag: "Etiketle",
            delete: "Sil"
        }
      },
      actionModals: {
        viewTitle: "Belge Detayları",
        renameTitle: "Belgeyi Yeniden Adlandır",
        tagTitle: "Etiket Ekle",
        currentName: "Mevcut İsim",
        newName: "Yeni İsim",
        tagName: "Etiket Adı",
        save: "Kaydet",
        add: "Etiket Ekle",
        close: "Kapat",
        cancel: "İptal",
        labelName: "Belge Adı",
        labelType: "Belge Türü",
        labelDate: "Tarih",
        labelSize: "Boyut",
        labelStatus: "Durum",
        labelTags: "Etiketler",
        noPreview: "Bu dosya türü için önizleme mevcut değil"
      },
      plan: {
        title: "Plan Kullanımı",
        desc: "%85 kullanıldı",
        limit: "425/500",
        upgrade: "Yükselt"
      },
      upgrade: {
        title: "Planınızı Yükseltin",
        subtitle: "Daha yüksek limitlerin ve gelişmiş özelliklerin kilidini açın.",
        current: "Mevcut Plan",
        switch: "Plana Geç",
        contact: "İletişime Geç",
        tiers: [
          { name: "Başlangıç", price: "$299", period: "/ay", features: ["500 Belge/ay", "Temel OCR", "E-posta Desteği", "1 Kullanıcı"] },
          { name: "Büyüme", price: "$599", period: "/ay", features: ["2,500 Belge/ay", "Gelişmiş Mantık", "Öncelikli Destek", "5 Kullanıcı", "ERP Aktarımı"] },
          { name: "Kurumsal", price: "Özel", period: "", features: ["Sınırsız Belge", "Özel API", "Özel Yönetici", "SLA & SSO", "Yerinde Kurulum"] }
        ],
        security: {
          title: "Kurumsal Güvenlik Dahil",
          desc: "Tüm ücretli planlar SOC2 Tip II uyumluluğu, SSO entegrasyonu ve özel destek kanalları ile gelir.",
          btn: "Daha Fazla Bilgi"
        }
      },
      uploadStatus: {
        adding: "Dosyalar ekleniyor..."
      }
    }
  };

  const text = t[lang];

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter documents based on search query
  const filteredDocs = allDocs.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (files: File[]) => {
    const newDocs: Doc[] = files.map((file, i) => {
      // Auto-detect type based on filename
      const lowerName = file.name.toLowerCase();
      let detectedType = 'Other';
      
      if (lowerName.includes('inv') || lowerName.includes('fatura')) detectedType = 'Invoice';
      else if (lowerName.includes('pl') || lowerName.includes('pack') || lowerName.includes('çeki')) detectedType = 'Packing List';
      else if (lowerName.includes('bl') || lowerName.includes('bill') || lowerName.includes('konşimento')) detectedType = 'Bill of Lading';
      else if (lowerName.includes('cert') || lowerName.includes('sertifika')) detectedType = 'Certificate';
      else if (lowerName.includes('weight') || lowerName.includes('ağırlık')) detectedType = 'Weight Note';

      // Create a blob URL for preview
      const fileUrl = URL.createObjectURL(file);

      return {
        id: Date.now() + i,
        name: file.name,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: detectedType, 
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        status: "queued", 
        issues: null,
        tags: [],
        fileUrl: fileUrl // Store the URL
      };
    });

    setAllDocs(prev => [...newDocs, ...prev]);
    // Force switch to dashboard view to show the queue/analysis staging area
    setActiveTab('dashboard');
  };

  const handleDeleteDoc = (id: number) => {
    setAllDocs(prev => prev.filter(d => d.id !== id));
  };

  const handleRenameDoc = (id: number, newName: string) => {
    setAllDocs(prev => prev.map(d => d.id === id ? { ...d, name: newName } : d));
    setActiveModal({ type: null, doc: null });
  };

  const handleAddTag = (id: number, tag: string) => {
    setAllDocs(prev => prev.map(d => d.id === id ? { ...d, tags: [...d.tags, tag] } : d));
    setActiveModal({ type: null, doc: null });
  };

  const handleAction = (type: ModalActionType, doc: Doc) => {
    setActiveModal({ type, doc });
  };

  const handleAnalyze = () => {
    // 1. Set queued docs to processing
    setAllDocs(current => current.map(doc => 
      doc.status === 'queued' ? { ...doc, status: 'processing' } : doc
    ));

    // 2. Simulate completion after delay
    setTimeout(() => {
      setAllDocs(current => current.map(doc => {
        if (doc.status === 'processing') {
          const isRisk = Math.random() > 0.7;
          return {
            ...doc,
            status: isRisk ? 'risk' : 'verified',
            issues: isRisk ? Math.floor(Math.random() * 5) + 1 : 0
          };
        }
        return doc;
      }));
    }, 3000);
  };

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  const openAllNotifications = () => {
    setIsNotificationsOpen(false);
    setIsAllNotificationsModalOpen(true);
  };

  const getLocalizedPlanName = () => {
    const map = {
        en: { Starter: "Starter Plan", Growth: "Growth Plan", Enterprise: "Enterprise Plan" },
        tr: { Starter: "Başlangıç Planı", Growth: "Büyüme Planı", Enterprise: "Kurumsal Plan" }
    };
    return map[lang][userPlan];
  };

  const handlePlanChange = (newPlan: PlanType) => {
    setUserPlan(newPlan);
    setActiveTab('settings'); // Go to settings after change or stay
  };

  // Maps for status translations needed for ViewDocModal
  const statusMap = {
      en: {
        verified: "Verified",
        risk: "Risk Detected",
        processing: "Processing",
        queued: "Queued"
      },
      tr: {
        verified: "Doğrulandı",
        risk: "Risk Tespit Edildi",
        processing: "İşleniyor",
        queued: "Sırada"
      }
  };

  return (
    <div className="min-h-screen bg-black flex font-sans text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-900 bg-[#050505] flex-shrink-0 hidden md:flex flex-col">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="pl-6 py-6 h-24 flex items-center gap-2 w-full text-left outline-none"
        >
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#ffffff]">Pe</span>
            <span className="text-[#dffebc]">x</span>
            <span className="text-[#c1ff72]">ify</span>
          </span>
        </button>

        <nav className="flex-1 px-4 py-2 space-y-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label={text.nav.dashboard} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={FileText} 
            label={text.nav.documents} 
            active={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')}
          />
          <SidebarItem 
            icon={FileBarChart} 
            label={text.nav.analytics} 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
          />
          <SidebarItem 
            icon={Settings} 
            label={text.nav.settings} 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </nav>
        
        {/* Plan Usage Widget in Sidebar */}
        <div className="px-4 mb-4">
          <div className="bg-[#0A0A0A] border border-neutral-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-white">{text.plan.title}</span>
              <span className="text-[10px] text-[#C1FF72]">{text.plan.limit}</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-800 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-[#C1FF72] w-[85%] rounded-full shadow-[0_0_5px_#C1FF72]"></div>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-[10px] text-neutral-500">{text.plan.desc}</p>
                <button 
                  onClick={() => setActiveTab('upgrade')}
                  className="text-[10px] text-white hover:text-[#C1FF72] transition-colors font-medium"
                >
                  {text.plan.upgrade}
                </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-neutral-900">
          <button 
            onClick={() => setActiveTab('settings')}
            className="w-full flex items-center gap-3 mb-4 px-2 py-2 rounded-lg hover:bg-neutral-900 transition-colors text-left group"
          >
            {userAvatar ? (
               <img src={userAvatar} alt="User" className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-800" />
            ) : (
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C1FF72] to-green-600 flex items-center justify-center text-black font-bold text-xs">
                 GT
               </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-[#C1FF72] transition-colors">Global Textiles</p>
              <p className="text-xs text-neutral-500 truncate">{getLocalizedPlanName()}</p>
            </div>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-2 py-2 text-sm text-neutral-400 hover:text-white transition-colors hover:bg-neutral-900 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            {text.nav.logout}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-neutral-900 bg-black/50 backdrop-blur-sm flex items-center justify-between pl-2 pr-4 md:px-8 z-20">
          <h1 className="text-xl font-medium text-white hidden md:block">
            {activeTab === 'documents' ? text.nav.documents : 
             activeTab === 'analytics' ? text.nav.analytics :
             activeTab === 'settings' ? text.nav.settings :
             activeTab === 'upgrade' ? text.plan.upgrade :
             text.header.welcome}
          </h1>
          <div className="md:hidden pl-2">
             <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#ffffff]">Pe</span>
                <span className="text-[#dffebc]">x</span>
                <span className="text-[#c1ff72]">ify</span>
             </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {activeTab === 'documents' && (
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder={text.header.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0F0F0F] border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-[#C1FF72] focus:outline-none w-64 transition-all"
                />
              </div>
            )}
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-2 py-1.5 md:px-3 rounded-md hover:bg-neutral-800 group"
            >
              <Globe className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              <span className="uppercase">{lang}</span>
            </button>

            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-full transition-colors ${isNotificationsOpen ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white'}`}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#0F0F0F] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
                    <h3 className="font-semibold text-white">{text.notifications.title}</h3>
                    {notifications.length > 0 && (
                      <button onClick={handleMarkAllRead} className="text-xs text-[#C1FF72] hover:underline">
                        {text.notifications.markRead}
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-neutral-800">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="p-4 hover:bg-neutral-900/50 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                                notif.type === 'success' ? 'bg-green-500' :
                                notif.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`}></div>
                              <div>
                                <h4 className="text-sm font-medium text-white">{notif.title}</h4>
                                <p className="text-xs text-neutral-400 mt-0.5">{notif.msg}</p>
                                <span className="text-[10px] text-neutral-600 mt-2 block">{notif.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                         <Bell className="w-8 h-8 text-neutral-700 mx-auto mb-2" />
                         <p className="text-sm text-neutral-500">{text.notifications.empty}</p>
                      </div>
                    )}
                  </div>
                  {/* Dropdown Footer */}
                  <div className="p-2 border-t border-neutral-800 bg-neutral-900/30">
                     <button 
                       onClick={openAllNotifications}
                       className="w-full py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors flex items-center justify-center gap-1"
                     >
                       {text.notifications.viewAll}
                       <ArrowRight className="w-3 h-3" />
                     </button>
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="!py-2 !px-3 md:!px-4 !text-xs md:!text-sm flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">{text.header.uploadBtn}</span>
              <span className="md:hidden">New</span>
            </Button>
          </div>
        </header>

        {/* Content Render Logic */}
        <div className="flex-1 overflow-y-auto z-10 custom-scrollbar bg-black relative">
           {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none sticky top-0">
               <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.03]"></div>
            </div>

            <div className="relative z-10 p-4 md:p-8">
              {activeTab === 'dashboard' && (
                <DashboardHomeView
                  lang={lang}
                  docs={filteredDocs}
                  onUpload={handleFileUpload}
                  onAnalyze={handleAnalyze}
                  onViewAll={() => setActiveTab('documents')}
                  onDelete={handleDeleteDoc}
                  onAction={handleAction}
                  text={text}
                  currency={currency}
                />
              )}
              {activeTab === 'documents' && (
                <DocumentsView 
                  lang={lang} 
                  docs={filteredDocs} 
                  onDelete={handleDeleteDoc}
                  onAction={handleAction}
                />
              )}
              {activeTab === 'analytics' && <AnalyticsView lang={lang} currency={currency} />}
              {activeTab === 'settings' && (
                <SettingsView
                  lang={lang}
                  avatar={userAvatar}
                  onAvatarChange={setUserAvatar}
                  notifications={notificationSettings}
                  onToggleNotification={handleToggleNotification}
                  onUpgradeClick={() => setActiveTab('upgrade')}
                  currentPlanName={getLocalizedPlanName()}
                  currency={currency}
                  onCurrencyChange={setCurrency}
                />
              )}
              {activeTab === 'upgrade' && (
                <UpgradeView 
                  lang={lang} 
                  text={text.upgrade} 
                  currentPlanId={userPlan}
                  onPlanSelect={handlePlanChange}
                />
              )}
            </div>
        </div>

        {/* Modals */}
        {isUploadModalOpen && (
          <UploadModal 
            lang={lang} 
            text={text.modal} 
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleFileUpload}
          />
        )}

        {isAllNotificationsModalOpen && (
          <AllNotificationsModal
            lang={lang}
            text={text.notifications}
            notifications={notifications}
            onClose={() => setIsAllNotificationsModalOpen(false)}
            onMarkAllRead={handleMarkAllRead}
          />
        )}

        {activeModal.type === 'view' && activeModal.doc && (
          <ViewDocModal 
            doc={activeModal.doc} 
            lang={lang}
            text={text.actionModals} 
            statusMap={statusMap[lang]}
            onClose={() => setActiveModal({ type: null, doc: null })} 
          />
        )}

        {activeModal.type === 'rename' && activeModal.doc && (
          <RenameDocModal 
            doc={activeModal.doc} 
            text={text.actionModals} 
            onClose={() => setActiveModal({ type: null, doc: null })}
            onSave={(id, name) => handleRenameDoc(id, name)} 
          />
        )}

        {activeModal.type === 'tag' && activeModal.doc && (
          <TagDocModal 
            doc={activeModal.doc} 
            text={text.actionModals} 
            onClose={() => setActiveModal({ type: null, doc: null })}
            onAdd={(id, tag) => handleAddTag(id, tag)} 
          />
        )}
      </main>
    </div>
  );
};

// ... (other components like ViewDocModal, UploadModal, DashboardHomeView unchanged)

const ViewDocModal = ({ doc, lang, text, statusMap, onClose }: { doc: Doc, lang: 'en' | 'tr', text: any, statusMap: any, onClose: () => void }) => {
  const isImage = doc.fileUrl && (doc.name.toLowerCase().endsWith('.jpg') || doc.name.toLowerCase().endsWith('.png') || doc.name.toLowerCase().endsWith('.jpeg'));
  const isPdf = doc.fileUrl && doc.name.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl w-full max-w-4xl relative z-10 shadow-2xl p-6 flex flex-col md:flex-row gap-8 max-h-[90vh]">
        {/* Left: Preview */}
        <div className="flex-1 bg-neutral-900/50 rounded-2xl border border-neutral-800 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
            {doc.fileUrl ? (
                isImage ? (
                    <img src={doc.fileUrl} alt={doc.name} className="w-full h-full object-contain" />
                ) : isPdf ? (
                    <iframe src={doc.fileUrl} className="w-full h-full rounded-2xl" title={doc.name}></iframe>
                ) : (
                    // Fallback if type is unknown or not supported by simple embed
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                        <FileText className="w-16 h-16 text-neutral-600 mb-4" />
                        <p className="text-neutral-400">{text.noPreview}</p>
                    </div>
                )
            ) : (
                // Mock Data Placeholder
                <div className="w-[210px] h-[297px] bg-white shadow-xl flex flex-col p-6 gap-3 opacity-90 transform group-hover:scale-105 transition-transform duration-500 relative">
                    <div className="h-4 w-1/3 bg-gray-300 rounded mb-6"></div>
                    <div className="space-y-3">
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                        <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="mt-10 space-y-3">
                        <div className="flex justify-between">
                            <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between">
                            <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="mt-auto flex justify-center opacity-30">
                        <FileText className="w-10 h-10 text-black" />
                    </div>
                </div>
            )}
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">{text.viewTitle}</h3>
            <button onClick={onClose} className="text-neutral-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">{text.labelName}</span>
              <span className="text-white font-medium text-right break-all">{doc.name}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">{text.labelType}</span>
              <span className="text-white text-right">{getDocTypeTranslation(doc.type, lang)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">{text.labelDate}</span>
              <span className="text-white text-right">{doc.date}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">{text.labelSize}</span>
              <span className="text-white font-mono text-right">{doc.size}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">{text.labelStatus}</span>
              <span className="uppercase text-xs font-bold text-[#C1FF72] text-right">{statusMap?.[doc.status] || doc.status}</span>
            </div>
            {doc.tags.length > 0 && (
              <div>
                <span className="text-neutral-400 block mb-2">{text.labelTags}</span>
                <div className="flex flex-wrap gap-2 justify-end">
                    {doc.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-neutral-800 text-white text-xs rounded border border-neutral-700">{tag}</span>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-end">
            <Button variant="outline" onClick={onClose}>{text.close}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadModal = ({ 
  lang, 
  text, 
  onClose, 
  onUpload 
}: { 
  lang: 'en' | 'tr', 
  text: any, 
  onClose: () => void,
  onUpload: (files: File[]) => void
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    if (files.length === 0) return;
    setIsUploading(true);
    onUpload(files);
    // Simulate short delay for UI feedback before closing
    setTimeout(() => {
        setIsUploading(false);
        setFiles([]);
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl w-full max-w-lg relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{text.title}</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={handleFileSelect} 
            accept=".pdf,.jpg,.png,.jpeg"
          />
          
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-200 cursor-pointer ${
              isDragging ? 'border-[#C1FF72] bg-[#C1FF72]/5' : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
          >
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C1FF72]">
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="text-neutral-300 font-medium mb-1">
              {text.dragDrop} <span className="text-[#C1FF72] hover:underline">{text.browse}</span>
            </p>
            <p className="text-xs text-neutral-500">{text.supports}</p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-neutral-500 uppercase">{text.files}</p>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0 text-neutral-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                         <p className="text-sm text-white truncate">{file.name}</p>
                         <p className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-neutral-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-neutral-800 flex justify-end gap-3">
          <Button variant="outline" className="!h-10 !py-0 !px-4" onClick={onClose} disabled={isUploading}>{text.cancel}</Button>
          <Button className="!h-10 !py-0 !px-6" disabled={files.length === 0 || isUploading} onClick={handleUploadClick}>
            {isUploading ? text.uploading : text.upload}
          </Button>
        </div>
      </div>
    </div>
  );
};

const DashboardHomeView = ({
  lang,
  docs,
  onUpload,
  onAnalyze,
  onViewAll,
  onDelete,
  onAction,
  text,
  currency
}: {
  lang: 'en' | 'tr',
  docs: Doc[],
  onUpload: (files: File[]) => void,
  onAnalyze: () => void,
  onViewAll: () => void,
  onDelete: (id: number) => void,
  onAction: (type: ModalActionType, doc: Doc) => void,
  text: any,
  currency: { code: string, symbol: string }
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const queuedDocs = docs.filter(doc => doc.status === 'queued');
  
  // Filter out queued docs from the Recent list so they don't appear duplicate in a weird way
  const recentDocs = docs.filter(d => d.status !== 'queued').slice(0, 5); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setIsUploading(true);
        onUpload(Array.from(e.dataTransfer.files));
        setTimeout(() => setIsUploading(false), 800);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      onUpload(Array.from(e.target.files));
      setTimeout(() => setIsUploading(false), 800);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label={text.stats.totalDocs} value={`${1248 + docs.length}`} change="+12%" icon={FileText} />
        <StatCard label={text.stats.issuesFound} value="142" change="-5%" isPositive icon={AlertTriangle} />
        <StatCard label={text.stats.accuracy} value="99.8%" change="+0.2%" icon={CheckCircle2} />
        <StatCard label={text.stats.savings} value={`${currency.symbol}12.5k`} change="+8%" icon={History} />
      </div>

      <div className="space-y-8">
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={handleFileSelect} 
            accept=".pdf,.jpg,.png,.jpeg"
          />

          {/* Upload / Staging Area */}
          {queuedDocs.length > 0 ? (
            <div className="bg-[#0A0A0A] border border-[#C1FF72]/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(193,255,114,0.05)]">
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-[#C1FF72]/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#C1FF72] flex items-center justify-center text-black">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{text.upload.readyToAnalyze}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-xs font-medium border border-neutral-700">
                    {queuedDocs.length}
                  </span>
                </div>
                <button 
                  onClick={triggerFileSelect} 
                  className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 hover:bg-neutral-800 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {text.upload.addMore}
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
                {queuedDocs.map(doc => (
                  <div key={doc.id} className="relative group bg-neutral-900/50 rounded-xl border border-neutral-800/50 hover:border-[#C1FF72]/30 transition-all p-4 flex flex-col items-center text-center aspect-[3/4]">
                     <button 
                        onClick={() => onDelete(doc.id)}
                        className="absolute top-2 right-2 text-neutral-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-neutral-900 rounded-full shadow-sm z-10"
                     >
                        <X className="w-3 h-3" />
                     </button>
                     <div className="flex-1 w-full flex items-center justify-center bg-neutral-900 rounded-lg mb-3 border border-neutral-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        {/* Simulate preview lines */}
                        <div className="absolute inset-4 bg-neutral-800/50 rounded flex flex-col gap-2 p-2 opacity-50">
                          <div className="h-1.5 w-3/4 bg-neutral-700 rounded"></div>
                          <div className="h-1.5 w-full bg-neutral-700 rounded"></div>
                          <div className="h-1.5 w-5/6 bg-neutral-700 rounded"></div>
                          <div className="h-1.5 w-full bg-neutral-700 rounded mt-2"></div>
                          <div className="h-1.5 w-1/2 bg-neutral-700 rounded"></div>
                        </div>
                        <FileText className="w-8 h-8 text-neutral-500 relative z-10 group-hover:text-[#C1FF72] transition-colors" />
                     </div>
                     <p className="text-sm text-white font-medium truncate w-full px-2" title={doc.name}>{doc.name}</p>
                     <p className="text-xs text-neutral-500 mt-1">{doc.size}</p>
                     <span className="mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20 uppercase tracking-wider">
                       {text.recent.status.queued}
                     </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-neutral-900/30 border-t border-neutral-800 flex justify-end">
                <Button onClick={onAnalyze} className="flex items-center gap-2 shadow-[0_0_20px_rgba(193,255,114,0.2)]">
                  {text.upload.startAnalysis}
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className={`bg-[#0A0A0A] border-2 border-dashed ${isUploading ? 'border-[#C1FF72] bg-[#C1FF72]/5' : 'border-neutral-800 hover:border-neutral-700'} rounded-3xl p-10 text-center transition-all duration-300 relative group cursor-pointer`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
            >
              {isUploading ? (
                <div className="py-12 flex flex-col items-center animate-pulse">
                    <UploadCloud className="w-16 h-16 text-[#C1FF72] mb-6" />
                    <h3 className="text-xl font-medium text-white mb-2">{text.uploadStatus.adding}</h3>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <UploadCloud className="w-8 h-8 text-[#C1FF72]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{text.upload.title}</h3>
                  <p className="text-neutral-400 mb-8">
                    {text.upload.dragDrop} <span className="text-[#C1FF72] border-b border-[#C1FF72] pb-0.5">{text.upload.browse}</span>
                  </p>
                  <p className="text-xs text-neutral-600 uppercase tracking-widest">{text.upload.formats}</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-[#0A0A0A] border border-neutral-900 rounded-2xl overflow-hidden min-h-[400px]">
          <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{text.recent.title}</h3>
            <button 
              onClick={onViewAll} 
              className="text-sm text-neutral-500 hover:text-[#C1FF72] transition-colors"
            >
              {text.recent.viewAll}
            </button>
          </div>
          <div className="overflow-x-visible">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#0F0F0F] text-neutral-500 border-b border-neutral-900">
                  <th className="px-6 py-4 font-medium">{text.recent.colName}</th>
                  <th className="px-6 py-4 font-medium">{text.recent.colDate}</th>
                  <th className="px-6 py-4 font-medium">{text.recent.colStatus}</th>
                  <th className="px-6 py-4 font-medium">{text.recent.colIssues}</th>
                  <th className="px-6 py-4 font-medium text-right">{text.recent.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {recentDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#0F0F0F]/50 transition-colors group">
                    <td className="px-6 py-4">
                        <button
                            onClick={() => onAction('view', doc)}
                            className="flex items-center gap-3 text-white font-medium hover:text-[#C1FF72] transition-colors text-left"
                        >
                            <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-neutral-400">
                                <FileText className="w-4 h-4" />
                            </div>
                            {doc.name}
                        </button>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{doc.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={doc.status} textMap={text.recent.status} />
                    </td>
                    <td className="px-6 py-4">
                      {doc.issues === null ? (
                        <span className="text-neutral-600">-</span>
                      ) : doc.issues > 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold">
                          {doc.issues} {text.recent.found}
                        </span>
                      ) : (
                        <span className="text-neutral-600">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === doc.id ? null : doc.id); }}
                          className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenuId === doc.id && (
                          <div ref={menuRef} className="absolute right-8 top-8 w-40 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-xl z-50 py-1 text-left">
                            <button 
                              onClick={() => { onAction('view', doc); setOpenMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                            >
                                <Eye className="w-3 h-3" /> {text.recent.actions.view}
                            </button>
                            <button 
                              onClick={() => { onAction('rename', doc); setOpenMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                            >
                                <Edit className="w-3 h-3" /> {text.recent.actions.rename}
                            </button>
                            <button 
                              onClick={() => { onAction('tag', doc); setOpenMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                            >
                                <Tag className="w-3 h-3" /> {text.recent.actions.tag}
                            </button>
                            <div className="h-px bg-neutral-800 my-1"></div>
                            <button 
                                onClick={() => { onDelete(doc.id); setOpenMenuId(null); }}
                                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-2"
                            >
                                <Trash2 className="w-3 h-3" /> {text.recent.actions.delete}
                            </button>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const DocumentsView = ({ lang, docs, onDelete, onAction }: any) => {
    // Sorting State
    const [sortConfig, setSortConfig] = useState<{ key: keyof Doc | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const rowsPerPageRef = useRef<HTMLDivElement>(null);
    const [rowsMenuOpen, setRowsMenuOpen] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpenMenuId(null);
          }
          if (rowsPerPageRef.current && !rowsPerPageRef.current.contains(event.target as Node)) {
            setRowsMenuOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle Sorting
    const handleSort = (key: keyof Doc) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedDocs = [...docs].sort((a: Doc, b: Doc) => {
        if (!sortConfig.key) return 0;
        
        let aValue: any = a[sortConfig.key];
        let bValue: any = b[sortConfig.key];

        // Custom handling for dates
        if (sortConfig.key === 'date') {
             aValue = new Date(aValue).getTime();
             bValue = new Date(bValue).getTime();
        } 
        // Custom handling for size (string "2.4 MB" -> number 2.4)
        else if (sortConfig.key === 'size') {
             aValue = parseFloat(aValue.split(' ')[0]);
             bValue = parseFloat(bValue.split(' ')[0]);
        }
        else if (typeof aValue === 'string') {
             aValue = aValue.toLowerCase();
             bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedDocs.length / itemsPerPage);
    // Reset page if out of bounds (e.g. after changing items per page or filtering)
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages > 0 && currentPage === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage, itemsPerPage]);

    const currentDocs = sortedDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleItemsPerPageChange = (val: number) => {
        setItemsPerPage(val);
        setRowsMenuOpen(false);
        setCurrentPage(1); // Reset to first page
    };

    const SortIcon = ({ column }: { column: keyof Doc }) => {
        if (sortConfig.key !== column) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30" />;
        return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 ml-1 text-[#C1FF72]" /> : <ArrowDown className="w-3 h-3 ml-1 text-[#C1FF72]" />;
    };

    const t = {
        pagination: {
            prev: lang === 'tr' ? 'Önceki' : 'Previous',
            next: lang === 'tr' ? 'Sonraki' : 'Next',
            page: lang === 'tr' ? 'Sayfa' : 'Page',
            of: lang === 'tr' ? '/' : 'of',
            perPage: lang === 'tr' ? 'Sayfa başı' : 'Per page'
        },
        actions: { view: lang === 'tr' ? "Görüntüle" : "View", rename: lang === 'tr' ? "Yeniden Adlandır" : "Rename", tag: lang === 'tr' ? "Etiketle" : "Tag", delete: lang === 'tr' ? "Sil" : "Delete" }
    };
    
    const resultText = lang === 'tr' 
        ? `${docs.length} sonuç gösteriliyor` 
        : `Showing ${docs.length} results`;

    const statusMap = lang === 'tr' ? {
        verified: "Doğrulandı",
        risk: "Risk Tespit Edildi",
        processing: "İşleniyor",
        queued: "Sırada"
    } : {
        verified: "Verified",
        risk: "Risk Detected",
        processing: "Processing",
        queued: "Queued"
    };

    return (
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
             <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{lang === 'tr' ? 'Tüm Belgeler' : 'All Documents'}</h3>
                <div className="flex items-center gap-4">
                    <div className="relative" ref={rowsPerPageRef}>
                        <button 
                            onClick={() => setRowsMenuOpen(!rowsMenuOpen)}
                            className="text-xs text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center gap-2 hover:text-white hover:border-neutral-700 transition-colors"
                        >
                            {itemsPerPage} / {t.pagination.perPage}
                            <ChevronDown className="w-3 h-3 opacity-70" />
                        </button>
                        {rowsMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-24 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-xl z-20 py-1">
                                {[10, 20, 50].map((val) => (
                                    <button 
                                        key={val}
                                        onClick={() => handleItemsPerPageChange(val)}
                                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-800 transition-colors ${itemsPerPage === val ? 'text-[#C1FF72]' : 'text-neutral-400 hover:text-white'}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                        {resultText}
                    </div>
                </div>
             </div>
             <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#0F0F0F] text-neutral-500 border-b border-neutral-900">
                        <tr>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center">{lang === 'tr' ? 'Ad' : 'Name'} <SortIcon column="name" /></div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('type')}>
                                <div className="flex items-center">{lang === 'tr' ? 'Tür' : 'Type'} <SortIcon column="type" /></div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('date')}>
                                <div className="flex items-center">{lang === 'tr' ? 'Tarih' : 'Date'} <SortIcon column="date" /></div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('size')}>
                                <div className="flex items-center">{lang === 'tr' ? 'Boyut' : 'Size'} <SortIcon column="size" /></div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('status')}>
                                <div className="flex items-center">{lang === 'tr' ? 'Durum' : 'Status'} <SortIcon column="status" /></div>
                            </th>
                            <th className="px-6 py-4 text-right">{lang === 'tr' ? 'İşlemler' : 'Actions'}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                        {currentDocs.map((doc: Doc) => (
                            <tr key={doc.id} className="hover:bg-[#0F0F0F] transition-colors">
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onAction('view', doc)}
                                        className="text-white font-medium hover:text-[#C1FF72] transition-colors text-left"
                                    >
                                        {doc.name}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-neutral-400">{getDocTypeTranslation(doc.type, lang)}</td>
                                <td className="px-6 py-4 text-neutral-400">{doc.date}</td>
                                <td className="px-6 py-4 text-neutral-400 font-mono">{doc.size}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={doc.status} textMap={statusMap} />
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === doc.id ? null : doc.id); }}
                                      className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                    {openMenuId === doc.id && (
                                      <div ref={menuRef} className="absolute right-8 top-8 w-40 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-xl z-50 py-1 text-left">
                                        <button 
                                          onClick={() => { onAction('view', doc); setOpenMenuId(null); }}
                                          className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                                        >
                                            <Eye className="w-3 h-3" /> {t.actions.view}
                                        </button>
                                        <button 
                                          onClick={() => { onAction('rename', doc); setOpenMenuId(null); }}
                                          className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                                        >
                                            <Edit className="w-3 h-3" /> {t.actions.rename}
                                        </button>
                                        <button 
                                          onClick={() => { onAction('tag', doc); setOpenMenuId(null); }}
                                          className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                                        >
                                            <Tag className="w-3 h-3" /> {t.actions.tag}
                                        </button>
                                        <div className="h-px bg-neutral-800 my-1"></div>
                                        <button 
                                            onClick={() => { onDelete(doc.id); setOpenMenuId(null); }}
                                            className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-2"
                                        >
                                            <Trash2 className="w-3 h-3" /> {t.actions.delete}
                                        </button>
                                      </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
             
             {/* Pagination */}
             <div className="p-4 border-t border-neutral-800 flex justify-between items-center bg-[#0F0F0F]">
                <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 1} className="!h-9 !px-4 text-xs">
                    {t.pagination.prev}
                </Button>
                <span className="text-xs text-neutral-500">
                    {t.pagination.page} {currentPage} {t.pagination.of} {totalPages}
                </span>
                <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages} className="!h-9 !px-4 text-xs">
                    {t.pagination.next}
                </Button>
             </div>
        </div>
    );
};

// --- Sub Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, submenu }: any) => (
  <div>
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        active ? 'bg-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-black' : 'text-neutral-500 group-hover:text-white'}`} />
      <span className="text-sm font-medium">{label}</span>
      {submenu && <ChevronDown className="w-4 h-4 ml-auto opacity-50" />}
    </button>
  </div>
);

const StatCard = ({ label, value, change, isPositive = true, icon: Icon }: any) => (
  <div className="bg-[#0A0A0A] border border-neutral-900 rounded-2xl p-6 hover:border-[#C1FF72]/30 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors duration-300">
        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-black" />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-xs text-neutral-500 uppercase tracking-wide">{label}</p>
  </div>
);

const StatusBadge = ({ status, textMap }: any) => {
  const styles = {
    verified: "bg-green-500/10 text-green-500 border-green-500/20",
    risk: "bg-red-500/10 text-red-500 border-red-500/20",
    processing: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    queued: "bg-gray-500/10 text-gray-400 border-gray-500/20"
  };
  
  const icons = {
    verified: CheckCircle2,
    risk: AlertTriangle,
    processing: Clock,
    queued: Layers
  };

  const Icon = icons[status as keyof typeof icons] || FileText;
  const label = textMap ? textMap[status] : status;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.queued}`}>
      <Icon className="w-3 h-3 mr-1.5" />
      {label}
    </span>
  );
};

const AnalyticsView = ({ lang, currency }: { lang: 'en' | 'tr', currency: { code: string, symbol: string } }) => {
  const [timeRange, setTimeRange] = useState<'30d' | '3m' | '6m' | '1y' | 'all'>('30d');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = {
    title: lang === 'tr' ? 'Analizler' : 'Analytics',
    range: {
        '30d': lang === 'tr' ? 'Son 30 Gün' : 'Last 30 Days',
        '3m': lang === 'tr' ? 'Son 3 Ay' : 'Last 3 Months',
        '6m': lang === 'tr' ? 'Son 6 Ay' : 'Last 6 Months',
        '1y': lang === 'tr' ? 'Son 1 Yıl' : 'Last 1 Year',
        'all': lang === 'tr' ? 'Tüm Zamanlar' : 'All Time'
    },
    cards: {
        processed: lang === 'tr' ? 'İşlenen Belgeler' : 'Documents Processed',
        savings: lang === 'tr' ? 'Maliyet Tasarrufu' : 'Cost Savings',
        timeSaved: lang === 'tr' ? 'Zaman Tasarrufu' : 'Time Saved'
    },
    charts: {
        volume: lang === 'tr' ? 'İşlem Hacmi' : 'Processing Volume',
        errors: lang === 'tr' ? 'Hata Dağılımı' : 'Error Breakdown'
    },
    errors: {
        weight: lang === 'tr' ? 'Ağırlık Uyuşmazlığı' : 'Weight Mismatch',
        date: lang === 'tr' ? 'Tarih Formatı' : 'Date Format',
        missing: lang === 'tr' ? 'Eksik Alanlar' : 'Missing Fields',
        hsCode: lang === 'tr' ? 'GTİP Kodu Hatası' : 'HS Code Error'
    },
    vsPrevious: lang === 'tr' ? 'önceki döneme göre' : 'vs previous period'
  };

  // Simulate data changing based on time range
  const multiplier = timeRange === '30d' ? 1 : timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : timeRange === '1y' ? 12 : 24;
  
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">{t.title}</h3>
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                    <Calendar className="w-4 h-4" />
                    {t.range[timeRange]}
                    <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-xl z-50 py-1">
                        {(Object.keys(t.range) as Array<keyof typeof t.range>).map((key) => (
                            <button 
                                key={key}
                                onClick={() => { setTimeRange(key); setDropdownOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-xs hover:bg-neutral-800 hover:text-white transition-colors ${timeRange === key ? 'text-[#C1FF72]' : 'text-neutral-400'}`}
                            >
                                {t.range[key]}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-neutral-400 text-sm">{t.cards.processed}</span>
                    <FileBarChart className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div className="text-3xl font-bold text-white">{145 * multiplier}</div>
                <div className="text-xs text-green-500 mt-2">+12% {t.vsPrevious}</div>
            </div>
            <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-neutral-400 text-sm">{t.cards.savings}</span>
                    <History className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div className="text-3xl font-bold text-white">{currency.symbol}{(2450 * multiplier).toLocaleString()}</div>
                <div className="text-xs text-green-500 mt-2">+8% {t.vsPrevious}</div>
            </div>
            <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-neutral-400 text-sm">{t.cards.timeSaved}</span>
                    <Clock className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div className="text-3xl font-bold text-white">{42 * multiplier} {lang === 'tr' ? 'saat' : 'hrs'}</div>
                <div className="text-xs text-green-500 mt-2">+15% {t.vsPrevious}</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl min-h-[300px]">
                <h4 className="text-white font-medium mb-6 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#C1FF72]" />
                    {t.charts.volume}
                </h4>
                <div className="flex items-end justify-between h-48 gap-2">
                    {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 50, 75, 85, 40].map((h, i) => (
                        <div key={i} className="w-full bg-neutral-800 rounded-t hover:bg-[#C1FF72] transition-colors relative group" style={{ height: `${h}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h * multiplier}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl min-h-[300px]">
                <h4 className="text-white font-medium mb-6 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-[#C1FF72]" />
                    {t.charts.errors}
                </h4>
                <div className="space-y-4">
                    {[
                        { label: t.errors.weight, val: 45, color: 'bg-red-500' },
                        { label: t.errors.date, val: 30, color: 'bg-yellow-500' },
                        { label: t.errors.missing, val: 15, color: 'bg-blue-500' },
                        { label: t.errors.hsCode, val: 10, color: 'bg-purple-500' }
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-neutral-400">{item.label}</span>
                                <span className="text-white">{item.val}%</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

const SettingsView = ({ lang, avatar, onAvatarChange, notifications, onToggleNotification, onUpgradeClick, currentPlanName, currency, onCurrencyChange }: any) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const t = {
    titles: { profile: lang === 'tr' ? 'Profil' : 'Profile', notif: lang === 'tr' ? 'Bildirimler' : 'Notifications', security: lang === 'tr' ? 'Güvenlik' : 'Security', billing: lang === 'tr' ? 'Ödeme ve Plan' : 'Billing & Plan', preferences: lang === 'tr' ? 'Tercihler' : 'Preferences' },
    desc: { profile: lang === 'tr' ? 'Hesap detaylarınızı ve profilinizi yönetin.' : 'Manage your account details and profile.', notif: lang === 'tr' ? 'Uyarıları ve raporları nasıl alacağınızı yönetin.' : 'Manage how you receive alerts and reports.', billing: lang === 'tr' ? 'Aboneliğinizi ve ödeme yönteminizi yönetin.' : 'Manage your subscription and payment method.', preferences: lang === 'tr' ? 'Para birimi ve diğer görüntüleme tercihlerinizi ayarlayın.' : 'Set your currency and other display preferences.' },
    labels: { name: lang === 'tr' ? 'İsim' : 'Name', email: lang === 'tr' ? 'E-posta' : 'Email', company: lang === 'tr' ? 'Şirket' : 'Company', currency: lang === 'tr' ? 'Para Birimi' : 'Currency' },
    buttons: { save: lang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes', changeAvatar: lang === 'tr' ? 'Avatar Değiştir' : 'Change Avatar', upgrade: lang === 'tr' ? 'Yükselt' : 'Upgrade' },
    notifs: { error: lang === 'tr' ? 'Hata Uyarıları' : 'Error Alerts', weekly: lang === 'tr' ? 'Haftalık Özetler' : 'Weekly Summaries', marketing: lang === 'tr' ? 'Ürün Güncellemeleri' : 'Product Updates' },
    billing: { current: lang === 'tr' ? 'MEVCUT PLAN' : 'CURRENT PLAN', next: lang === 'tr' ? 'SONRAKİ FATURA TARİHİ' : 'NEXT BILLING DATE' }
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: lang === 'tr' ? 'ABD Doları' : 'US Dollar' },
    { code: 'EUR', symbol: '€', name: lang === 'tr' ? 'Euro' : 'Euro' },
    { code: 'GBP', symbol: '£', name: lang === 'tr' ? 'İngiliz Sterlini' : 'British Pound' },
    { code: 'TRY', symbol: '₺', name: lang === 'tr' ? 'Türk Lirası' : 'Turkish Lira' },
    { code: 'JPY', symbol: '¥', name: lang === 'tr' ? 'Japon Yeni' : 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: lang === 'tr' ? 'Çin Yuanı' : 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: lang === 'tr' ? 'Hint Rupisi' : 'Indian Rupee' },
    { code: 'RUB', symbol: '₽', name: lang === 'tr' ? 'Rus Rublesi' : 'Russian Ruble' },
    { code: 'AUD', symbol: 'A$', name: lang === 'tr' ? 'Avustralya Doları' : 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: lang === 'tr' ? 'Kanada Doları' : 'Canadian Dollar' },
    { code: 'CHF', symbol: 'CHF', name: lang === 'tr' ? 'İsviçre Frangı' : 'Swiss Franc' },
    { code: 'KRW', symbol: '₩', name: lang === 'tr' ? 'Güney Kore Wonu' : 'South Korean Won' },
    { code: 'BRL', symbol: 'R$', name: lang === 'tr' ? 'Brezilya Reali' : 'Brazilian Real' },
    { code: 'MXN', symbol: 'MX$', name: lang === 'tr' ? 'Meksika Pesosu' : 'Mexican Peso' },
    { code: 'SGD', symbol: 'S$', name: lang === 'tr' ? 'Singapur Doları' : 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: lang === 'tr' ? 'Hong Kong Doları' : 'Hong Kong Dollar' },
    { code: 'NZD', symbol: 'NZ$', name: lang === 'tr' ? 'Yeni Zelanda Doları' : 'New Zealand Dollar' },
    { code: 'SEK', symbol: 'kr', name: lang === 'tr' ? 'İsveç Kronu' : 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: lang === 'tr' ? 'Norveç Kronu' : 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: lang === 'tr' ? 'Danimarka Kronu' : 'Danish Krone' },
    { code: 'PLN', symbol: 'zł', name: lang === 'tr' ? 'Polonya Zlotisi' : 'Polish Zloty' },
    { code: 'CZK', symbol: 'Kč', name: lang === 'tr' ? 'Çek Korunası' : 'Czech Koruna' },
    { code: 'HUF', symbol: 'Ft', name: lang === 'tr' ? 'Macar Forinti' : 'Hungarian Forint' },
    { code: 'RON', symbol: 'lei', name: lang === 'tr' ? 'Romanya Leyi' : 'Romanian Leu' },
    { code: 'THB', symbol: '฿', name: lang === 'tr' ? 'Tayland Bahtı' : 'Thai Baht' },
    { code: 'MYR', symbol: 'RM', name: lang === 'tr' ? 'Malezya Ringiti' : 'Malaysian Ringgit' },
    { code: 'IDR', symbol: 'Rp', name: lang === 'tr' ? 'Endonezya Rupisi' : 'Indonesian Rupiah' },
    { code: 'PHP', symbol: '₱', name: lang === 'tr' ? 'Filipin Pesosu' : 'Philippine Peso' },
    { code: 'VND', symbol: '₫', name: lang === 'tr' ? 'Vietnam Dongu' : 'Vietnamese Dong' },
    { code: 'ZAR', symbol: 'R', name: lang === 'tr' ? 'Güney Afrika Randı' : 'South African Rand' },
    { code: 'ILS', symbol: '₪', name: lang === 'tr' ? 'İsrail Şekeli' : 'Israeli Shekel' },
    { code: 'AED', symbol: 'AED', name: lang === 'tr' ? 'BAE Dirhemi' : 'UAE Dirham' },
    { code: 'SAR', symbol: 'SAR', name: lang === 'tr' ? 'Suudi Riyali' : 'Saudi Riyal' },
    { code: 'QAR', symbol: 'QR', name: lang === 'tr' ? 'Katar Riyali' : 'Qatari Riyal' },
    { code: 'KWD', symbol: 'KD', name: lang === 'tr' ? 'Kuveyt Dinarı' : 'Kuwaiti Dinar' },
    { code: 'EGP', symbol: 'E£', name: lang === 'tr' ? 'Mısır Poundu' : 'Egyptian Pound' }
  ];

  return (
    <div className="max-w-4xl space-y-8">
        {/* Profile */}
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-1">{t.titles.profile}</h3>
            <p className="text-sm text-neutral-500 mb-8">{t.desc.profile}</p>
            
            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                    {avatar ? (
                        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#C1FF72] to-green-600 flex items-center justify-center text-2xl font-bold text-black">GT</div>
                    )}
                </div>
                <div>
                    <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    <button 
                        onClick={() => fileRef.current?.click()}
                        className="px-4 py-2 border border-neutral-700 rounded-lg text-sm text-white hover:border-[#C1FF72] hover:text-[#C1FF72] transition-colors"
                    >
                        {t.buttons.changeAvatar}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase">{t.labels.name}</label>
                    <input type="text" defaultValue="Ahmet Yılmaz" className="w-full bg-[#0F0F0F] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:border-[#C1FF72] outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase">{t.labels.email}</label>
                    <input type="email" defaultValue="ahmet@globaltekstil.com" className="w-full bg-[#0F0F0F] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:border-[#C1FF72] outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase">{t.labels.company}</label>
                    <input type="text" defaultValue="Global Tekstil A.Ş." className="w-full bg-[#0F0F0F] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:border-[#C1FF72] outline-none" />
                </div>
            </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-1">{t.titles.notif}</h3>
            <p className="text-sm text-neutral-500 mb-8">{t.desc.notif}</p>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{t.notifs.error}</span>
                    <button onClick={() => onToggleNotification('errorAlerts')} className="text-[#C1FF72]">
                        {notifications.errorAlerts ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-neutral-600" />}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{t.notifs.weekly}</span>
                    <button onClick={() => onToggleNotification('weeklyReports')} className="text-[#C1FF72]">
                        {notifications.weeklyReports ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-neutral-600" />}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{t.notifs.marketing}</span>
                    <button onClick={() => onToggleNotification('marketing')} className="text-[#C1FF72]">
                        {notifications.marketing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-neutral-600" />}
                    </button>
                </div>
            </div>
        </div>

        {/* Preferences */}
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-1">{t.titles.preferences}</h3>
            <p className="text-sm text-neutral-500 mb-8">{t.desc.preferences}</p>

            <div className="space-y-4">
                <label className="text-xs text-neutral-500 uppercase">{t.labels.currency}</label>
                <select
                    value={currency.code}
                    onChange={(e) => {
                        const selected = currencies.find(c => c.code === e.target.value);
                        if (selected) {
                            onCurrencyChange({ code: selected.code, symbol: selected.symbol });
                        }
                    }}
                    className="w-full bg-[#0F0F0F] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:border-[#C1FF72] outline-none cursor-pointer"
                >
                    {currencies.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                            {curr.symbol} {curr.code} - {curr.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {/* Billing */}
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-1">{t.titles.billing}</h3>
            <p className="text-sm text-neutral-500 mb-8">{t.desc.billing}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0F0F0F] border border-neutral-800 rounded-xl p-6 relative">
                    <p className="text-xs text-neutral-500 uppercase mb-2">{t.billing.current}</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-xl font-bold text-white">{currentPlanName}</h4>
                        <span className="text-[#C1FF72] text-sm font-mono">{currency.symbol}599/{lang === 'tr' ? 'ay' : 'mo'}</span>
                    </div>
                    <button 
                        onClick={onUpgradeClick}
                        className="absolute top-4 right-4 bg-[#C1FF72] text-black text-xs font-bold px-3 py-1.5 rounded hover:bg-white transition-colors"
                    >
                        {t.buttons.upgrade}
                    </button>
                </div>
                <div className="bg-[#0F0F0F] border border-neutral-800 rounded-xl p-6">
                    <p className="text-xs text-neutral-500 uppercase mb-2">{t.billing.next}</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-xl font-bold text-white">Apr 12, 2024</h4>
                        <CreditCard className="text-neutral-600 w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const UpgradeView = ({ lang, text, currentPlanId, onPlanSelect }: { lang: 'en' | 'tr', text: any, currentPlanId: PlanType, onPlanSelect: (p: PlanType) => void }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{text.title}</h2>
        <p className="text-neutral-400">{text.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {text.tiers.map((tier: any, i: number) => {
            const planKey = ['Starter', 'Growth', 'Enterprise'][i] as PlanType;
            const isCurrent = planKey === currentPlanId;
            return (
                <div key={i} className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${isCurrent ? 'bg-neutral-900/50 border-[#C1FF72] shadow-[0_0_30px_rgba(193,255,114,0.1)]' : 'bg-[#0A0A0A] border-neutral-800 hover:border-neutral-700'}`}>
                    {isCurrent && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C1FF72] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {text.current}
                    </div>
                    )}
                    <div className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                        <span className="text-neutral-500">{tier.period}</span>
                    </div>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                    {tier.features.map((feature: string, j: number) => (
                        <li key={j} className="flex items-start text-sm text-neutral-300">
                        <Check className="w-4 h-4 mr-3 mt-0.5 text-[#C1FF72]" />
                        {feature}
                        </li>
                    ))}
                    </ul>
                    <Button 
                        variant={isCurrent ? 'outline' : 'primary'} 
                        className="w-full"
                        onClick={() => !isCurrent && onPlanSelect(planKey)}
                        disabled={isCurrent}
                    >
                        {isCurrent ? text.current : tier.price === 'Custom' || tier.price === 'Özel' ? text.contact : text.switch}
                    </Button>
                </div>
            );
        })}
      </div>

      <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#C1FF72]" />
                {text.security.title}
            </h3>
            <p className="text-neutral-400 max-w-2xl">{text.security.desc}</p>
        </div>
        <Button variant="outline">{text.security.btn}</Button>
      </div>
    </div>
  );
};

const AllNotificationsModal = ({ lang, text, notifications, onClose, onMarkAllRead }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl w-full max-w-5xl h-[80vh] relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-[#0F0F0F] z-20">
                    <h3 className="text-xl font-semibold text-white">{text.modalTitle}</h3>
                    <div className="flex items-center gap-4">
                        {notifications.length > 0 && (
                            <button onClick={onMarkAllRead} className="text-sm text-[#C1FF72] hover:underline">
                                {text.markRead}
                            </button>
                        )}
                        <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notif: any) => (
                                <button 
                                    key={notif.id} 
                                    className="w-full text-left p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-[#C1FF72]/50 hover:bg-neutral-900 transition-all group"
                                    onClick={() => console.log('Notification clicked:', notif.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-3 h-3 mt-1.5 rounded-full shrink-0 ${
                                            notif.type === 'success' ? 'bg-green-500 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                            notif.type === 'error' ? 'bg-red-500 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                        } transition-shadow`}></div>
                                        <div>
                                            <h4 className="text-base font-medium text-white group-hover:text-[#C1FF72] transition-colors">{notif.title}</h4>
                                            <p className="text-sm text-neutral-400 mt-1 group-hover:text-neutral-300">{notif.msg}</p>
                                            <span className="text-xs text-neutral-600 mt-3 block">{notif.time}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <Bell className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                            <p className="text-neutral-500">{text.empty}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const RenameDocModal = ({ doc, text, onClose, onSave }: any) => {
    const [name, setName] = useState(doc.name);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#0F0F0F] border border-neutral-800 rounded-2xl w-full max-w-md relative z-10 shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">{text.renameTitle}</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-neutral-500 hover:text-white" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-neutral-500 block mb-1.5">{text.currentName}</label>
                        <div className="text-sm text-neutral-300 bg-neutral-900 p-2 rounded border border-neutral-800">{doc.name}</div>
                    </div>
                    <div>
                        <label className="text-xs text-neutral-500 block mb-1.5">{text.newName}</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-neutral-700 rounded p-2 text-sm text-white focus:border-[#C1FF72] outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={onClose} className="!h-9 !py-0 !px-4 text-xs">{text.cancel}</Button>
                        <Button onClick={() => onSave(doc.id, name)} className="!h-9 !py-0 !px-4 text-xs">{text.save}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagDocModal = ({ doc, text, onClose, onAdd }: any) => {
    const [tag, setTag] = useState('');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#0F0F0F] border border-neutral-800 rounded-2xl w-full max-w-md relative z-10 shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">{text.tagTitle}</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-neutral-500 hover:text-white" /></button>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {doc.tags.map((t: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-neutral-800 text-white text-xs rounded border border-neutral-700">{t}</span>
                        ))}
                    </div>
                    <div>
                        <label className="text-xs text-neutral-500 block mb-1.5">{text.tagName}</label>
                        <input 
                            type="text" 
                            value={tag} 
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Urgent, Reviewed, etc."
                            className="w-full bg-[#0F0F0F] border border-neutral-700 rounded p-2 text-sm text-white focus:border-[#C1FF72] outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={onClose} className="!h-9 !py-0 !px-4 text-xs">{text.cancel}</Button>
                        <Button onClick={() => onAdd(doc.id, tag)} className="!h-9 !py-0 !px-4 text-xs">{text.add}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
