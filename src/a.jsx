import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ImageCP({ src, className }) {
  return (
    <LazyLoadImage src={src} loading='lazy' alt='' className={className} />
  );
}
