import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Sparkles, Music, Utensils, PartyPopper } from 'lucide-react';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';

const Events = () => {
  const eventTypes = [
    {
      icon: PartyPopper,
      title: 'Private Celebrations',
      description: 'Birthday parties, anniversaries, and milestone celebrations',
      capacity: 'Up to 80 guests',
    },
    {
      icon: Users,
      title: 'Corporate Events',
      description: 'Business dinners, team building, and corporate gatherings',
      capacity: 'Up to 100 guests',
    },
    {
      icon: Sparkles,
      title: 'Weddings & Receptions',
      description: 'Elegant wedding receptions and engagement celebrations',
      capacity: 'Up to 120 guests',
    },
    {
      icon: Utensils,
      title: 'Catering Services',
      description: 'Off-site catering for your special occasions',
      capacity: 'Any size',
    },
    {
      icon: Music,
      title: 'Wedding Catering',
      description: 'Exquisite menus for your perfect day with full service',
      capacity: 'Up to 300 guests',
    },
    {
      icon: Calendar,
      title: 'Private Venues',
      description: 'Exclusive venue hire for intimate or grand events',
      capacity: 'Full venue available',
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
            alt="Events at High Spirit"
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
            Special Occasions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Events & Catering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Create unforgettable memories with our bespoke event services
          </motion.p>
        </div>
      </section>

      {/* Event Types */}
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
              Event Services
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              We Host Every Celebration
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we make every event extraordinary
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-lg p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <event.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>
                <p className="text-accent font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {event.capacity}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Utensils, title: 'Customized Menus', description: 'Tailored to your preferences and dietary needs' },
              { icon: Music, title: 'Entertainment Options', description: 'Live music, DJ, and cultural performances' },
              { icon: Calendar, title: 'Event Planning', description: 'Dedicated coordinator for seamless execution' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">
              Ready to Plan Your Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Contact our events team to discuss your vision. We'll work with you to create a bespoke experience that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Events Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
                onClick={() => window.location.href = 'tel:+61234567890'}
              >
                Call +61 2 3456 7890
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;