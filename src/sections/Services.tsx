import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe, Smartphone, Palette, Server, TrendingUp,
  Lightbulb, Megaphone, Share2, ShoppingBag, Webhook,
  Cloud, Wrench, Search, Bot, Code2, X,
} from 'lucide-react'
import { EvervaultCard } from '@/components/ui/evervault-card'
import { useI18n } from '@/lib/i18n'

const servicesData = [
  { icon: Globe, tags: ['React', 'Next.js', 'TypeScript'] },
  { icon: Code2, tags: ['Node.js', 'PostgreSQL', 'REST APIs'] },
  { icon: Smartphone, tags: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { icon: Palette, tags: ['Figma', 'Prototyping', 'Design Systems'] },
  { icon: Server, tags: ['ERP', 'CRM', 'Dashboards', 'Automation'] },
  { icon: TrendingUp, tags: ['Analytics', 'SEO', 'PPC', 'Content'] },
  { icon: Lightbulb, tags: ['Strategy', 'Planning', 'Research'] },
  { icon: Megaphone, tags: ['Google Ads', 'Meta Ads', 'TikTok Ads'] },
  { icon: Share2, tags: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'] },
  { icon: ShoppingBag, tags: ['Shopify', 'Stripe', 'WooCommerce'] },
  { icon: Webhook, tags: ['REST', 'GraphQL', 'Webhooks', 'Microservices'] },
  { icon: Cloud, tags: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
  { icon: Wrench, tags: ['Monitoring', 'Updates', 'Bug Fixes', '24/7'] },
  { icon: Search, tags: ['On-Page SEO', 'Core Web Vitals', 'Speed Optimization'] },
  { icon: Bot, tags: ['Chatbots', 'ML', 'Process Automation', 'AI Agents'] },
]

function ServiceCard({
  item,
  index,
}: {
  item: { title: string; description: string; benefit: string; icon: any; tags: string[] }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: 80, y: 60 }}
      animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer"
    >
      <div style={{ perspective: "1200px" }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" as any }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: "hidden" }}>
            <EvervaultCard className="min-h-[340px]">
            <div className="p-6 w-full space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-white">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-2 p-3 rounded-xl bg-black/60 border border-white/10">
                <h3 className="text-lg font-semibold text-white leading-tight">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">{item.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-[11px] rounded-full bg-black/60 border border-white/10 text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-neutral-600 text-center">Click to read more</p>
            </div>
          </EvervaultCard>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl bg-black/90 border border-white/[0.06] backdrop-blur-xl flex flex-col"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" } as any}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
                className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-5 flex items-center justify-center text-center overflow-auto">
              <p className="text-sm text-neutral-300 leading-relaxed font-medium uppercase tracking-wide">
                {item.benefit}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const items = servicesData.map((s, i) => ({
    ...s,
    title: t.servicesItems[i].title,
    description: t.servicesItems[i].description,
    benefit: t.servicesItems[i].benefit,
  }))

  return (
    <section id="services" ref={ref} className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <p className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase">
            {t.services.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              {t.services.title}
            </span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            {t.services.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
