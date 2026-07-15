import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const AccoladesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const items = [
    {
      type: 'image',
      iconSrc: 'https://media1.agfg.com.au/images/rcawards/2026-media/badge.png',
      value: 'Winner 2026',
      label: "AGFG Readers' Choice",
      link: 'https://www.agfg.com.au/restaurant/high-spirits-82604',
      bgGlow: 'from-red-500/20 to-accent/5',
    },
    {
      type: 'svg',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
        </svg>
      ),
      value: 'Order Online',
      label: 'Delivery via Uber Eats',
      link: 'https://www.ubereats.com/au/store/high-spirits-indian-restaurant/XWZcSeKdV4Snw8JDlsLpyw?srsltid=AfmBOoqDkIjATvnqSw62LIyW79vJxVq4ITFZ9FvZiEdch4Wrh-OIjXXg',
      bgGlow: 'from-emerald-500/20 to-accent/5',
    },
    {
      type: 'svg',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-4.5 13.5A2.5 2.5 0 0 1 5 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5zm4.5-5.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm4.5 5.25A2.5 2.5 0 0 1 14 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5z"/>
        </svg>
      ),
      value: 'TripAdvisor',
      label: 'Read Guest Reviews',
      link: 'https://www.tripadvisor.com/Restaurant_Review-g255364-d34217398-Reviews-High_Spirits-Bunbury_Western_Australia.html',
      bgGlow: 'from-green-500/20 to-accent/5',
    },
    {
      type: 'svg',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z"/>
        </svg>
      ),
      value: '5.0 Rating',
      label: 'Google Reviews & Rating',
      link: 'https://www.google.com/search?sca_esv=fba96cc439ef8eac&rlz=1C1MIZP_en-GBIN1164IN1165&sxsrf=APpeQnvIXK_5WTiDpeDTRvFhNm7obNKBiQ%3A1784098044445&q=High%20Spirits%20%E2%80%93%20Bunbury%E2%80%99s%20Luxury%20Indian%20Fine%20Dining&stick=H4sIAAAAAAAAAONgU1I1qDBKNEo1TLE0M7RMskxLNTC1AgoZmZimGRpYpqaZmFimGBksYjXzyEzPUAguyCzKLClWeNQwWcGpNC-ptKjyUcPMYgWf0gogU8EzLyUzMU_BLTMvVcElMy8zLx0ANr0yhWIAAAA&mat=CTnHQKHaJECX&ved=2ahUKEwjQ1LuRi9SVAxWxd2wGHfW2NWsQrMcEegQIMxAC',
      bgGlow: 'from-blue-500/20 to-accent/5',
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-accent font-inter tracking-[0.2em] mb-3 uppercase text-xs sm:text-sm font-semibold">
            Recognitions & Partners
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-luxury leading-tight">
            Our Accolades & Online Portals
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-3">
            Explore our verified credentials, read dining reviews, or order directly to your door.
          </p>
        </motion.div>

        {/* 4-Column Grid matching Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              className="group relative h-full"
            >
              {/* Backglow element matching the card's specific glow style */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-center glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-accent/15 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center h-full block cursor-pointer"
              >
                {/* Circular Icon Container */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-accent/25 to-accent/5 mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 relative shadow-inner">
                  {item.type === 'image' ? (
                    <img 
                      src={item.iconSrc} 
                      alt={item.value} 
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full bg-white/10 p-0.5"
                    />
                  ) : (
                    item.svgIcon
                  )}
                  {/* Subtle external link indicator on hover */}
                  <div className="absolute -top-1 -right-1 bg-accent/90 text-accent-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

                {/* Main Heading Text */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent mb-2 sm:mb-3">
                  {item.value}
                </h3>

                {/* Subtitle / Description Text */}
                <p className="text-muted-foreground font-inter text-xs sm:text-sm tracking-wide leading-snug">
                  {item.label}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
};

export default AccoladesSection;
