
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff, CheckCircle, KeyRound, Hash } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  lang: 'en' | 'tr';
  onBack: () => void;
  onSignupClick: () => void;
  onLoginSuccess?: () => void;
}

type LoginView = 'login' | 'email' | 'code' | 'password' | 'success';

export const LoginPage: React.FC<LoginPageProps> = ({ lang, onBack, onSignupClick, onLoginSuccess }) => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State Management
  const [view, setView] = useState<LoginView>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const t = {
    en: {
      back: "Back",
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
      sso: "Continue with SSO",
      continueWith: "OR",
      // Forgot Password Flow
      forgotTitle: "Reset Password",
      forgotSubtitle: "Enter your email address to receive a verification code.",
      sendCode: "Send Verification Code",
      enterCodeTitle: "Enter Code",
      enterCodeDesc: "We sent a 6-digit code to",
      verifyCode: "Verify Code",
      codePlaceholder: "000000",
      newPassTitle: "Set New Password",
      newPassDesc: "Create a strong password for your account.",
      newPassLabel: "New Password",
      savePass: "Reset Password",
      successTitle: "Password Reset!",
      successDesc: "Your password has been successfully updated. You can now log in.",
      backLogin: "Back to Log In",
      tryAgain: "Use a different email"
    },
    tr: {
      back: "Geri",
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
      sso: "SSO ile Devam Et",
      continueWith: "VEYA",
      // Forgot Password Flow
      forgotTitle: "Şifre Sıfırlama",
      forgotSubtitle: "Doğrulama kodu almak için e-posta adresinizi girin.",
      sendCode: "Doğrulama Kodu Gönder",
      enterCodeTitle: "Kodu Girin",
      enterCodeDesc: "6 haneli doğrulama kodunu şu adrese gönderdik:",
      verifyCode: "Kodu Doğrula",
      codePlaceholder: "000000",
      newPassTitle: "Yeni Şifre Belirle",
      newPassDesc: "Hesabınız için güçlü bir şifre oluşturun.",
      newPassLabel: "Yeni Şifre",
      savePass: "Şifreyi Güncelle",
      successTitle: "Şifre Sıfırlandı!",
      successDesc: "Şifreniz başarıyla güncellendi. Artık yeni şifrenizle giriş yapabilirsiniz.",
      backLogin: "Giriş Ekranına Dön",
      tryAgain: "Farklı bir e-posta kullan"
    }
  };

  const text = t[lang];

  // Login Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  // Step 1: Send Code
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setView('code');
    }, 1500);
  };

  // Step 2: Verify Code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setView('password');
    }, 1500);
  };

  // Step 3: Set New Password
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setView('success');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open('https://accounts.google.com/signin', 'google_login', `width=${width},height=${height},left=${left},top=${top}`);
    setTimeout(() => {
        if (popup) popup.close();
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
    }, 2500);
  };

  const handleSSOLogin = () => {
    setIsLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open('https://login.microsoftonline.com/', 'sso_login', `width=${width},height=${height},left=${left},top=${top}`);
    setTimeout(() => {
        if (popup) popup.close();
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
    }, 2500);
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">{text.welcome}</h1>
              <p className="text-neutral-400 text-sm">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={text.emailPlaceholder}
                  className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.passLabel}
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <button
                  type="button" 
                  onClick={() => setView('email')}
                  className="absolute top-0 right-0 text-xs text-neutral-400 hover:text-[#C1FF72] transition-colors"
                >
                  {text.forgot}
                </button>
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
                <span className="bg-[#0A0A0A] px-2 text-neutral-600">{text.continueWith}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-10 px-4 border border-neutral-800 rounded-lg bg-[#0F0F0F] text-white text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button 
                type="button"
                onClick={handleSSOLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-10 px-4 border border-neutral-800 rounded-lg bg-[#0F0F0F] text-white text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
          </>
        );

      case 'email':
        return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C1FF72]">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">{text.forgotTitle}</h1>
              <p className="text-neutral-400 text-sm leading-relaxed">{text.forgotSubtitle}</p>
            </div>

            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.emailLabel}
                </label>
                <input 
                  type="email" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder={text.emailPlaceholder}
                  className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full !py-3 !text-base" 
                isLoading={isLoading}
              >
                {text.sendCode}
              </Button>

              <button 
                type="button" 
                onClick={() => setView('login')}
                className="w-full text-sm text-neutral-400 hover:text-white transition-colors flex items-center justify-center gap-2 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {text.backLogin}
              </button>
            </form>
          </div>
        );

      case 'code':
        return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C1FF72]">
                <Hash className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">{text.enterCodeTitle}</h1>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {text.enterCodeDesc} <br/>
                <span className="text-white font-medium">{resetEmail}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.enterCodeTitle}
                </label>
                <input 
                  type="text" 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder={text.codePlaceholder}
                  maxLength={6}
                  className="w-full h-14 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-2xl text-center tracking-[0.5em] font-mono placeholder-neutral-700 focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full !py-3 !text-base" 
                  isLoading={isLoading}
                  disabled={otpCode.length < 6}
                >
                  {text.verifyCode}
                </Button>
                
                <button 
                  type="button" 
                  onClick={() => setView('email')}
                  className="text-xs text-neutral-500 hover:text-[#C1FF72] transition-colors"
                >
                  {text.tryAgain}
                </button>
              </div>
            </form>
          </div>
        );

      case 'password':
        return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C1FF72]">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">{text.newPassTitle}</h1>
              <p className="text-neutral-400 text-sm">{text.newPassDesc}</p>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-6">
              <div className="space-y-1.5 relative">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#C1FF72]" />
                  {text.newPassLabel}
                </label>
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                {text.savePass}
              </Button>
            </form>
          </div>
        );

      case 'success':
        return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center py-4">
            <div className="w-16 h-16 bg-[#C1FF72]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#C1FF72]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">{text.successTitle}</h2>
            <p className="text-neutral-400 text-sm mb-8">{text.successDesc}</p>
            
            <Button 
              onClick={() => { setView('login'); setResetEmail(''); setOtpCode(''); setNewPassword(''); }}
              variant="secondary"
              className="w-full !py-3"
            >
              {text.backLogin}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-5"></div>
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
            <div className="flex flex-col items-center gap-4">
              <span className="text-4xl font-bold tracking-tight text-center">
                <span className="text-[#ffffff]">Pe</span>
                <span className="text-[#dffebc]">x</span>
                <span className="text-[#c1ff72]">ify</span>
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            {renderContent()}
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
