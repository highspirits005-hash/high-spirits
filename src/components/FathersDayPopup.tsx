import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Heart, Phone, UtensilsCrossed } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useWalkInPopup } from '@/context/WalkInPopupContext';
import fathersDayPhoto from '@/assets/fathers-day-image.jpg';

interface FathersDayPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DISMISS_KEY = 'hs_fathers_day_2026_dismissed';
// Popup is only relevant up to the day after the event.
const EVENT_CUTOFF = new Date('2026-09-07T00:00:00');

const FathersDayPopup: React.FC<FathersDayPopupProps> = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { openPopup: openWalkInPopup } = useWalkInPopup();

  useEffect(() => {
    if (new Date() > EVENT_CUTOFF) return;

    const hasDismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!hasDismissed && externalIsOpen === undefined) {
      const timer = setTimeout(() => setInternalIsOpen(true), 700);
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
    emeraldDark: '#0a3d31',
    gold: '#FBBF24',
    goldLight: '#FDE68A',
    dark: '#0a0a0a',
    cardDark: '#101613',
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)' }}
        >
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Card — full-bleed photo poster, styled like a restaurant promo post */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] mt-2 mb-4 sm:my-8 rounded-[28px] shadow-2xl overflow-hidden border"
            style={{ borderColor: `${colors.gold}40` }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-3 right-3 p-1.5 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 z-30 group"
            >
              <X className="w-[18px] h-[18px] group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Poster photo background — height is intrinsic to its content, so the footer always sits flush at the very bottom */}
            <div className="relative w-full">
              <img
                src={fathersDayPhoto}
                alt="Father and son sharing a meal at High Spirits"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '50% 35%' }}
              />
              {/* Darkening gradient — dark only where text sits, fully clear across the open photo in the middle */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.3) 24%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.78) 100%)' }}
              />
              {/* Soft corner vignette for a more cinematic, editorial finish */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 90px 20px rgba(0,0,0,0.35)' }}
              />

              {/* Content layer */}
              <div className="relative z-10 flex flex-col">
                {/* Top: logo + bold headline + date, all grouped so the photo opens up below */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="pt-5 px-5 flex flex-col items-center text-center"
                >
                  <img src="/logo1.png" alt="High Spirits" className="h-8 w-auto mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
                  <h2
                    className="font-playfair font-extrabold uppercase text-white leading-[0.9] text-[1.9rem] sm:text-[2.1rem]"
                    style={{ textShadow: '0 4px 18px rgba(0,0,0,0.7)' }}
                  >
                    Celebrating
                  </h2>
                  <span
                    className="font-playfair italic font-bold text-[2.6rem] sm:text-[2.9rem] leading-none -mt-1.5"
                    style={{
                      background: `linear-gradient(135deg, ${colors.goldLight} 0%, ${colors.gold} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.55))',
                    }}
                  >
                    Father's Day
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-px w-5" style={{ background: `${colors.gold}80` }} />
                    <span
                      className="text-[11px] font-semibold tracking-[0.08em] text-gray-100"
                      style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
                    >
                      Sunday, 6th September &bull; 11:30AM&ndash;9:30PM
                    </span>
                    <span className="h-px w-5" style={{ background: `${colors.gold}80` }} />
                  </div>
                </motion.div>

                {/* Middle: left fully open so the photo does the talking */}
                <div className="h-[180px] sm:h-[205px]" />

                {/* Bottom: booking pill, address, CTAs — anchored flush to the bottom edge of the poster */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="px-5 pb-5 pt-4"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.35) 100%)' }}
                >
                  <motion.a
                    href="tel:+61420408809"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-white rounded-2xl py-2.5 px-4 mb-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 transition-colors"
                    style={{ boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px ${colors.gold}30` }}
                  >
                    <Phone size={14} style={{ color: colors.emerald }} className="flex-shrink-0" />
                    <span className="text-[12.5px] font-bold tracking-wide" style={{ color: colors.dark }}>
                      Book your table &nbsp;&bull;&nbsp; +61 420 408 809
                    </span>
                  </motion.a>

                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}80)` }} />
                    <Heart size={10} style={{ color: colors.gold }} fill={colors.gold} />
                    <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${colors.gold}80, transparent)` }} />
                  </div>

                  <div
                    className="flex items-center justify-center gap-1.5 text-[11.5px] text-gray-100 mb-4"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}
                  >
                    <MapPin size={12} style={{ color: colors.gold }} className="flex-shrink-0" />
                    <span>1/57 Victoria St, Bunbury</span>
                  </div>

                  <div className="space-y-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleReserve}
                        className="w-full font-bold py-3 rounded-xl text-sm tracking-wide flex items-center justify-center gap-2 border-0"
                        style={{
                          background: `linear-gradient(135deg, ${colors.goldLight} 0%, ${colors.gold} 55%, #f59e0b 100%)`,
                          color: colors.dark,
                          boxShadow: `0 10px 26px ${colors.gold}55`,
                        }}
                      >
                        <UtensilsCrossed className="w-4 h-4" />
                        Reserve Dad&rsquo;s Table
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/menu" onClick={handleClose} className="block">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl py-3 text-sm font-semibold tracking-wide border-2 bg-black/25 hover:bg-white/10 backdrop-blur-sm"
                          style={{ borderColor: `${colors.goldLight}60`, color: colors.goldLight }}
                        >
                          View Menu
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FathersDayPopup;
