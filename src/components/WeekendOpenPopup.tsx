import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Sparkles, 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  Star, 
  Wine, 
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useWalkInPopup } from '@/context/WalkInPopupContext';

interface WeekendOpenPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DISMISS_KEY = 'hs_weekend_open_sep19_20_dismissed';
// Popup remains active through the weekend until Monday morning 21st Sep
const EVENT_CUTOFF = new Date('2026-09-21T02:00:00');

const WeekendOpenPopup: React.FC<WeekendOpenPopupProps> = ({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { openPopup: openWalkInPopup } = useWalkInPopup();

  useEffect(() => {
    // If past event cutoff, don't show automatically
    if (new Date() > EVENT_CUTOFF) return;

    const hasDismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!hasDismissed && externalIsOpen === undefined) {
      // Smooth entrance after slight delay on page load
      const timer = setTimeout(() => setInternalIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  const showModal = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setInternalIsOpen(false);
    externalOnClose?.();
  };

  const handleReserve = () => {
    handleClose();
    openWalkInPopup();
  };

  const colors = {
    emerald: '#146854',
    emeraldDark: '#082f25',
    emeraldGlow: 'rgba(20, 104, 84, 0.45)',
    gold: '#FBBF24',
    goldLight: '#FDE68A',
    goldDeep: '#D97706',
    dark: '#080d0b',
    cardDark: '#0e1613',
  };

  const highlights = [
    { icon: UtensilsCrossed, title: 'Grand Indian Buffet', desc: 'Curries, Tandoori & Naans' },
    { icon: Wine, title: 'Fine Cocktails & Bar', desc: 'Crafted Spirits & Pairings' },
    { icon: Star, title: '5-Star Dining Ambience', desc: 'Warm Punjabi Hospitality' },
  ];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.84)' }}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Luxury Modal Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[410px] sm:max-w-[450px] my-auto rounded-[26px] shadow-2xl overflow-hidden border border-[#FBBF24]/40 text-white"
            style={{
              background: `linear-gradient(160deg, ${colors.cardDark} 0%, ${colors.dark} 100%)`,
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(251, 191, 36, 0.18)',
              maxHeight: '94vh',
            }}
          >
            {/* Top Glowing Gold Animated Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_20px_#FBBF24]" />

            {/* Ambient Background Glow Elements */}
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#146854]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-56 h-56 bg-[#FBBF24]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Floating Sparkle Animations */}
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-5 left-5 text-[#FBBF24] pointer-events-none"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close notification"
              className="absolute top-3.5 right-3.5 p-1.5 text-gray-400 hover:text-[#FBBF24] bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 z-30 group backdrop-blur-sm border border-white/10"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Inner Scrollable Wrapper */}
            <div 
              className="p-4 sm:p-6 overflow-y-auto relative z-10" 
              style={{ maxHeight: 'calc(94vh - 6px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Logo / Badge Header */}
              <div className="flex flex-col items-center text-center mb-2.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#146854]/90 to-[#0a3d31]/90 border border-[#FBBF24]/50 text-[#FDE68A] text-[11px] font-semibold tracking-wider uppercase mb-2 shadow-[0_0_16px_rgba(20,104,84,0.5)]"
                >
                  <Sparkles className="w-3 h-3 text-[#FBBF24] animate-pulse" />
                  <span>Special Weekend Opening</span>
                  <Sparkles className="w-3 h-3 text-[#FBBF24] animate-pulse" />
                </motion.div>

                {/* Main Headline */}
                <h2 className="font-playfair font-black text-2xl sm:text-[1.75rem] text-white tracking-wide leading-tight mb-0.5">
                  WE ARE <span className="italic bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#f59e0b] bg-clip-text text-transparent">OPEN</span>
                </h2>
                <h3 className="font-playfair font-bold text-lg sm:text-xl text-white/95 uppercase tracking-wider">
                  THIS WEEKEND!
                </h3>
              </div>

              {/* Date Callout Box */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="relative my-3 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#146854]/50 via-[#0e271f]/70 to-[#146854]/30 border border-[#FBBF24]/50 shadow-inner overflow-hidden"
              >
                <div className="flex items-center justify-center gap-3 text-center">
                  <div className="p-2 rounded-xl bg-[#FBBF24]/20 text-[#FBBF24] shrink-0 border border-[#FBBF24]/30">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10.5px] uppercase tracking-widest text-[#FDE68A] font-semibold">
                      Weekend Service Dates
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white font-playfair tracking-wide">
                      Sat 19th Sept & Sun 20th Sept
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Descriptive Intro */}
              <p className="text-center text-gray-300 text-xs sm:text-[13px] leading-relaxed mb-3.5 px-1 font-inter">
                Satisfy your weekend cravings with Bunbury's premier Indian dining experience. Indulge in our exquisite buffet, sizzling tandoori specialties & royal hospitality.
              </p>

              {/* Hours Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3.5">
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <Clock className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <div>
                    <span className="block text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">Lunch</span>
                    <span className="text-xs sm:text-[12.5px] font-bold text-white">11:30 AM – 2:30 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <Flame className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <div>
                    <span className="block text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">Dinner</span>
                    <span className="text-xs sm:text-[12.5px] font-bold text-white">5:00 PM – 9:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2 mb-5">
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-2 px-3 rounded-xl bg-gradient-to-r from-[#146854]/20 to-transparent border border-[#146854]/40"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#146854]/60 flex items-center justify-center text-[#FBBF24] shrink-0 border border-[#FBBF24]/20">
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.title}</p>
                      <p className="text-[11px] text-gray-400 truncate">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#146854] shrink-0" />
                  </div>
                ))}
              </div>

              {/* Location & Call Strip */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs mb-5">
                <div className="flex items-center gap-1.5 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                  <span className="truncate">1/57 Victoria St, Bunbury WA</span>
                </div>
                <a
                  href="tel:+61420408809"
                  className="flex items-center gap-1.5 text-[#FDE68A] hover:text-white font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span>+61 420 408 809</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleReserve}
                    className="w-full bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#f59e0b] hover:from-[#FBBF24] hover:to-[#d97706] text-black font-extrabold py-3.5 rounded-xl text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(251,191,36,0.35)] transition-all duration-300 border-0"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    Reserve Your Table Now
                  </Button>
                </motion.div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to="/menu" onClick={handleClose} className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-2.5 text-xs sm:text-sm font-semibold border border-[#FBBF24]/40 bg-black/30 hover:bg-[#146854]/30 text-[#FDE68A] hover:text-white transition-all flex items-center justify-center gap-1"
                    >
                      <span>Explore Menu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <a 
                    href="tel:+61420408809"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-2.5 text-xs sm:text-sm font-semibold border border-white/20 bg-black/30 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                      <span>Call to Book</span>
                    </Button>
                  </a>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-1 text-center text-xs text-gray-400 hover:text-gray-200 transition-colors pt-1"
                >
                  Continue browsing website
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeekendOpenPopup;
