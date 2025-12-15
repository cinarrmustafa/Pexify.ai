
import React, { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface PaymentPageProps {
  lang: 'en' | 'tr';
  plan: string;
  price: string;
  period: string;
  onBack: () => void;
  onContinue: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ lang, plan, price, period, onBack, onContinue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    en: {
      back: "Back to Pricing",
      title: "Secure Checkout",
      subtitle: "Complete your subscription to start using Pexify.",
      summaryTitle: "Order Summary",
      total: "Total due today",
      cardName: "Cardholder Name",
      cardNumber: "Card Number",
      expiry: "Expiry Date",
      cvc: "CVC",
      secureNote: "Payments are secure and encrypted.",
      btn: "Continue to Registration",
      processing: "Processing..."
    },
    tr: {
      back: "Fiyatlandırmaya Dön",
      title: "Güvenli Ödeme",
      subtitle: "Pexify'ı kullanmaya başlamak için aboneliğinizi tamamlayın.",
      summaryTitle: "Sipariş Özeti",
      total: "Bugün ödenecek tutar",
      cardName: "Kart Sahibi Adı",
      cardNumber: "Kart Numarası",
      expiry: "Son Kullanma Tarihi",
      cvc: "CVC",
      secureNote: "Ödemeler güvenli ve şifrelidir.",
      btn: "Kayıt İşlemine Devam Et",
      processing: "İşleniyor..."
    }
  };

  const text = t[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate payment processing delay
    setTimeout(() => {
        setIsLoading(false);
        onContinue();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[150px] opacity-10"></div>
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
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* Left: Summary */}
          <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">{text.summaryTitle}</h3>
            
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-neutral-800">
                <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{plan}</h4>
                    <p className="text-sm text-neutral-400">Pexify AI Subscription</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-[#C1FF72]">{price}</span>
                    <span className="text-sm text-neutral-500 block">{period}</span>
                </div>
            </div>

            <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-[#C1FF72] mr-3" />
                    SOC2 Type II Security
                </li>
                <li className="flex items-center text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-[#C1FF72] mr-3" />
                    14-Day Money Back Guarantee
                </li>
                <li className="flex items-center text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-[#C1FF72] mr-3" />
                    Instant Activation
                </li>
            </ul>

            <div className="flex justify-between items-center pt-4">
                <span className="text-neutral-400">{text.total}</span>
                <span className="text-3xl font-bold text-white">{price}</span>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div>
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white mb-2">{text.title}</h1>
                <p className="text-neutral-400">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase">{text.cardName}</label>
                    <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase">{text.cardNumber}</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full h-12 pl-12 pr-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all font-mono"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-neutral-500 uppercase">{text.expiry}</label>
                        <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full h-12 px-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all text-center"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-neutral-500 uppercase">{text.cvc}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input 
                                type="text" 
                                placeholder="123"
                                className="w-full h-12 pl-10 pr-4 bg-[#0F0F0F] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all text-center"
                                required
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full !py-4 !text-base shadow-[0_0_20px_rgba(193,255,114,0.3)]"
                    isLoading={isLoading}
                >
                    {isLoading ? text.processing : text.btn}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                    <ShieldCheck className="w-4 h-4" />
                    {text.secureNote}
                </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
