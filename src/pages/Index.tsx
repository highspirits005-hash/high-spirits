import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import Footer from '@/components/Footer';
import SignatureExperiences from '@/components/SignatureExperiences';
import TimelineSection from '@/components/TimelineSection';
import IngredientsShowcase from '@/components/IngredientsShowcase';
import AmbienceTour from '@/components/AmbienceTour';
import ChefPhilosophy from '@/components/ChefPhilosophy';
import MenuStory from '@/components/MenuStory';
import Carousel3D from '@/components/Carousel3D';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChefHat, CalendarDays, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import chefPortrait from '@/assets/Ishpreet Bedi.jpg';
import restaurantAmbience from '@/assets/Image.jpg';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';

const Index = () => {
  const statsRef = useRef(null);
  const chefRef = useRef(null);
  const ambienceRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const isChefInView = useInView(chefRef, { once: true });
  const isAmbienceInView = useInView(ambienceRef, { once: true });

  const stats = [
    { icon: ChefHat, value: '100%', label: 'Authentic Punjabi Recipes' },
    { icon: CalendarDays, value: '7 Days', label: 'Freshly Served' },
    { icon: ShieldCheck, value: 'Zero', label: 'Compromise' },
    { icon: Star, value: '5.0', label: 'Google Rating' },
  ];

  const carouselItems = [
    {
      image: heroDish1,
      title: "Signature Butter Chicken",
      description: "Our most celebrated dish—succulent chicken in a velvety tomato and butter sauce, perfected over two decades"
    },
    {
      image: heroDish2,
      title: "Tandoori Mixed Grill",
      description: "A premium selection of tandoor-roasted meats, marinated in aromatic spices and Australian native herbs"
    },
    {
      image: heroDish3,
      title: "Biryani Royale",
      description: "Fragrant basmati rice layered with tender lamb, saffron, and 23 secret spices—a royal feast"
    },
    {
      image: dalMakhani,
      title: "Truffle Dal Makhani",
      description: "18-hour slow-cooked black lentils finished with cream and Australian black truffle"
    },
    {
      image: palakPaneer,
      title: "Palak Paneer Supreme",
      description: "Silky spinach sauce with house-made paneer, enhanced with organic Victorian produce"
    },
    {
      image: roganJosh,
      title: "Tasmanian Lamb Rogan Josh",
      description: "Premium Tasmanian lamb in aromatic Kashmiri gravy—where Australian meets authentic"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center glass-effect rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-inter text-sm md:text-base tracking-wide">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DishGrid />
      
      {/* Signature Experiences */}
      <SignatureExperiences />
      
      {/* 3D Carousel Section */}
      <section className="py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-20"
          >
            <motion.p
              className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Chef's Specials
            </motion.p>
           <h2
  className="
    font-playfair font-bold shimmer-text mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.2rem)]
  "
>
  Signature Creations
</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience our most celebrated dishes through an immersive 3D journey
            </p>
          </motion.div>
          
          <Carousel3D items={carouselItems} />
        </div>
      </section>
      
      {/* Menu Story */}
      <MenuStory />
      
      {/* Chef Philosophy */}
      <ChefPhilosophy />

      {/* Chef Section */}
      <section ref={chefRef} className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isChefInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg elegant-shadow">
                <img
                  src={chefPortrait}
                  alt="Executive Chef Ishpreet Bedi"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isChefInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
                
              </p>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">
                Meet Our Business Partner
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
               Ishpreet Bedi brings over 20 years of experience in hospitality operations across India and Australia. As a business partner, she leads daily operations and strategic planning, ensuring seamless management and a consistently exceptional guest experience.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Her strong leadership and attention to detail ensure the brand runs efficiently while maintaining the highest standards of service and quality.
              </p>
              <Link to="/our-story">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
                >
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ambience Section */}
      <section ref={ambienceRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurantAmbience}
            alt="Restaurant Ambience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isAmbienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-accent font-inter tracking-widest mb-4 uppercase text-sm">
              Luxurious Atmosphere
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-luxury mb-6">
              An Unforgettable Experience
            </h2>
            <p className="text-foreground text-lg mb-8 leading-relaxed">
              Step into a world of elegance where every detail is designed to enchant. From our handcrafted interiors to our attentive service, we create moments that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gallery">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
                >
                  View Gallery
                </Button>
              </Link>
              <Link to="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Host an Event
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Ingredients Showcase */}
      <IngredientsShowcase />
      
      {/* Ambience Tour */}
      <AmbienceTour />

      {/* Testimonials Preview */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
              Guest Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              What Our Guests Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Emma Thompson',
                review: 'Absolutely exquisite! The butter chicken was perfection, and the ambience transported us to luxury.',
                rating: 5,
              },
              {
                name: 'James Wilson',
                review: 'Best Indian restaurant in Australia. The attention to detail in every dish is remarkable.',
                rating: 5,
              },
              {
                name: 'Sophia Martinez',
                review: 'A true fine dining experience. From the moment we walked in, we felt like royalty.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-effect rounded-lg p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>
                <p className="text-accent font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;