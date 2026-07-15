import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import agfgBadge from '@/assets/agfg-award-badge.png';

const AwardSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const floatingStars = Array.from({ length: 6 });

  return (
    <section
      ref={ref}
      id="award-section"
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-label="Award Recognition"
    >
      {/* Deep luxurious background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160,70%,6%)] via-[hsl(160,60%,10%)] to-[hsl(42,30%,8%)]" />

      {/* Animated golden radial glow behind badge */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse,_hsla(42,78%,51%,0.18)_0%,_transparent_70%)]" />
      </motion.div>

      {/* Floating star particles */}
      {floatingStars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${15 + (i * 13) % 75}%`,
            left: `${5 + (i * 17) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.6, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          <Star className="w-3 h-3 text-accent fill-accent" />
        </motion.div>
      ))}

      {/* Decorative top border line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Eyebrow label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-accent/50" />
          <Trophy className="w-5 h-5 text-accent" />
          <p className="text-accent font-inter tracking-[0.25em] uppercase text-xs sm:text-sm font-medium">
            Award Recognition
          </p>
          <Trophy className="w-5 h-5 text-accent" />
          <div className="h-px w-12 bg-accent/50" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="text-center font-playfair font-bold shimmer-text text-[clamp(2rem,5vw,3.8rem)] leading-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Excellence Recognised
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          We are honoured to be chosen by the Australian public as a standout dining destination, celebrating the very best in food and hospitality.
        </motion.p>

        {/* Award card */}
        <div className="flex justify-center">
          <motion.div
            className="relative max-w-3xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          >
            {/* Glowing card backdrop */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/30 via-amber-400/10 to-accent/20 blur-xl opacity-80" />

            <div className="relative glass-effect rounded-3xl border border-accent/30 p-8 sm:p-12 overflow-hidden">
              {/* Inner shimmer top strip */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                {/* Badge image */}
                <motion.div
                  className="relative flex-shrink-0"
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Gold halo ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      background: 'radial-gradient(circle, hsla(42,78%,51%,0.25) 0%, transparent 70%)',
                    }}
                  />
                  <img
                    src={agfgBadge}
                    alt="AGFG Readers' Choice Winner 2026 Award Badge"
                    className="w-40 h-40 sm:w-52 sm:h-52 object-contain drop-shadow-[0_0_30px_hsla(42,78%,51%,0.6)] relative z-10"
                  />
                </motion.div>

                {/* Award info */}
                <div className="flex-1 text-center md:text-left">
                  {/* Award organisation name */}
                  <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-5">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-accent text-xs sm:text-sm font-inter font-semibold tracking-wider uppercase">
                      Australian Good Food Guide
                    </span>
                  </div>

                  <h3 className="font-playfair font-bold text-luxury text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
                    Readers' Choice<br />Winner 2026
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                    High Spirits has been awarded the prestigious <strong className="text-foreground">AGFG Readers' Choice 2026</strong> — voted by the Australian public as one of the country's finest dining establishments. This recognition reflects our unwavering commitment to authentic Indian cuisine, warm hospitality, and an unforgettable dining experience in Bunbury, WA.
                  </p>

                  {/* Stars row */}
                  <div className="flex items-center gap-1.5 justify-center md:justify-start mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      >
                        <Star className="w-6 h-6 fill-accent text-accent" />
                      </motion.div>
                    ))}
                    <span className="ml-2 text-muted-foreground text-sm font-inter">Voted by the Australian public</span>
                  </div>

                  {/* Stat pills */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {[
                      { label: 'Category', value: "Readers' Choice" },
                      { label: 'Year', value: '2026' },
                      { label: 'Region', value: 'Bunbury, WA' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center bg-accent/10 border border-accent/20 rounded-xl px-4 py-2.5 min-w-[90px]"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                      >
                        <span className="text-accent font-playfair font-bold text-base sm:text-lg leading-none">
                          {item.value}
                        </span>
                        <span className="text-muted-foreground font-inter text-[10px] sm:text-xs tracking-wide mt-1 uppercase">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.p
          className="text-center text-muted-foreground/60 text-sm italic mt-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          "A testament to our passion for authentic Indian flavours, crafted with love for Bunbury."
        </motion.p>
      </div>
    </section>
  );
};

export default AwardSection;
