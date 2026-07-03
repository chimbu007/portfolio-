import React, { useState, useEffect, useRef } from 'react';

const ScrollReveal = ({ children, delay = 0, distance = "40px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // only reveal once
        }
      },
      { 
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${distance})`,
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
