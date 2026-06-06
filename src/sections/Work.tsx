import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'MediCare Platform',
    category: 'Healthcare System',
    description:
      'Complete hospital management system with patient portals, appointment scheduling, and real-time analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'TradeFlow Pro',
    category: 'FinTech App',
    description:
      'Real-time trading platform with live market data, portfolio tracking, and AI-powered investment insights.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['Next.js', 'WebSocket', 'Python'],
  },
  {
    title: 'EcoTrack',
    category: 'IoT Dashboard',
    description:
      'Environmental monitoring system connecting IoT sensors with a sleek dashboard for real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React Native', 'AWS', 'GraphQL'],
  },
  {
    title: 'ShopFlow',
    category: 'E-Commerce',
    description:
      'Headless commerce platform with custom CMS, inventory management, and multi-currency payment processing.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['Next.js', 'Stripe', 'Redis'],
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-500">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 z-20">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 space-y-3">
          <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase">
            {project.category}
          </span>
          <h3 className="text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Work() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <p className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Selected work
            </span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            A glimpse into the products we've engineered. Each project is a story of
            problem-solving and pixel-perfect execution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-white hover:bg-white/[0.05] transition-all duration-300">
            View all projects
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
