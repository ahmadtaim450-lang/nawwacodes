import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { motion } from "motion/react"
import { useI18n } from "@/lib/i18n"

const testimonials = [
  {
    text: "Nawwacodes delivered our SaaS dashboard ahead of schedule. The real-time analytics and clean architecture made scaling effortless.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "CTO, FinFlow — USA",
  },
  {
    text: "Unser ERP-System wurde komplett transformiert. Die Automatisierung spart uns tausende Euro monatlich.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Lukas Weber",
    role: "Geschäftsführer, LogiTech — Germany",
  },
  {
    text: "Nous avons lancé notre marketplace en 8 semaines. Une équipe réactive et un code impeccable.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Camille Moreau",
    role: "CEO, ShopLocal — France",
  },
  {
    text: "قام فريق نواة كود بتطوير نظام إدارة العيادة بالكامل — المواعيد والسجلات والفوترة. كل شيء يعمل بسلاسة.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "عمر الراشد",
    role: "المدير التقني، عيادات الشفاء — السعودية",
  },
  {
    text: "Our mobile app hit 100k downloads in 2 months. The React Native implementation was flawless.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Priya Sharma",
    role: "Founder, FitGenie — India",
  },
  {
    text: "Nawwacodes desarrolló nuestro dashboard de analíticas en tiempo récord. Código limpio, APIs robustas.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Carlos Mendoza",
    role: "CTO, DataNova — Spain",
  },
  {
    text: "منصة التجارة الإلكترونية صارت تتحمل ١٠ أضعاف الحركة بعد إعادة البناء. فريق محترف ونتائج مبهرة.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "نورة القحطاني",
    role: "المدير التنفيذي، متجر نور — الإمارات",
  },
  {
    text: "Il nostro sistema di booking gestisce 2000+ appuntamenti al giorno senza intoppi.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Marco Rossi",
    role: "Product Owner, PrenotaOra — Italy",
  },
  {
    text: "サイトのリニューアルで問い合わせが3倍に。デザインもパフォーマンスも完璧です。",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "田中 美咲",
    role: "Marketing Director, TokyoTech — Japan",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function Testimonials() {
  const { t } = useI18n()
  return (
    <section id="testimonials" className="relative py-32 bg-black overflow-hidden">
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-0 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
            <span className="text-sm text-neutral-400">{t.testimonials.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mt-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              {t.testimonials.title}
            </span>
          </h2>
          <p className="text-center mt-4 text-orange-400/80 text-lg">
            {t.testimonials.description}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  )
}
