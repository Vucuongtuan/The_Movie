import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Poster() {
  const { id } = useParams();
  const [poster, setPoster] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [selectImage, setSelectImage] = useState('');
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=e9e9d8da18ae29fc430845952232787c`,
      )
      .then((res) => {
        setPoster(res.data.backdrops);
      });
  }, [id]);
  const handleOpenImage = (url) => {
    setOpenImage(!openImage);
    setSelectImage(url);
  };
  const urlImage = 'https://image.tmdb.org/t/p/original';
  console.log(poster);
  return (
    <div className='w-full h-[600px] grid grid-cols-5 grid-rows-4 gap-3'>
      {poster.slice(0, 15).map((item, index) => (
        <div key={index} className='relative rounded-md'>
          <img
            src={`${urlImage}${item.file_path}`}
            alt=''
            className='w-full h-full object-cover'
            onClick={() => handleOpenImage(item.file_path)}
          />
        </div>
      ))}
      {openImage && (
        <Modal
          size='xl'
          show={openImage}
          onHide={handleOpenImage}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img src={`${urlImage}${selectImage}`} alt='' />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Poster;
