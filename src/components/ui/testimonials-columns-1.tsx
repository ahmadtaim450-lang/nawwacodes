"use client"
import { Fragment } from "react"
import { motion } from "motion/react"

type Testimonial = {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm max-w-xs w-full"
                key={i}
              >
                <p className="text-sm text-neutral-300 leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-white text-sm">
                      {name}
                    </div>
                    <div className="leading-5 text-neutral-500 text-xs tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}
