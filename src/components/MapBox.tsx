interface MapBoxProps {
  className?: string;
}

const MapBox = ({ className = '' }: MapBoxProps) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.889!2d115.6403!3d-33.3276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32902f3809e3e7%3A0x1a0b1f3c8d1e1a1a!2s1%2F57%20Victoria%20St%2C%20Bunbury%20WA%206230%2C%20Australia!5e0!3m2!1sen!2sau!4v1702656000000!5m2!1sen!2sau"
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: '400px' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="High Spirits Location - 1/57 Victoria Street, Bunbury"
      className={`rounded-lg ${className}`}
    />
  );
};

export default MapBox;
