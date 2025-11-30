import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { analyzeDocumentText } from '../services/geminiService';
import { AlertCircle, CheckCircle, FileText, ScanLine, Loader2 } from 'lucide-react';

const DEFAULT_TEXT_EN = `INVOICE NO: EXP-2024-001
DATE: 2024-02-30  <-- (Invalid Date)
BUYER: GLOBAL TEXTILES LLC
ITEM: 100% COTTON YARN
QUANTITY: 5000 KGS
NET WEIGHT: 5100 KGS <-- (Net > Gross impossible)
GROSS WEIGHT: 5000 KGS
`;

const DEFAULT_TEXT_TR = `FATURA NO: EXP-2024-001
TARİH: 30.02.2024  <-- (Geçersiz Tarih)
ALICI: GLOBAL TEXTILES LLC
ÜRÜN: %100 PAMUK İPLİĞİ
MİKTAR: 5000 KG
NET AĞIRLIK: 5100 KG <-- (Net > Brüt olamaz)
BRÜT AĞIRLIK: 5000 KG
`;

interface LiveDemoProps {
  lang: 'en' | 'tr';
}

export const LiveDemo: React.FC<LiveDemoProps> = ({ lang }) => {
  const [input, setInput] = useState(DEFAULT_TEXT_EN);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Update default text when language changes, only if user hasn't typed significantly
  useEffect(() => {
    if (lang === 'tr' && input === DEFAULT_TEXT_EN) {
      setInput(DEFAULT_TEXT_TR);
    } else if (lang === 'en' && input === DEFAULT_TEXT_TR) {
      setInput(DEFAULT_TEXT_EN);
    }
  }, [lang]);

  const t = {
    en: {
      title: "See Pexify in Action",
      subtitle: "Click the Analyze Document button to instantly detect discrepancies.",
      poweredBy: "Powered by Gemini 2.5 Flash",
      docLabel: "Document Text",
      placeholder: "Enter Gemini API Key (Optional)",
      analyzeBtn: "Analyze Document",
      scanning: "Scanning...",
      reportLabel: "Analysis Report",
      systemActive: "SYSTEM_ACTIVE",
      processing: "PROCESSING NODES...",
      ready: "Ready to verify.",
      status: "Status",
      risk: "RISK DETECTED",
      passed: "PASSED",
      noIssues: "No inconsistencies found.",
      demoResult: {
        issues: [
          "Invalid Date detected: 2024-02-30 (February does not have 30 days).",
          "Logic Error: Net Weight (5100 KGS) cannot be greater than Gross Weight (5000 KGS)."
        ]
      },
      errorApiKey: "Analysis failed. Please check your API key."
    },
    tr: {
      title: "Pexify'ı İş Başında Görün",
      subtitle: "Tutarsızlıkları anında tespit etmek için Belgeyi Analiz Et butonuna tıklayın.",
      poweredBy: "Gemini 2.5 Flash ile güçlendirilmiştir",
      docLabel: "Belge Metni",
      placeholder: "Gemini API Anahtarı Girin (Opsiyonel)",
      analyzeBtn: "Belgeyi Analiz Et",
      scanning: "Taranıyor...",
      reportLabel: "Analiz Raporu",
      systemActive: "SİSTEM_AKTİF",
      processing: "VERİLER İŞLENİYOR...",
      ready: "Doğrulamaya hazır.",
      status: "Durum",
      risk: "RİSK TESPİT EDİLDİ",
      passed: "GEÇTİ",
      noIssues: "Herhangi bir tutarsızlık bulunamadı.",
      demoResult: {
        issues: [
          "Geçersiz Tarih tespit edildi: 30.02.2024 (Şubat 30 çekmez).",
          "Mantık Hatası: Net Ağırlık (5100 KG), Brüt Ağırlıktan (5000 KG) büyük olamaz."
        ]
      },
      errorApiKey: "Analiz başarısız. Lütfen API anahtarınızı kontrol edin."
    }
  };

  const text = t[lang];

  const handleAnalyze = async () => {
    if (!apiKey) {
      // Fallback for demo purposes
      setLoading(true);
      setTimeout(() => {
        setResult(text.demoResult);
        setLoading(false);
      }, 1500);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const jsonResponse = await analyzeDocumentText(apiKey, input);
      setResult(JSON.parse(jsonResponse));
    } catch (err) {
      setError(text.errorApiKey);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="live-demo" className="py-24 bg-[#0A0A0A] border-y border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,255,114,0.03),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-normal">
            {lang === 'en' ? (
              <>See <span className="text-[#C1FF72]">Pexify</span> in Action</>
            ) : (
              <>
                Pexify Nasıl Çalışıyor?
                <span className="text-[#C1FF72] block mt-6">İşte Cevabı</span>
              </>
            )}
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {text.subtitle}
            <br />
            <span className="text-xs text-neutral-600 uppercase tracking-widest mt-2 block">{text.poweredBy}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Side */}
          <div className="bg-black border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-white">
                <FileText className="w-5 h-5 text-[#C1FF72]" />
                <span className="font-medium">{text.docLabel}</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">OCR_RAW_DATA</span>
            </div>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 bg-[#0F0F0F] border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300 font-mono focus:border-[#C1FF72] focus:ring-1 focus:ring-[#C1FF72] outline-none resize-none transition-colors"
            />

            <div className="mt-6 space-y-4">
              <input 
                type="password" 
                placeholder={text.placeholder}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-transparent border-b border-neutral-800 p-2 text-sm text-white focus:border-[#C1FF72] outline-none placeholder-neutral-700 transition-colors"
              />
              <Button 
                onClick={handleAnalyze} 
                isLoading={loading} 
                className="w-full"
                icon
              >
                {loading ? text.scanning : text.analyzeBtn}
              </Button>
            </div>
          </div>

          {/* Output Side */}
          <div className="bg-[#0F0F0F] border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl h-full min-h-[400px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-white">
                <ScanLine className="w-5 h-5 text-[#C1FF72]" />
                <span className="font-medium">{text.reportLabel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#C1FF72] rounded-full animate-pulse"></span>
                <span className="text-xs text-[#C1FF72] font-mono">{text.systemActive}</span>
              </div>
            </div>

            <div className="flex-grow border border-dashed border-neutral-800 rounded-lg p-6 relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F0F]/80 backdrop-blur-sm z-20">
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#C1FF72] animate-spin mx-auto mb-4" />
                    <p className="text-neutral-500 text-sm font-mono">{text.processing}</p>
                  </div>
                </div>
              )}

              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-neutral-600">
                  <ScanLine className="w-12 h-12 mb-4 opacity-20" />
                  <p>{text.ready}</p>
                </div>
              )}

              {result && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <span className="text-sm text-neutral-400">{text.status}</span>
                    <span className={`text-sm font-bold ${result.issues?.length > 0 ? 'text-red-500' : 'text-[#C1FF72]'}`}>
                      {result.issues?.length > 0 ? text.risk : text.passed}
                    </span>
                  </div>

                  {result.issues?.length > 0 ? (
                    <div className="space-y-3">
                      {result.issues.map((issue: string, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-red-500/5 border border-red-500/20 rounded-md">
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-200">{issue}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-12">
                        <CheckCircle className="w-16 h-16 text-[#C1FF72] mb-4" />
                        <p className="text-white">{text.noIssues}</p>
                     </div>
                  )}
                </div>
              )}
              
              {error && (
                 <div className="p-4 bg-red-900/20 border border-red-900 rounded text-red-400 text-sm">
                    {error}
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};