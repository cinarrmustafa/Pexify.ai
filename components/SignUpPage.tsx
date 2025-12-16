
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, User, Building, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface SignUpPageProps {
  lang: 'en' | 'tr';
  onBack: () => void;
  onLoginClick: () => void;
  onSignupSuccess?: () => void;
  selectedPlan?: string;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ lang, onBack, onLoginClick, onSignupSuccess, selectedPlan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      back: "Back",
      title: "Create your account",
      subtitle: "Finish setting up your account to access the dashboard.",
      nameLabel: "Full Name",
      namePlaceholder: "John Doe",
      companyLabel: "Company Name (Optional)",
      companyPlaceholder: "Global Textiles Ltd.",
      emailLabel: "E-mail",
      emailPlaceholder: "name@company.com",
      passLabel: "Password",
      passPlaceholder: "Create a password",
      createAccount: "Complete Registration",
      haveAccount: "Already have an account?",
      signIn: "Sign In",
      terms: "By creating an account, you agree to our Terms of Service and Privacy Policy.",
      planLabel: "Selected Plan:"
    },
    tr: {
      back: "Geri",
      title: "Hesabınızı oluşturun",
      subtitle: "Panele erişmek için hesap kurulumunuzu tamamlayın.",
      nameLabel: "Ad Soyad",
      namePlaceholder: "Ahmet Yılmaz",
      companyLabel: "Şirket Adı (Opsiyonel)",
      companyPlaceholder: "Global Tekstil A.Ş.",
      emailLabel: "E-posta",
      emailPlaceholder: "isim@sirket.com",
      passLabel: "Şifre",
      passPlaceholder: "Bir şifre oluşturun",
      createAccount: "Kaydı Tamamla",
      haveAccount: "Zaten hesabınız var mı?",
      signIn: "Giriş Yap",
      terms: "Hesap oluşturarak Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.",
      planLabel: "Seçilen Plan:"
    }
  };

  const text = t[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        if (onSignupSuccess) onSignupSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-5"></div>
      </div>

      {/* Header / Back Button */}
      <div className="w-full max-w-7xl mx-auto p-6 relative z-20">
        <Button 
          onClick={onBack}
          className="!px-6 !py-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.back}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-[#ffffff]">Pe</span>
                <span className="text-[#dffebc]">x</span>
                <span className="text-[#c1ff72]">ify</span>
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">{text.title}</h1>
              <p className="text-neutral-400 text-sm">{text.subtitle}</p>
              
              {selectedPlan && (
                <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-lg bg-[#C1FF72]/10 border border-[#C1FF72]/20">
                    <span className="text-xs text-neutral-400 mr-2">{text.planLabel}</span>
                    <span className="text-xs font-bold text-[#C1FF72] flex items-center gap-1">
                        {selectedPlan} <CheckCircle2 className="w-3 h-3" />
                    </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#C1FF72]" />
                    {text.nameLabel}
                    </label>
                    <input 
                    type="text" 
                    placeholder={text.namePlaceholder}
                    className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                    required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#C1FF72]" />
                    {text.companyLabel}
                    </label>
                    <input 
                    type="text" 
                    placeholder={text.companyPlaceholder}
                    className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                    />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.emailLabel}
                </label>
                <input 
                  type="email" 
                  placeholder={text.emailPlaceholder}
                  className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.passLabel}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder={text.passPlaceholder}
                    className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all pr-10"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full !py-3 !text-base mt-2" 
                isLoading={isLoading}
              >
                {text.createAccount}
              </Button>
              
              <p className="text-[10px] text-neutral-600 text-center leading-relaxed px-4">
                {text.terms}
              </p>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-neutral-800">
              <p className="text-sm text-neutral-500">
                {text.haveAccount}{" "}
                <button 
                  onClick={onLoginClick}
                  className="text-[#C1FF72] hover:underline font-medium ml-1"
                >
                  {text.signIn}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
