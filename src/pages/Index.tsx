import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import Footer from '@/components/Footer';
import SignatureExperiences from '@/components/SignatureExperiences';
import TimelineSection from '@/components/TimelineSection';
import IngredientsShowcase from '@/components/IngredientsShowcase';
import ChefPhilosophy from '@/components/ChefPhilosophy';
import MenuStory from '@/components/MenuStory';
import Carousel3D from '@/components/Carousel3D';
import GuestReviews from '@/components/GuestReviews';
import Newsletter from '@/components/Newsletter';
import GalleryPreview from '@/components/GalleryPreview';
import WhyChooseUs from '@/components/WhyChooseUs';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChefHat, CalendarDays, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import chefPortrait from '@/assets/chef-portrait.jpg';
import restaurantAmbience from '@/assets/Image.jpg';

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

const Index = () => {
  const statsRef = useRef(null);
  const chefRef = useRef(null);
  const ambienceRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const isChefInView = useInView(chefRef, { once: true });
  const isAmbienceInView = useInView(ambienceRef, { once: true });
  
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        setIsLoadingCarousel(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/signature-creations?populate=*'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch signature creations');
        }
        
        const data = await response.json();
        // Sort by displayOrder and transform to carousel format
        const sortedItems = (data.data || [])
          .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
          .map((item: any) => ({
            image: item.image.url,
            title: item.title,
            description: item.shortDescription
          }));
        setCarouselItems(sortedItems);
      } catch (err) {
        console.error('Error fetching carousel items:', err);
      } finally {
        setIsLoadingCarousel(false);
      }
    };

    fetchCarouselItems();
  }, []);

  const stats = [
    { icon: ChefHat, value: '100%', label: 'Authentic Punjabi Recipes' },
    { icon: CalendarDays, value: '7 Days', label: 'Freshly Served' },
    { icon: ShieldCheck, value: 'Zero', label: 'Compromise' },
    { icon: Star, value: '5.0', label: 'Google Rating' },
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
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold mb-3 text-accent">
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
          
          {isLoadingCarousel ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading signature creations...</p>
            </div>
          ) : (
            <Carousel3D items={carouselItems} />
          )}
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
                  alt="Executive Chef"
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
                Culinary Mastery
              </p>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">
                Meet Our Executive Chef
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                Chef Vikram Singh brings over 20 years of culinary expertise, having trained in the finest kitchens of India and Australia. His passion for authentic flavors combined with modern techniques creates an unforgettable dining experience.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Each dish is a masterpiece, crafted with heritage recipes passed down through generations and elevated with contemporary presentation.
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
      
      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Guest Reviews Carousel */}
      <GuestReviews />

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Index;