
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Clock, User, Building, CheckCircle2, ChevronLeft, ChevronRight, BarChart3, Target, Factory } from 'lucide-react';
import { Button } from './Button';

interface ScheduleDemoPageProps {
  lang: 'en' | 'tr';
  onBack: () => void;
}

type Step = 'companyType' | 'role' | 'volume' | 'challenge' | 'details' | 'calendar' | 'success';

export const ScheduleDemoPage: React.FC<ScheduleDemoPageProps> = ({ lang, onBack }) => {
  // Wizard State
  const [currentStep, setCurrentStep] = useState<Step>('companyType');
  const [direction, setDirection] = useState(1); // For animation direction

  // Date State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null); 
  const [selectedYearIndex, setSelectedYearIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Data State
  const [companyType, setCompanyType] = useState('');
  const [customCompanyType, setCustomCompanyType] = useState('');
  const [role, setRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [volume, setVolume] = useState('');
  const [challenge, setChallenge] = useState('');
  const [customChallenge, setCustomChallenge] = useState('');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [demoLanguage, setDemoLanguage] = useState<'en' | 'tr'>('en');

  // Loading/Success
  const [isLoading, setIsLoading] = useState(false);

  // Country Search State
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryWrapperRef = useRef<HTMLDivElement>(null);

  // Countries List
  const countryList = [
    "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Cambodia",
    "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", 
    "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", 
    "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Myanmar", 
    "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", 
    "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", 
    "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", 
    "Tunisia", "Türkiye", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Vietnam"
  ];
  const countries = [...countryList.sort(), "Other"];
  const filteredCountries = countries.filter(c => c.toLowerCase().includes(country.toLowerCase()));

  // Close dropdown logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryWrapperRef.current && !countryWrapperRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = {
    en: {
      back: "Back",
      next: "Next Step",
      steps: {
        companyType: "What is your company type?",
        specifyType: "Please specify your company type",
        role: "What is your primary role?",
        specifyRole: "Please specify your role",
        volume: "Monthly Export Volume (Docs)",
        challenge: "Primary challenge?",
        specifyChallenge: "Please specify your challenge",
        details: "Contact Details",
        calendar: "Select Date & Time"
      },
      options: {
        companyTypes: [
          "Manufacturer",
          "Exporter",
          "Supplier",
          "Customs / Logistics",
          "Consultancy / Brokerage",
          "Other"
        ],
        roles: ["Export Manager", "Operations Director", "Business Owner", "IT / Tech Lead", "Other"],
        volumes: [
          "0–10 shipments",
          "10–50 shipments",
          "50–150 shipments",
          "150–300 shipments",
          "300+ shipments"
        ],
        challenges: ["Customs Delays", "Manual Data Entry", "Compliance Risks", "High Costs", "Other"]
      },
      form: {
        title: "Almost there! We just need your details.",
        name: "Full Name",
        email: "Work Email",
        company: "Company Name",
        country: "Country",
        selectCountry: "Select Country...",
        noCountryFound: "No country found",
        language: "Preferred Demo Language"
      },
      calendar: {
        title: "Pick a time for the demo",
        confirm: "Confirm Booking",
        submitting: "Booking..."
      },
      success: {
        title: "You're all set!",
        desc: "We have sent a calendar invitation to your email.",
        btn: "Back"
      },
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    },
    tr: {
      back: "Geri",
      next: "Sonraki Adım",
      steps: {
        companyType: "Şirket türü?",
        specifyType: "Lütfen şirket türünü belirtiniz",
        role: "Göreviniz nedir?",
        specifyRole: "Lütfen görevinizi belirtiniz",
        volume: "Aylık İhracat Hacmi (Belge Sayısı)",
        challenge: "En büyük zorluğunuz nedir?",
        specifyChallenge: "Lütfen zorluğunuzu belirtiniz",
        details: "İletişim Bilgileri",
        calendar: "Tarih ve Saat Seçin"
      },
      options: {
        companyTypes: [
          "Üretici",
          "İhracatçı",
          "Tedarikçi",
          "Gümrük / Lojistik",
          "Danışmanlık / Aracı",
          "Diğer"
        ],
        roles: ["İhracat Müdürü", "Operasyon Direktörü", "Şirket Sahibi", "IT / Teknoloji Lideri", "Diğer"],
        volumes: [
          "0–10 gönderi",
          "10–50 gönderi",
          "50–150 gönderi",
          "150–300 gönderi",
          "300+ gönderi"
        ],
        challenges: ["Gümrük Gecikmeleri", "Manuel Veri Girişi", "Uyum Riskleri", "Yüksek Maliyetler", "Diğer"]
      },
      form: {
        title: "Neredeyse bitti! Bilgilerinize ihtiyacımız var.",
        name: "Ad Soyad",
        email: "İş E-postası",
        company: "Şirket Adı",
        country: "Ülke",
        selectCountry: "Ülke Seçiniz...",
        noCountryFound: "Ülke bulunamadı",
        language: "Tercih Edilen Demo Dili"
      },
      calendar: {
        title: "Demo için bir zaman seçin",
        confirm: "Randevuyu Onayla",
        submitting: "Planlanıyor..."
      },
      success: {
        title: "Harika, işlem tamam!",
        desc: "Takvim davetiyesini e-posta adresinize gönderdik.",
        btn: "Geri"
      },
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      weekDays: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
      timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    }
  };

  const text = t[lang];

  // Helper: Navigation
  const goToStep = (nextStep: Step) => {
    setDirection(1);
    setCurrentStep(nextStep);
  };
  
  const goBack = (prevStep: Step) => {
    setDirection(-1);
    setCurrentStep(prevStep);
  };

  // Calendar Helpers
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();
    if (isCurrentMonth) return;
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(prev => prev - 1); }
    else { setCurrentMonth(prev => prev - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(prev => prev + 1); }
    else { setCurrentMonth(prev => prev + 1); }
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    setSelectedMonthIndex(currentMonth);
    setSelectedYearIndex(currentYear);
  };

  const handleFinalSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToStep('success');
    }, 2000);
  };

  // --- RENDER STEPS ---

  const renderCompanyTypeStep = () => {
    const otherOptionString = text.options.companyTypes[text.options.companyTypes.length - 1];
    const isOtherSelected = companyType === otherOptionString;

    return (
      <div className="w-full">
        <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-neutral-800">
          <Factory className="w-8 h-8 text-[#C1FF72]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{text.steps.companyType}</h2>
        <div className="flex flex-col gap-3 max-w-xl mx-auto">
          {text.options.companyTypes.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCompanyType(c);
                if (c !== otherOptionString) {
                    goToStep('role');
                }
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-300 group
                ${companyType === c
                  ? 'bg-[#C1FF72] border-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]'
                  : 'bg-[#0A0A0A] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'}`}
            >
              <span className="font-medium text-base block">{c}</span>
            </button>
          ))}
        </div>

        {/* Custom Input for "Other" */}
        {isOtherSelected && (
           <div className="mt-6 max-w-xl mx-auto">
              <label className="text-sm font-medium text-neutral-400 mb-2 block">{text.steps.specifyType}</label>
              <div className="flex gap-3 flex-col">
                 <input
                    type="text"
                    value={customCompanyType}
                    onChange={(e) => setCustomCompanyType(e.target.value)}
                    placeholder={text.steps.specifyType + "..."}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    autoFocus
                 />
                 <Button
                    onClick={() => goToStep('role')}
                    disabled={!customCompanyType.trim()}
                    className="w-full"
                 >
                    {text.next}
                 </Button>
              </div>
           </div>
        )}
      </div>
    );
  };

  const renderRoleStep = () => {
    const otherOptionString = text.options.roles[text.options.roles.length - 1];
    const isOtherSelected = role === otherOptionString;

    return (
      <div className="w-full">
        <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-neutral-800">
          <User className="w-8 h-8 text-[#C1FF72]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{text.steps.role}</h2>
        <div className="flex flex-col gap-3 max-w-xl mx-auto">
          {text.options.roles.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                if (r !== otherOptionString) {
                  goToStep('volume');
                }
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-300 group
                ${role === r
                  ? 'bg-[#C1FF72] border-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]'
                  : 'bg-[#0A0A0A] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'}`}
            >
              <span className="font-medium text-base block">{r}</span>
            </button>
          ))}
        </div>

        {isOtherSelected && (
           <div className="mt-6 max-w-xl mx-auto">
              <label className="text-sm font-medium text-neutral-400 mb-2 block">{text.steps.specifyRole}</label>
              <div className="flex gap-3 flex-col">
                 <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder={text.steps.specifyRole + "..."}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    autoFocus
                 />
                 <Button
                    onClick={() => goToStep('volume')}
                    disabled={!customRole.trim()}
                    className="w-full"
                 >
                    {text.next}
                 </Button>
              </div>
           </div>
        )}

        <div className="mt-8 flex justify-center">
          <button onClick={() => goBack('companyType')} className="text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
              <ArrowLeft className="w-4 h-4" /> {text.back}
          </button>
        </div>
      </div>
    );
  };

  const renderVolumeStep = () => (
    <div className="w-full">
      <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-neutral-800">
        <BarChart3 className="w-8 h-8 text-[#C1FF72]" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{text.steps.volume}</h2>
      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {text.options.volumes.map((v) => (
          <button
            key={v}
            onClick={() => { setVolume(v); goToStep('challenge'); }}
            className={`p-4 rounded-xl border text-left transition-all duration-300 group
              ${volume === v
                ? 'bg-[#C1FF72] border-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]'
                : 'bg-[#0A0A0A] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'}`}
          >
            <span className="font-medium text-base block">{v}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button onClick={() => goBack('role')} className="text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> {text.back}
        </button>
      </div>
    </div>
  );

  const renderChallengeStep = () => {
    const otherOptionString = text.options.challenges[text.options.challenges.length - 1];
    const isOtherSelected = challenge === otherOptionString;

    return (
      <div className="w-full">
        <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-neutral-800">
          <Target className="w-8 h-8 text-[#C1FF72]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{text.steps.challenge}</h2>
        <div className="flex flex-col gap-3 max-w-xl mx-auto">
          {text.options.challenges.map((c) => (
            <button
              key={c}
              onClick={() => {
                setChallenge(c);
                if (c !== otherOptionString) {
                  goToStep('details');
                }
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-300 group
                ${challenge === c
                  ? 'bg-[#C1FF72] border-[#C1FF72] text-black shadow-[0_0_20px_rgba(193,255,114,0.3)]'
                  : 'bg-[#0A0A0A] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'}`}
            >
              <span className="font-medium text-base block">{c}</span>
            </button>
          ))}
        </div>

        {isOtherSelected && (
           <div className="mt-6 max-w-xl mx-auto">
              <label className="text-sm font-medium text-neutral-400 mb-2 block">{text.steps.specifyChallenge}</label>
              <div className="flex gap-3 flex-col">
                 <input
                    type="text"
                    value={customChallenge}
                    onChange={(e) => setCustomChallenge(e.target.value)}
                    placeholder={text.steps.specifyChallenge + "..."}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    autoFocus
                 />
                 <Button
                    onClick={() => goToStep('details')}
                    disabled={!customChallenge.trim()}
                    className="w-full"
                 >
                    {text.next}
                 </Button>
              </div>
           </div>
        )}

        <div className="mt-8 flex justify-center">
          <button onClick={() => goBack('volume')} className="text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
              <ArrowLeft className="w-4 h-4" /> {text.back}
          </button>
        </div>
      </div>
    );
  };

  const renderDetailsStep = () => (
    <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{text.steps.details}</h2>
            <p className="text-neutral-400 text-sm">{text.form.title}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); goToStep('calendar'); }} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{text.form.name}</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    required
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{text.form.email}</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    required
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{text.form.company}</label>
                <input 
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    required
                />
            </div>
            <div className="space-y-1.5" ref={countryWrapperRef}>
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{text.form.country}</label>
                <div className="relative">
                    <input 
                        type="text"
                        value={country}
                        onChange={(e) => { setCountry(e.target.value); setIsCountryOpen(true); }}
                        onClick={() => setIsCountryOpen(true)}
                        onFocus={() => setIsCountryOpen(true)}
                        placeholder={text.form.selectCountry}
                        className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                        required
                    />
                    {isCountryOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 max-h-48 overflow-y-auto bg-[#0F0F0F] border border-neutral-800 rounded-xl shadow-2xl z-50 custom-scrollbar">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => { setCountry(c); setIsCountryOpen(false); }}
                                className="w-full text-left px-4 py-3 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white border-b border-neutral-800/50 last:border-0"
                            >
                                {c}
                            </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-neutral-500">{text.form.noCountryFound}</div>
                        )}
                        </div>
                    )}
                </div>
            </div>
            
            <Button type="submit" className="w-full mt-4" disabled={!name || !email || !company || !country}>
                {text.next}
            </Button>
        </form>

        <div className="mt-6 flex justify-center">
            <button onClick={() => goBack('challenge')} className="text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> {text.back}
            </button>
        </div>
    </div>
  );

  const renderCalendarStep = () => (
    <div className="w-full">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{text.calendar.title}</h2>
            <div className="flex justify-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1"><User className="w-3 h-3"/> {name}</span>
                <span className="flex items-center gap-1"><Building className="w-3 h-3"/> {company}</span>
            </div>
        </div>

        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-4xl mx-auto">
            {/* Calendar */}
            <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={handlePrevMonth} disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()} className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30">
                        <ChevronLeft className="w-5 h-5 text-neutral-400" />
                    </button>
                    <span className="text-white font-medium">{text.months[currentMonth]} {currentYear}</span>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-neutral-800 rounded">
                        <ChevronRight className="w-5 h-5 text-neutral-400" />
                    </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {text.weekDays.map(day => <div key={day} className="text-center text-xs text-neutral-500 font-medium py-1">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {blanksArray.map(i => <div key={`blank-${i}`} />)}
                    {daysArray.map(day => {
                        const isSelected = selectedDate === day && selectedMonthIndex === currentMonth && selectedYearIndex === currentYear;
                        const checkDate = new Date(currentYear, currentMonth, day);
                        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const isPast = checkDate < todayDate;
                        
                        return (
                            <button
                                key={day}
                                disabled={isPast}
                                onClick={() => handleDateSelect(day)}
                                className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm transition-all
                                    ${isSelected ? 'bg-[#C1FF72] text-black font-bold' : isPast ? 'text-neutral-700 cursor-not-allowed' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time & Confirm */}
            <div className="w-full md:w-64 p-6 md:p-8 bg-[#0F0F0F] flex flex-col">
                <h4 className="text-sm font-medium text-neutral-400 mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Time</h4>
                <div className="grid grid-cols-2 gap-2 mb-8">
                    {text.timeSlots.map(time => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-lg text-sm border transition-all ${selectedTime === time ? 'bg-[#C1FF72] border-[#C1FF72] text-black font-semibold' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600'}`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
                
                <div className="mt-auto space-y-3">
                     <div className="space-y-1.5">
                       <label className="text-[10px] text-neutral-500 uppercase tracking-wider">{text.form.language}</label>
                       <div className="relative">
                           <select 
                              value={demoLanguage}
                              onChange={(e) => setDemoLanguage(e.target.value as 'en' | 'tr')}
                              className="w-full h-9 px-3 bg-[#0A0A0A] border border-neutral-800 rounded-lg text-white text-xs focus:border-[#C1FF72] outline-none"
                           >
                              <option value="en">English</option>
                              <option value="tr">Türkçe</option>
                           </select>
                       </div>
                    </div>

                    <Button onClick={handleFinalSubmit} disabled={!selectedDate || !selectedTime} isLoading={isLoading} className="w-full text-sm">
                        {isLoading ? text.calendar.submitting : text.calendar.confirm}
                    </Button>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-center">
            <button onClick={() => goBack('details')} className="text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> {text.back}
            </button>
        </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-[#C1FF72]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#C1FF72]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{text.success.title}</h2>
        <p className="text-neutral-400 mb-8 max-w-md">{text.success.desc}</p>
        
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-8 w-full max-w-sm text-left">
             <div className="flex justify-between mb-2">
                 <span className="text-neutral-500 text-sm">Date</span>
                 <span className="text-white text-sm font-medium">{selectedDate} {text.months[selectedMonthIndex ?? currentMonth]} {selectedYearIndex}</span>
             </div>
             <div className="flex justify-between mb-2">
                 <span className="text-neutral-500 text-sm">Time</span>
                 <span className="text-white text-sm font-medium">{selectedTime}</span>
             </div>
             <div className="h-px bg-neutral-800 my-3"></div>
             <div className="flex justify-between">
                 <span className="text-neutral-500 text-sm">For</span>
                 <span className="text-white text-sm font-medium">{email}</span>
             </div>
        </div>

        <Button onClick={onBack}>{text.success.btn}</Button>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-5"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C1FF72] rounded-full mix-blend-overlay filter blur-[150px] opacity-5"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-6 relative z-20">
        <Button 
          onClick={onBack}
          className="!px-6 !py-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.back}
        </Button>
      </div>

      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl">
            {/* Progress Bar (Hidden on Success) */}
            {currentStep !== 'success' && (
                <div className="mb-12 max-w-xs mx-auto">
                    <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#C1FF72] transition-all duration-500 ease-out"
                            style={{ 
                                width: currentStep === 'companyType' ? '16%' :
                                       currentStep === 'role' ? '33%' : 
                                       currentStep === 'volume' ? '50%' : 
                                       currentStep === 'challenge' ? '66%' : 
                                       currentStep === 'details' ? '83%' : '100%' 
                            }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Steps Content */}
            <div className="min-h-[400px] flex flex-col justify-center">
                {currentStep === 'companyType' && renderCompanyTypeStep()}
                {currentStep === 'role' && renderRoleStep()}
                {currentStep === 'volume' && renderVolumeStep()}
                {currentStep === 'challenge' && renderChallengeStep()}
                {currentStep === 'details' && renderDetailsStep()}
                {currentStep === 'calendar' && renderCalendarStep()}
                {currentStep === 'success' && renderSuccessStep()}
            </div>
        </div>
      </div>

      <div className="p-6 text-center relative z-10 border-t border-neutral-900/50 mt-auto">
        <p className="text-xs text-neutral-700">© 2024 Pexify AI Inc.</p>
      </div>
    </div>
  );
};
