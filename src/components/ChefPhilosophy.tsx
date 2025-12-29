import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import chefPortrait from '/Amardeep Singh.jpg';

const ChefPhilosophy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        style={{ y }}
        className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side with depth effect */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              style={{ scale: imageScale }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden elegant-shadow group">
                <motion.img
                  src={chefPortrait}
                  alt="Executive Chef Amardeep Singh"
                  className="w-full h-[700px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Gold overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent"
                  transition={{ duration: 0.5 }}
                />

                {/* Gold border */}
                <div className="absolute inset-0 border-4 border-accent/30 rounded-3xl group-hover:border-accent/50 transition-all duration-500 gold-glow" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-8 -right-8 glass-effect rounded-2xl p-6 gold-glow"
              >
                <p className="text-accent text-sm font-semibold mb-1">Est.</p>
                <p className="text-4xl font-playfair font-bold text-foreground">2015</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.p
              className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Meet the Visionary
            </motion.p>
            
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-luxury mb-6">
              Chef's Philosophy
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 mb-8"
            >
              <p className="text-xl text-muted-foreground leading-relaxed italic">
                "Cooking is not just about feeding the body; it's about nourishing the soul. Every dish we create 
                is a bridge between two worlds—the ancient traditions of Punjab and the innovative spirit of Australia."
              </p>

              <p className="text-lg text-foreground/90 leading-relaxed">
                <span className="text-accent font-semibold">Chef Amardeep Singh</span>, our Executive Chef, brings over 20 years 
                of culinary mastery to High Spirit. Trained in the royal kitchens of Jaipur and refined through experience 
                at Michelin-starred restaurants across Europe, Chef Amardeep's approach is a harmonious blend of respect 
                for heritage and fearless innovation.
              </p>

              <p className="text-lg text-foreground/90 leading-relaxed">
                His philosophy is simple yet profound: use the finest seasonal ingredients, honor traditional techniques, 
                and present each dish as a work of art. Every element on the plate serves a purpose—to create balance, 
                evoke emotion, and tell a story of cultural fusion.
              </p>

              <p className="text-lg text-foreground/90 leading-relaxed">
                At High Spirits, we don't just serve food. We craft experiences that linger in memory, spark conversation, 
                and celebrate the beauty of two rich culinary traditions meeting on a single plate.
              </p>
            </motion.div>

            {/* Animated signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <motion.svg
                width="250"
                height="100"
                viewBox="0 0 250 100"
                className="text-accent"
              >
                <motion.path
                  d="M 10 50 Q 50 20, 100 50 T 190 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.text
                  x="10"
                  y="80"
                  className="font-playfair italic"
                  fill="currentColor"
                  fontSize="20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2 }}
                >
                  Amardeep Singh
                </motion.text>
              </motion.svg>
              <p className="text-sm text-muted-foreground mt-2">Executive Chef & Co-Founder</p>
            </motion.div>

            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 pt-10 border-t border-accent/20"
            >
              <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Accolades</h3>
              <ul className="space-y-2">
                {[
                  "Chef of the Year 2020 - Australian Culinary Federation",
                  "Michelin Guide Featured 2022",
                  "Best Indian Restaurant - Gourmet Traveller 2023",
                  "Top 50 Chefs in Australia - Food & Wine Magazine"
                ].map((award, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 gold-glow" />
                    {award}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChefPhilosophy;
