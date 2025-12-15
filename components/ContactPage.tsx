
import React, { useState } from 'react';
import { ArrowLeft, Mail, MapPin, Phone, Send, Loader2, CheckCircle, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from './Button';

interface ContactPageProps {
  lang: 'en' | 'tr';
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const t = {
    en: {
      back: "Back",
      title: "Get in touch",
      subtitle: "Have questions about Pexify? We're here to help.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        btn: "Send Message",
        sending: "Sending...",
        success: "Message Sent!",
        successDesc: "Thank you for reaching out. We will get back to you shortly."
      },
      info: {
        title: "Contact Information",
        desc: "Fill out the form or reach us directly via email or phone.",
        emailLabel: "Email",
        officeLabel: "Office",
        phoneLabel: "Phone",
        email: "info@pexify.ai",
        phone: "+90 (212) 555 0123",
        address: "Levent, Buyukdere Cd. No:123, 34394 Sisli/Istanbul, Turkey",
        socialTitle: "Follow Us"
      }
    },
    tr: {
      back: "Geri",
      title: "İletişime Geçin",
      subtitle: "Pexify hakkında sorularınız mı var? Yardımcı olmak için buradayız.",
      form: {
        name: "Ad Soyad",
        email: "E-posta Adresi",
        subject: "Konu",
        message: "Mesajınız",
        btn: "Mesaj Gönder",
        sending: "Gönderiliyor...",
        success: "Mesaj Gönderildi!",
        successDesc: "Bizimle iletişime geçtiğiniz için teşekkürler. En kısa sürede dönüş yapacağız."
      },
      info: {
        title: "İletişim Bilgileri",
        desc: "Formu doldurun veya doğrudan e-posta ve telefon yoluyla bize ulaşın.",
        emailLabel: "E-posta",
        officeLabel: "Ofis",
        phoneLabel: "Telefon",
        email: "info@pexify.ai",
        phone: "+90 (212) 555 0123",
        address: "Levent, Büyükdere Cd. No:123, 34394 Şişli/İstanbul, Türkiye",
        socialTitle: "Bizi Takip Edin"
      }
    }
  };

  const text = t[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C1FF72] rounded-full mix-blend-multiply filter blur-[150px] opacity-5"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full mix-blend-overlay filter blur-[150px] opacity-5"></div>
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

      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Info */}
          <div className="space-y-8 lg:pr-12 animate-in fade-in slide-in-from-left-8 duration-700">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">{text.title}</h1>
              <p className="text-xl text-neutral-400">{text.subtitle}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl flex items-start gap-4 hover:border-[#C1FF72]/50 transition-colors">
                <div className="w-10 h-10 bg-[#C1FF72]/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{text.info.emailLabel}</h3>
                  <p className="text-neutral-400 text-sm">{text.info.email}</p>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl flex items-start gap-4 hover:border-[#C1FF72]/50 transition-colors">
                <div className="w-10 h-10 bg-[#C1FF72]/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{text.info.officeLabel}</h3>
                  <p className="text-neutral-400 text-sm w-3/4">{text.info.address}</p>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-neutral-800 p-6 rounded-2xl flex items-start gap-4 hover:border-[#C1FF72]/50 transition-colors">
                <div className="w-10 h-10 bg-[#C1FF72]/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C1FF72]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{text.info.phoneLabel}</h3>
                  <p className="text-neutral-400 text-sm">{text.info.phone}</p>
                </div>
              </div>
            </div>

            <div>
               <h4 className="text-white font-medium mb-4">{text.info.socialTitle}</h4>
               <div className="flex gap-4">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-[#C1FF72] hover:text-black transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-[#C1FF72] hover:text-black transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-[#C1FF72] hover:text-black transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
               </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl p-8 lg:p-10 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700">
            {isSent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#C1FF72]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#C1FF72]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{text.form.success}</h3>
                <p className="text-neutral-400 mb-8">{text.form.successDesc}</p>
                <Button onClick={() => { setIsSent(false); }} variant="outline">
                  {lang === 'tr' ? 'Yeni Mesaj Gönder' : 'Send New Message'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">{text.form.name}</label>
                    <input 
                      type="text" 
                      className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">{text.form.email}</label>
                    <input 
                      type="email" 
                      className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">{text.form.subject}</label>
                  <input 
                    type="text" 
                    className="w-full h-12 px-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">{text.form.message}</label>
                  <textarea 
                    rows={4}
                    className="w-full p-4 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-white text-sm focus:border-[#C1FF72] outline-none transition-all resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full !py-4"
                  isLoading={isLoading}
                  icon={!isLoading}
                >
                  {isLoading ? text.form.sending : text.form.btn}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
      
      {/* Footer Copyright */}
      <div className="p-6 text-center relative z-10 border-t border-neutral-900/50 mt-auto">
        <p className="text-xs text-neutral-700">© 2024 Pexify AI Inc.</p>
      </div>
    </div>
  );
};
