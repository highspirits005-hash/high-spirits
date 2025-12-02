import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Target } from 'lucide-react';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every dish is crafted with love and dedication to authentic flavors',
    },
    {
      icon: Sparkles,
      title: 'Excellence',
      description: 'We pursue perfection in every aspect of the dining experience',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Only the finest ingredients meet our exacting standards',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Tradition meets modern culinary artistry in every creation',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={restaurantAmbience}
            alt="About High Spirit"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            About Us
          </motion.p>
        <section
  className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center mt-20"
  style={{ overflow: 'visible' }}
>
  <div className="relative z-10 text-center px-6">
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-accent font-inter tracking-widest mb-3 uppercase text-sm"
    >
      ABOUT US
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="font-playfair font-bold text-luxury mb-4 text-center whitespace-normal break-words leading-tight text-[clamp(2.25rem,6vw,5.5rem)]"
    >
      High Spirit
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
    >
      Where Tradition Meets Luxury in Every Bite
    </motion.p>
  </div>
</section>


          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Where Tradition Meets Luxury in Every Bite
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At High Spirit, we are dedicated to bringing you the most authentic and luxurious Indian dining experience in Australia. Our mission is to honor traditional recipes while presenting them with contemporary elegance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that food is more than sustenance—it's an art form, a cultural bridge, and a celebration of life's finest moments. Every dish we serve tells a story of heritage, passion, and uncompromising quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
              Our Philosophy
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-lg p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-accent mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
              The Team
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">
              Passionate Professionals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our team of expert chefs, sommeliers, and hospitality professionals work in perfect harmony to create an unforgettable experience. Each member brings years of expertise and a deep commitment to excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our executive chef to our front-of-house team, everyone at High Spirit shares a common goal: to exceed your expectations and create memories that last a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;