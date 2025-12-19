import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        'https://calm-actor-864a39d720.strapiapp.com/api/subscribers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              email: email,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-8 mx-auto"
          >
            <Mail className="w-8 h-8 text-accent" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4"
          >
            Join Our Culinary Circle
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Exclusive offers, menu previews, and dining tips delivered to your inbox
          </motion.p>

          {/* Offer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-8"
          >
            <span className="text-accent font-semibold text-sm">
              ✨ Get 10% off your first visit
            </span>
          </motion.div>

          {/* Newsletter Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary/60 border-secondary/80 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 gold-glow"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </Button>
          </motion.form>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-accent font-semibold text-sm"
            >
              ✓ Thank you! Check your email for your 10% discount code.
            </motion.div>
          )}

          {/* Privacy Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            We respect your privacy. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
