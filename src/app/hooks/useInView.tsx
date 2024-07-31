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
    const element = ref.current;

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref]);

  return { ref, inView };
};

export default useInView;
