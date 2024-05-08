import React, { useState, useEffect } from 'react';
import {
  BASE_IMAGE_URL,
  BASE_IMAGE_URL_2,
  BASE_IMAGE_URL_3,
} from '../../services/movie.api';

const ImageComponent = ({ resizeLayout, index, movie }) => {
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   const loadImage = async () => {
  //     try {
  //       const response = await fetch(
  //         BASE_IMAGE_URL +
  //           (resizeLayout
  //             ? movie.poster_url
  //             : index === 0
  //             ? movie.poster_url
  //             : movie.thumb_url),
  //       );
  //       if (response.ok) {
  //         setImageUrl(
  //           BASE_IMAGE_URL +
  //             (resizeLayout
  //               ? movie.poster_url
  //               : index === 0
  //               ? movie.poster_url
  //               : movie.thumb_url),
  //         );
  //       } else {
  //         setImageUrl(
  //           BASE_IMAGE_URL_2 +
  //             (resizeLayout
  //               ? movie.poster_url
  //               : index === 0
  //               ? movie.poster_url
  //               : movie.thumb_url),
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Error loading image:', error);
  //       setImageUrl(
  //         BASE_IMAGE_URL_2 +
  //           (resizeLayout
  //             ? movie.poster_url
  //             : index === 0
  //             ? movie.poster_url
  //             : movie.thumb_url),
  //       );
  //     }
  //   };

  //   loadImage();
  // }, [resizeLayout, index, movie]);

  return (
    <img
      src={
        resizeLayout
          ? BASE_IMAGE_URL_3 + movie.poster_url
          : BASE_IMAGE_URL_3 + movie.thumb_url
      }
      alt={movie.name}
      loading='lazy'
      className='w-full object-cover h-full group-hover:scale-110 transition-all duration-500'
    />
  );
};

export default ImageComponent;
