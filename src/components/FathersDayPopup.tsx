import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Heart, UtensilsCrossed, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useWalkInPopup } from '@/context/WalkInPopupContext';

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

          {/* Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] mt-2 mb-4 sm:my-10 rounded-3xl shadow-2xl overflow-hidden border"
            style={{
              borderColor: `${colors.gold}30`,
              background: `linear-gradient(150deg, ${colors.cardDark} 0%, ${colors.dark} 100%)`,
            }}
          >
            {/* Top glowing accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_15px_#FBBF24]" />

            {/* Ambient glows */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${colors.emerald}40` }} />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${colors.gold}12` }} />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 z-20 group"
            >
              <X className="w-[18px] h-[18px] group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Content */}
            <div className="relative z-10 px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6 text-center">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border shadow-lg mb-2.5"
                style={{
                  background: `linear-gradient(135deg, ${colors.emerald} 0%, ${colors.emeraldDark} 100%)`,
                  borderColor: `${colors.gold}40`,
                  color: colors.gold,
                }}
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
              </motion.div>

              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: colors.gold }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>This Father&rsquo;s Day</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Title */}
              <h2 className="text-2xl leading-tight sm:text-[1.75rem] font-playfair font-bold text-white mb-2.5 tracking-wide">
                Give Dad a{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${colors.goldLight} 0%, ${colors.gold} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Feast to Remember
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-inter px-1">
                Treat Dad to a table full of his favourites and bring the whole family together for good food and great conversation.
              </p>

              {/* Info */}
              <div className="rounded-xl p-3.5 mb-4 text-left space-y-2" style={{ background: `${colors.emerald}18`, border: `1px solid ${colors.emerald}40` }}>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <Calendar size={16} style={{ color: colors.gold }} className="flex-shrink-0" />
                  <span>Sunday, <strong className="text-white">6th September</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <Clock size={16} style={{ color: colors.gold }} className="flex-shrink-0" />
                  <span><strong className="text-white">11:30 AM — 9:30 PM</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <MapPin size={16} style={{ color: colors.gold }} className="flex-shrink-0" />
                  <span className="truncate">1/57 Victoria St, <strong className="text-white">Bunbury</strong></span>
                </div>
              </div>

              {/* Quote highlight */}
              <div
                className="rounded-xl px-4 py-3 mb-4 text-sm font-playfair italic"
                style={{
                  background: `${colors.gold}12`,
                  border: `1px solid ${colors.gold}30`,
                  color: colors.goldLight,
                }}
              >
                Because Dad deserves more than just &ldquo;Happy Father&rsquo;s Day.&rdquo; He deserves a feast!
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2.5">
                <Button
                  onClick={handleReserve}
                  className="w-full font-bold py-3 rounded-xl shadow-lg transition-all duration-300 text-sm tracking-wide flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${colors.gold} 0%, #f59e0b 100%)`,
                    color: colors.dark,
                    boxShadow: `0 8px 20px ${colors.gold}40`,
                  }}
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Reserve Dad&rsquo;s Table
                </Button>

                <Link to="/menu" onClick={handleClose} className="block">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-3 text-sm font-semibold tracking-wide border-2 bg-transparent hover:bg-white/5"
                    style={{ borderColor: `${colors.gold}50`, color: colors.goldLight }}
                  >
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FathersDayPopup;
