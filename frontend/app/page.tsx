import { 
  ArrowRight, 
  Plane, 
  Smartphone, 
  Zap, 
  Leaf, 
  Heart, 
  Sparkles, 
  Quote, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import Header from "./components/Header";
import TeamPhotos from "./components/TeamPhotos";
import MenuButton from "./components/MenuButton";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0077B6] font-sans selection:bg-[#0077B6]/10 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E2EAFC] to-[#E0F2FE] opacity-60 blur-[130px] transition-transform duration-1000 ease-out"
        />
        <div 
          className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#0077B6]/5 via-[#BBC2E2]/10 to-transparent blur-[160px] transition-transform duration-1000 ease-out"
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-[#E0F2FE]/40 blur-[120px]"
          style={{
            bottom: "10%",
            left: "20%"
          }}
        />
      </div>

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-28 relative z-10 space-y-32">
        <section className="text-center space-y-8 max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#BBC2E2]/40 shadow-sm backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#005B8C] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#005B8C]">
              Простір твого спокою
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#003459] leading-[1.15]">
            Вітаємо в <span className="bg-gradient-to-r from-[#0077B6] via-[#005B8C] to-[#003459] bg-clip-text text-transparent drop-shadow-sm">MindKey</span>
          </h1>

          <p className="font-medium text-[#005B8C]/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Чай — це не просто напій. Правильний чай — це заряд енергії на весь день,
            хороший настрій та ваше здоров'я.
          </p>

          <div className="relative bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/80 shadow-xl shadow-[#0077B6]/5 max-w-2xl mx-auto group hover:shadow-2xl hover:border-[#0077B6]/20 transition-all duration-500 text-left">
            <div className="absolute top-6 right-8 text-[#BBC2E2]/40 group-hover:text-[#0077B6]/20 transition-colors duration-500">
              <Quote className="w-12 h-12 transform rotate-180" />
            </div>

            <span className="text-xs font-bold tracking-widest uppercase text-[#0077B6]/60 block mb-3">
              Давня мудрість
            </span>

            <div className="space-y-4 text-[#003459]/80 font-light leading-relaxed text-base md:text-lg">
              <p>
                Одного разу учень запитав майстра: <span className="italic font-medium text-[#005B8C]">«В чому секрет вашого внутрішнього спокою? Навколо стільки метушні, а ви завжди незворушні».</span>
              </p>
              <p>
                Майстр мовчки посміхнувся, налив у чашку гарячої води і кинув туди кілька чайних листочків. Вони почали хаотично кружляти в окропі.
              </p>
              <p className="font-serif italic bg-[#0077B6]/5 p-4 rounded-xl border-l-4 border-[#0077B6] text-[#43555e]">
                «Дивись, — сказав майстер, — спочатку чайне листя бунтує та кидається з боку в бік. Але якщо дати йому трою часу і просто побути в тиші — воно опускається на дно, віддаючи воді свій справжній смак. Твій розум — як цей чай. Дай йому хвилинку спокою, і ти побачиш істину».
              </p>
            </div>
          </div>

          <MenuButton />
        </section>

        <section className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0077B6]/5 to-[#BBC2E2]/5 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative bg-white/70 backdrop-blur-md border border-white rounded-3xl p-8 md:p-14 shadow-xl shadow-slate-200/50 grid md:grid-cols-5 gap-12 items-center overflow-hidden">
            <div className="space-y-5 md:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0077B6]/10 text-[#005B8C] text-xs font-bold tracking-wider uppercase">
                Smart-Сервіс
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] tracking-tight">
                Швидко. Сучасно. <span className="text-[#0077B6]">Без черг.</span>
              </h2>
              <p className="text-[#003459]/70 text-lg font-light leading-relaxed">
                Ми поєднали традиції чаювання з технологіями сьогодення. Коли ви робите замовлення на сайті,
                наші бариста миттєво отримують його прямо у свій <span className="font-semibold text-[#005B8C] bg-[#0077B6]/5 px-1.5 py-0.5 rounded">Telegram-чат</span>.
              </p>
              <p className="text-sm text-[#0077B6]/60">
                ✦ Жодного галасу чи очікування — лише чистий дзен і гарячий чай точно вчасно.
              </p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-[#003459] to-[#0077B6] text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-lg shadow-[#005B8C]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
              
              <div className="flex items-center justify-center gap-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm w-full border border-white/10 shadow-inner">
                <Smartphone className="w-6 h-6 text-cyan-300 animate-bounce" /> 
                <ArrowRight className="w-4 h-4 text-white/50" /> 
                <div className="relative">
                  <Plane className="w-6 h-6 text-white transform rotate-45 animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-bold text-lg tracking-wide">Сайт → Telegram Бариста</h4>
                <p className="text-xs text-cyan-100/70 max-w-xs font-light">
                  Замовлення обробляється автоматично за допомогою нашого розумного бота.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] tracking-tight">
              Наші Майстри Свідомості
            </h2>
            <p className="text-[#0077B6]/70 text-lg font-light max-w-xl mx-auto">
              Команда MindKey — це не просто персонал. Це провідники у світ внутрішнього спокою та смаку.
            </p>
          </div>
          
          <TeamPhotos />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 space-y-5 hover:shadow-xl hover:shadow-[#0077B6]/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#0077B6]/5 text-[#0077B6] flex items-center justify-center text-2xl group-hover:bg-[#0077B6] group-hover:text-white transition-all duration-300 shadow-inner">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#003459] group-hover:text-[#0077B6] transition-colors">
                Чайні Сомельє
              </h3>
              <p className="text-sm text-[#003459]/70 font-light leading-relaxed">
                Дбайливо відбирають листя на плантаціях та створюють авторські заспокійливі купажі для вашого фокусу.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 space-y-5 hover:shadow-xl hover:shadow-[#0077B6]/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#0077B6]/5 text-[#0077B6] flex items-center justify-center text-2xl group-hover:bg-[#0077B6] group-hover:text-white transition-all duration-300 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#003459] group-hover:text-[#0077B6] transition-colors">
                Tech-Бариста
              </h3>
              <p className="text-sm text-[#003459]/70 font-light leading-relaxed">
                Майстри, які приймають ваше замовлення з Telegram за секунди і заварюють його з аптечною точністю температури.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 space-y-5 hover:shadow-xl hover:shadow-[#0077B6]/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#0077B6]/5 text-[#0077B6] flex items-center justify-center text-2xl group-hover:bg-[#0077B6] group-hover:text-white transition-all duration-300 shadow-inner">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#003459] group-hover:text-[#0077B6] transition-colors">
                Амбасадори Дзену
              </h3>
              <p className="text-sm text-[#003459]/70 font-light leading-relaxed">
                Створюють у MindKey атмосферу, куди хочеться повертатися після важких релізів чи довгих робочих зумів.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}