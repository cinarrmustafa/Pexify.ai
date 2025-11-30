import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';

interface LoginPageProps {
  lang: 'en' | 'tr';
  onBack: () => void;
  onSignupClick: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ lang, onBack, onSignupClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const t = {
    en: {
      back: "Back to Home",
      welcome: "Welcome",
      subtitle: "Enter your credentials to access your dashboard.",
      emailLabel: "Email Address",
      emailPlaceholder: "name@company.com",
      passLabel: "Password",
      passPlaceholder: "Enter your password",
      forgot: "Forgot password?",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Start Free Trial",
      google: "Continue with Google",
      sso: "Continue with SSO"
    },
    tr: {
      back: "Ana Sayfaya Dön",
      welcome: "Hoşgeldiniz",
      subtitle: "Panelinize erişmek için bilgilerinizi girin.",
      emailLabel: "E-posta Adresi",
      emailPlaceholder: "isim@sirket.com",
      passLabel: "Şifre",
      passPlaceholder: "Şifrenizi girin",
      forgot: "Şifremi unuttum?",
      signIn: "Giriş Yap",
      noAccount: "Hesabınız yok mu?",
      signUp: "Ücretsiz Deneyin",
      google: "Google ile Devam Et",
      sso: "SSO ile Devam Et"
    }
  };

  const text = t[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-5"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-denim-3.png')] opacity-30"></div>
      </div>

      {/* Header / Back Button */}
      <div className="w-full max-w-7xl mx-auto p-6 relative z-20">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {text.back}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold tracking-tight text-white">Pexify<span className="text-[#C1FF72]">.ai</span></span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">{text.welcome}</h1>
              <p className="text-neutral-400 text-sm">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#C1FF72]" />
                    {text.passLabel}
                  </label>
                  <a href="#" className="text-xs text-neutral-400 hover:text-[#C1FF72] transition-colors">{text.forgot}</a>
                </div>
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
                className="w-full !py-3 !text-base" 
                isLoading={isLoading}
              >
                {text.signIn}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0A0A0A] px-2 text-neutral-600">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center h-10 px-4 border border-neutral-800 rounded-lg bg-[#0F0F0F] text-white text-sm hover:bg-neutral-800 transition-colors">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center h-10 px-4 border border-neutral-800 rounded-lg bg-[#0F0F0F] text-white text-sm hover:bg-neutral-800 transition-colors">
                SSO
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500">
                {text.noAccount}{" "}
                <button 
                  onClick={onSignupClick}
                  className="text-[#C1FF72] hover:underline font-medium ml-1"
                >
                  {text.signUp}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <div className="py-6 text-center relative z-10">
        <p className="text-xs text-neutral-700">© 2024 Pexify AI Inc.</p>
      </div>
    </div>
  );
};