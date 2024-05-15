import React from 'react';
import { BASE_IMAGE_URL_3 } from '../../services/movie.api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingLayout from '../LoadingElement/loadingLayout';
const Image = ({ resizeLayout, movie, className }) => {
  return (
    <LazyLoadImage
      src={
        !resizeLayout
          ? BASE_IMAGE_URL_3 + movie.poster_url
          : BASE_IMAGE_URL_3 + movie.thumb_url
      }
      alt={movie.name}
      loading='lazy'
      effect='opacity'
      delayTime='300'
      className={className}
    />
  );
};

export default Image;
export const Placeholder = () => <LoadingLayout />;
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
