'use client';

import { useEffect, useRef, useState } from 'react';

const useInView = <T extends HTMLElement>() => {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return { ref, inView };
};

export default useInView;
