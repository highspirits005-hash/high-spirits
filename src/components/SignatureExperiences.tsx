import { motion } from 'framer-motion';
import { Wine, Users, Flame, Heart, Briefcase, Sparkles } from 'lucide-react';

const SignatureExperiences = () => {
  const experiences = [
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Chef's Table",
      description: "An intimate 8-seat experience where our Executive Chef crafts a personalized journey through contemporary Indian cuisine, paired with rare wines from our cellar.",
      features: ["Personalized 10-course menu", "Chef interaction", "Kitchen tour"]
    },
    {
      icon: <Wine className="w-8 h-8" />,
      title: "Wine Cellar Experience",
      description: "Explore our extensive collection of Australian and international vintages in our climate-controlled cellar, with expert sommelier guidance.",
      features: ["500+ wine selection", "Private tasting", "Sommelier pairing"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Romantic Candlelight Dining",
      description: "An unforgettable evening in our most secluded corner, with bespoke menus, live music, and personalized service for life's special moments.",
      features: ["Private table setup", "Rose arrangements", "Dedicated server"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Private Dining Rooms",
      description: "Host up to 24 guests in our luxurious private spaces, perfect for celebrations, business dinners, or intimate gatherings.",
      features: ["3 private rooms", "Custom menus", "AV equipment"]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Corporate High-End Events",
      description: "Impress clients and celebrate success with sophisticated corporate dining experiences tailored to your business needs.",
      features: ["Full venue buyout", "Branded experiences", "Presentation facilities"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Degustation Journey",
      description: "Our signature 7-course or 10-course tasting menu showcasing the finest seasonal ingredients and innovative techniques.",
      features: ["Seasonal menu", "Wine pairing available", "3.5 hour experience"]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <VideoBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Extraordinary Moments
          </motion.p>
       <h2
  className="
    font-playfair font-bold text-luxury mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.2rem)]
  "
>
  Signature Experiences
</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Curated exclusively for the discerning palate, each experience is a masterpiece of culinary artistry and impeccable service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-effect rounded-2xl p-8 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center text-accent-foreground mb-6 gold-glow"
              >
                {exp.icon}
              </motion.div>
              
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4 group-hover:text-luxury transition-colors duration-300">
                {exp.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {exp.description}
              </p>
              
              <ul className="space-y-2">
                {exp.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// VideoBackground component import
import VideoBackground from './VideoBackground';

export default SignatureExperiences;
