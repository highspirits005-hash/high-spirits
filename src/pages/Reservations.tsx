import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Reservations = () => {
  const [date, setDate] = useState<Date>();
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    time: '',
    guests: '',
    specialRequests: '',
    occasion: '',
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoadingReservations(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/reservations'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        
        const data = await response.json();
        setReservations(data.data || []);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        toast.error('Failed to load reservations');
      } finally {
        setIsLoadingReservations(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date || !formData.time || !formData.guests || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.occasion) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Combine date and time
      const [hours, minutes] = formData.time.split(':');
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0);
      
      // Prepare API payload - Strapi v4 format
      const payload = {
        data: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          dateTime: dateTime.toISOString(),
          guests: parseInt(formData.guests, 10),
          specialRequests: formData.specialRequests.trim() || '',
          occasion: formData.occasion,
        }
      };

      const response = await fetch(
        'https://calm-actor-864a39d720.strapiapp.com/api/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        console.error('Error Details:', errorData?.error);
        console.error('Payload Sent:', payload);
        
        // Extract detailed error message
        let errorMessage = 'Failed to submit reservation';
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        } else if (errorData?.error?.details?.errors) {
          errorMessage = errorData.error.details.errors.map((e: any) => e.message).join(', ');
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        time: '',
        guests: '',
        specialRequests: '',
        occasion: '',
      });
      setDate(undefined);
      
      // Refresh reservations
      const reservationsResponse = await fetch(
        'https://calm-actor-864a39d720.strapiapp.com/api/reservations'
      );
      const reservationsData = await reservationsResponse.json();
      setReservations(reservationsData.data || []);
      
      toast.success('Reservation submitted successfully! We\'ll confirm your booking shortly.');
    } catch (err) {
      console.error('Error submitting reservation:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Reserve Your Table
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Reserve A Table
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Where great food meets seamless hospitality
          </motion.p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          {/* Existing Reservations Section */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury mb-2">
              </h2>
              <p className="text-muted-foreground">
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-lg p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-accent" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal bg-secondary/50 border-accent/20',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Time
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                      <SelectTrigger className="bg-secondary/50 border-accent/20">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 14 }, (_, i) => {
                          const hour = Math.floor((17 + i * 0.5) % 24);
                          const minute = i % 2 === 0 ? '00' : '30';
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
                              {hour}:{minute} {hour >= 12 ? 'PM' : 'AM'}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      Guests
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
                      <SelectTrigger className="bg-secondary/50 border-accent/20">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Occasion</Label>
                  <Select value={formData.occasion} onValueChange={(value) => setFormData(prev => ({ ...prev, occasion: value }))}>
                    <SelectTrigger className="bg-secondary/50 border-accent/20">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday,">Birthday</SelectItem>
                      <SelectItem value="anniversary,">Anniversary</SelectItem>
                      <SelectItem value="business party,">Business Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-foreground">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Dietary restrictions, special occasions, seating preferences..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="bg-secondary/50 border-accent/20 focus:border-accent min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg py-6 gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                 “Walk-in requests are subject to availability. Our team will confirm shortly via email.”
                </p>              </form>            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Need immediate assistance? Call us directly
              </p>
              <a
                href="tel:+61 420 408 809"
                className="text-2xl font-playfair font-bold text-accent hover:text-accent/80 transition-colors"
              >
               +61 420 408 809
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservations;