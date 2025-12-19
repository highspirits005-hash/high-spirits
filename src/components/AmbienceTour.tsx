import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VideoBackground from "./VideoBackground";

/* IMAGES FOR GALLERY */
import restaurantAmbience from "@/assets/Image.jpg";
import img2 from "@/assets/Image2.jpg";
import img3 from "@/assets/Image3.jpg";

const AmbienceTour = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
        
  const galleryImages = [restaurantAmbience, img2, img3];

  // const spaces = [
  //   {
  //     title: "Main Dining Hall",
  //     description:
  //       "An opulent 120-seat space featuring soaring ceilings, crystal chandeliers, and floor-to-ceiling windows overlooking Melbourne's skyline.",
  //     capacity: "120 guests",
  //   },
  //   {
  //     title: "Private Wine Room",
  //     description:
  //       "Intimate 16-seat glass-enclosed room surrounded by our 500+ bottle collection, perfect for exclusive gatherings.",
  //     capacity: "16 guests",
  //   },
  //   {
  //     title: "Chef's Table",
  //     description:
  //       "An exclusive 8-seat counter offering front-row views of our kitchen brigade at work, with personalized culinary commentary.",
  //     capacity: "8 guests",
  //   },
  //   {
  //     title: "Terrace Lounge",
  //     description:
  //       "Sophisticated outdoor space with lush greenery, ambient lighting, and panoramic city views—ideal for pre-dinner cocktails.",
  //     capacity: "40 guests",
  //   },
  // ];

  return (
    <section ref={containerRef} className="py-10 relative overflow-hidden bg-[#E7EBDD]">
      <VideoBackground overlayOpacity={0.5} />

      <div className="container mx-auto px-4 relative z-10">

      </div>
    </section>
  );
};

export default AmbienceTour;
