import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  RefreshCw,
  Sliders,
  Check,
  AlertCircle,
  Eye,
  Maximize2,
} from 'lucide-react';

export const VisualGeneratorTab: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'سُور مدينة براقش الأثرية البيضاوي وأبراجه الـ 57 المشيدة بالحجارة الجيرية المهندمة والمصقولة بدقة فائقة في وادي الخارد باليمن، مظهر تاريخي واقعي'
  );
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const presetPrompts = [
    {
      label: 'فارس يماني وراية خضراء (غلاف ج1 • الوحدة 7)',
      text: 'فارس عربي يماني شجاع ممتطٍ جواداً أصيلاً رافعاً راية خضراء كُتب عليها بخط عربي أصيل «من أحب الحياة عاش ذليلاً» في سهول وجبال اليمن تحت سماء وضاءة',
      ratio: '16:9',
    },
    {
      label: 'المدرجات الزراعية وغيث اليمن (ج1 • الوحدة 4)',
      text: 'منظر بانورامي أخاذ للمدرجات الجبلية الخضراء في اليمن ممتلئة بمياه الأمطار والغيوم المتلبدة تروي حقول البن والقمح في مدرجات شاهقة',
      ratio: '16:9',
    },
    {
      label: 'موكب التلاميذ ونور التعليم (ج1 • الوحدة 11)',
      text: 'موكب مهيب لأطفال المدارس في اليمن حاملين حقائبهم ودفاترهم يتجهون نحو مدرسة تاريخية عريقة تشرق عليها شمس الصباح مفعمة بالأمل والضياء',
      ratio: '4:3',
    },
    {
      label: 'مدينة براقش وسورها (ج2 • الوحدة 18)',
      text: 'سُور مدينة براقش الأثرية البيضاوي وأبراجه الـ 57 المشيدة بالحجارة الجيرية المهندمة والمصقولة بدقة فائقة في وادي الخارد باليمن، مظهر تاريخي واقعي شمس الصباح',
      ratio: '16:9',
    },
    {
      label: 'المصندقات وزخرفة المساجد (ج2 • الوحدة 19)',
      text: 'المصندقات الخشبية المزخرفة بالحفر والدهانات الملونة النباتية والهندسية في سقف الجامع الكبير بصنعاء أو مساجد شبام كوكبان التراثية في اليمن',
      ratio: '1:1',
    },
    {
      label: 'قصيدة النخلة الحمقاء (ج2 • الوحدة 16)',
      text: 'لوحة فنية معبرة لقصيدة النخلة الحمقاء لإيليا أبو ماضي: نخلة يابسة كالحة عارية كالوتد الحجري وسط بستان ربيعي ممتلئ بالأشجار الخضراء المكسوة بالزهور',
      ratio: '4:3',
    },
    {
      label: 'الفضاء الخارجي والمجرات (ج2 • الوحدة 23)',
      text: 'منظر علمي بديع للفضاء الخارجي الشاسع والمجرات الحلزونية اللامعة مع ثقب أسود ذي جاذبية هائلة وقرص متوهج من الغازات وفق وصف المنهج المدرسي',
      ratio: '16:9',
    },
    {
      label: 'جمال الخط العربي واللغة الخالدة (ج1 • الوحدة 12)',
      text: 'لوحة فنية إسلامية لحروف اللغة العربية وكلمات لغة الضاد بالخط الكوفي وخط الثلث على خلفية من الزخارف النباتية والتذهيب العربي الأصيل',
      ratio: '16:9',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size: imageSize,
          aspectRatio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل في توليد الصورة.');
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        throw new Error('لم يتم استرجاع الصورة من النموذج.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'حدث خطأ أثناء معالجة الصورة.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `yemen-curriculum-${imageSize.toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                النموذج المعتمد: gemini-3-pro-image-preview
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                دقة عالية: 1K / 2K / 4K
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              توليد الوسائل التعليمية البصرية والرسوم التوضيحية للمنهج
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              أداة متخصصة لتوليد صور ورسوم توضيحية فائقة الدقة لدروس التاريخ، الآثار، الزخرفة، الفضاء، والشعر في كتاب لغتي العربية للصف التاسع.
            </p>
          </div>
        </div>

        {/* Preset Prompt Chips */}
        <div>
          <span className="text-xs font-bold text-slate-600 block mb-2">
            نماذج ومقترحات سريعة مستوحاة من محتوى الكتاب:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p.text);
                  setAspectRatio(p.ratio);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 text-xs font-semibold transition-all text-right"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          {/* Prompt textarea */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              وصف المشهد أو الوسيلة التعليمية:
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب وصفاً دقيقاً للمشهد التعليمي الذي تريد توليده..."
              className="w-full p-3 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 bg-slate-50 leading-relaxed"
            />
          </div>

          {/* Image Size Affordance (1K, 2K, 4K) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              دقة وحجم الصورة المطلوب (Affordance: 1K / 2K / 4K):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['1K', '2K', '4K'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setImageSize(size)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-black transition-all flex flex-col items-center gap-0.5 ${
                    imageSize === size
                      ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{size}</span>
                  <span className={`text-[10px] font-normal ${imageSize === size ? 'text-amber-100' : 'text-slate-400'}`}>
                    {size === '1K' ? 'قياسي (1024)' : size === '2K' ? 'عالي (2048)' : 'فائق (4096)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              نسبة الأبعاد (Aspect Ratio):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { id: '1:1', label: 'مربع (1:1)' },
                { id: '16:9', label: 'عريض (16:9)' },
                { id: '4:3', label: 'كلاسيكي (4:3)' },
                { id: '3:4', label: 'عمودي (3:4)' },
                { id: '9:16', label: 'طولي (9:16)' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAspectRatio(r.id)}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    aspectRatio === r.id
                      ? 'bg-slate-900 border-slate-900 text-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className={`w-full py-3 px-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              isLoading
                ? 'bg-amber-400 text-slate-900 cursor-wait'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>جاري توليد الصورة بدقة {imageSize} عبر gemini-3-pro-image-preview...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>توليد الوسيلة البصرية الآن ({imageSize})</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5">خطأ في التوليد:</strong>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Display / Preview Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              معاينة الوسيلة التعليمية المولدة
            </h3>
            {generatedImage && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(true)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="تكبير"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الصورة ({imageSize})</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center min-h-[380px] bg-slate-50 rounded-xl border border-dashed border-slate-200 overflow-hidden relative">
            {isLoading ? (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">
                  يقوم نموذج gemini-3-pro-image-preview برسم الصورة
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  يتم معالجة المشهد التعليمي بدقة {imageSize} ونسبة أبعاد {aspectRatio}...
                </p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated educational visual"
                className="max-h-[500px] w-auto object-contain rounded-lg shadow-sm"
              />
            ) : (
              <div className="text-center p-8 space-y-2 text-slate-400">
                <ImageIcon className="w-16 h-16 mx-auto stroke-1" />
                <p className="text-xs md:text-sm font-semibold">
                  اختر أحد القوالب أو اكتب وصفاً ثم انقر «توليد الوسيلة البصرية»
                </p>
                <p className="text-[11px] text-slate-400">
                  مدعوم بتقنية الذكاء الاصطناعي وبدقات 1K و 2K و 4K
                </p>
              </div>
            )}
          </div>

          {generatedImage && (
            <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span><strong>الدقة المختارة:</strong> {imageSize}</span>
              <span><strong>نسبة العرض:</strong> {aspectRatio}</span>
              <span><strong>النموذج:</strong> gemini-3-pro-image-preview</span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && generatedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={generatedImage}
              alt="Zoomed"
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 left-3 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              إغلاق [X]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
