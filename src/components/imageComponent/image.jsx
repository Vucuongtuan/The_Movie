import React, { useState, useEffect } from 'react';
import {
  BASE_IMAGE_URL,
  BASE_IMAGE_URL_2,
  BASE_IMAGE_URL_3,
} from '../../services/movie.api';

const Image = ({ resizeLayout, movie, className }) => {
  const [imageUrl, setImageUrl] = useState(null);
  // useEffect(() => {
  //   const loadImage = async () => {
  //     try {
  //       const response = await fetch(
  //         BASE_IMAGE_URL + (resizeLayout ? movie.thumb_url : movie.poster_url),
  //         {
  //           headers: { 'Content-Type': 'application/json' },
  //           method: 'GET',
  //         },
  //       );
  //       if (response.ok) {
  //         setImageUrl(
  //           BASE_IMAGE_URL +
  //             (resizeLayout ? movie.thumb_url : movie.poster_url),
  //         );
  //       } else {
  //         setImageUrl(
  //           BASE_IMAGE_URL_2 +
  //             (resizeLayout ? movie.thumb_url : movie.poster_url),
  //         );
  //       }
  //     } catch (error) {
  //       setImageUrl(
  //         BASE_IMAGE_URL_2 +
  //           (resizeLayout ? movie.thumb_url : movie.poster_url),
  //       );
  //     }
  //   };

  //   loadImage();
  // }, [resizeLayout, movie]);
  return (
    <img
      src={
        !resizeLayout
          ? BASE_IMAGE_URL_3 + movie.poster_url
          : BASE_IMAGE_URL_3 + movie.thumb_url
      }
      alt={movie.name}
      loading='lazy'
      className={className}
    />
  );
};

export default Image;
