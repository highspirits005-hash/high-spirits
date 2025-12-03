import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VideoBackground from "./VideoBackground";

/* IMAGES FOR SLIDER */
import restaurantAmbience from "@/assets/image.jpg";
import img2 from "@/assets/image2.jpg";
import img3 from "@/assets/image3.jpg";
import img4 from "@/assets/image4.jpg";

const AmbienceTour = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const sliderImages = [restaurantAmbience, img2, img3, img4];

  const spaces = [
    {
      title: "Main Dining Hall",
      description:
        "An opulent 120-seat space featuring soaring ceilings, crystal chandeliers, and floor-to-ceiling windows overlooking Melbourne's skyline.",
      capacity: "120 guests",
    },
    {
      title: "Private Wine Room",
      description:
        "Intimate 16-seat glass-enclosed room surrounded by our 500+ bottle collection, perfect for exclusive gatherings.",
      capacity: "16 guests",
    },
    {
      title: "Chef's Table",
      description:
        "An exclusive 8-seat counter offering front-row views of our kitchen brigade at work, with personalized culinary commentary.",
      capacity: "8 guests",
    },
    {
      title: "Terrace Lounge",
      description:
        "Sophisticated outdoor space with lush greenery, ambient lighting, and panoramic city views—ideal for pre-dinner cocktails.",
      capacity: "40 guests",
    },
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <VideoBackground overlayOpacity={0.7} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div style={{ opacity }} className="text-center mb-20">
          <motion.p
            className="text-accent tracking-widest mb-4 uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Step Inside
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6">
            Luxury Ambience & Interior
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where contemporary elegance meets timeless sophistication
          </p>
        </motion.div>

        {/* === 🔥 PARALLAX IMAGE SLIDER === */}
        <motion.div
          style={{ y, scale }}
          className="relative max-w-6xl mx-auto mb-20 rounded-3xl overflow-hidden elegant-shadow"
        >
          <motion.div className="relative h-[600px] group overflow-hidden rounded-3xl">
            {/* Slider Container */}
            <motion.div
              className="flex h-full"
              animate={{
                x: ["0%", "-100%", "-200%", "-300%", "0%"], // Loop through slides
              }}
              transition={{
                duration: 40, // ⬅️ SLOWER SPEED ADDED HERE
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {sliderImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="w-full h-[600px] object-cover flex-shrink-0"
                  alt={`slide-${index}`}
                />
              ))}
            </motion.div>

            {/* Light shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ transform: "skewX(-12deg)" }}
            />

            {/* Gold Glow */}
            <div className="absolute inset-0 border-4 border-accent/20 group-hover:border-accent/40 rounded-3xl transition-all duration-500 gold-glow" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-8 left-8 right-8 glass-effect rounded-2xl p-6"
          >
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
              Award-Winning Interior Design
            </h3>
            <p className="text-muted-foreground">
              Recognized by Australian Interior Design Awards 2023 for exceptional luxury design
            </p>
          </motion.div>
        </motion.div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-xl p-6 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mb-4 gold-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-playfair font-bold text-accent-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-playfair font-bold text-foreground mb-3 group-hover:text-luxury transition-colors duration-300">
                {space.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {space.description}
              </p>

              <div className="pt-4 border-t border-accent/20">
                <span className="text-xs text-accent font-semibold tracking-wider uppercase">
                  {space.capacity}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbienceTour;
