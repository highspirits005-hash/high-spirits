import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import chefPortrait from '@/assets/Ishpreet Bedi.jpg';

const OurStory = () => {
  const timeline = [
    {
      year: '2003',
      title: 'The Beginning',
      description: 'High Spirit was founded with a vision to bring authentic Indian luxury dining to Australia',
    },
    {
      year: '2008',
      title: 'First Award',
      description: 'Recognized as Best Indian Restaurant in Sydney by the Australian Culinary Awards',
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Opened our second location and introduced our signature tasting menu',
    },
    {
      year: '2020',
      title: 'Global Recognition',
      description: 'Featured in the World\'s 50 Best Restaurants list for Indian cuisine',
    },
    {
      year: '2024',
      title: 'Continued Excellence',
      description: 'Celebrating over 50,000 satisfied guests and numerous culinary accolades',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Our Journey
          </motion.p>
        <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="
    font-playfair font-bold text-luxury mb-6 text-center 
    whitespace-normal break-words leading-tight 
    text-[clamp(2.2rem,6vw,4.8rem)]
  "
>
  The High Spirits Story
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground leading-relaxed"
          >
            Two decades of culinary excellence, cultural fusion, and unforgettable moments
          </motion.p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">
                From Punjab to Australia
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our business partner, Ishpreet Bedi, grew up in the heart of Punjab, where hospitality is a way of life. From an early age, she learned that successful businesses are built on care, consistency, and attention to detail—values she brings into every aspect of operations and guest experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
               With a refined vision shaped by hospitality experience across India and Australia, Ishpreet Bedi leads the brand with a focus on operational excellence, cultural authenticity, and elevated guest experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg elegant-shadow">
                <img
                  src={chefPortrait}
                  alt="Chef Ishpreet Bedi"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-effect rounded-lg p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-playfair font-bold text-accent mb-2">
                        {item.year}
                      </h3>
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
              Recognition
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              Awards & Accolades
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Trophy, title: '15+ Culinary Awards', description: 'Recognition from prestigious organizations' },
              { icon: MapPin, title: 'Top 3 in Sydney', description: 'Consistently ranked among the best' },
              { icon: Users, title: '50,000+ Happy Guests', description: 'Creating memories since 2003' },
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-effect rounded-lg p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <award.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-accent mb-3">
                  {award.title}
                </h3>
                <p className="text-muted-foreground">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;