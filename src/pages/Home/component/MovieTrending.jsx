import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getPopulerMovie } from "../../../components/services/UserService";
import styles from './style.module.scss'
import classNames from 'classnames/bind';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const cx = classNames.bind(styles)
function MovieNew() {
    const [newMovie,setNewMovie] = useState([])
    const [widthScreen,setWidthScreen] = useState(window.innerWidth)
useEffect(()=>{
 ApiKey()
},[])
useEffect(()=>{
  const handleResize = ()=>{
    setWidthScreen(window.innerWidth)
  }
window.addEventListener("resize",handleResize)

return ()=> window.removeEventListener("resize",handleResize)
},[])
const ApiKey = async () => {
 try {
   let res = await getPopulerMovie()
   setNewMovie(res.data.results);
 } catch (error) {
   console.error(error);
 }
 
}

   return ( 
    <Carousel className={cx('Introduction')} interval='5000'  controls={false} touch={true}>
    {newMovie.map((item) => (
      <Carousel.Item key={item.id} className={cx('slide-show')}>
        <div className={cx('box-slide')}>
            <div className={cx('title-new-movie')}>
                <div className={cx('name-movie')}>
              <div className={cx('poster-image')}>
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
              </div>
              <div className={cx('overview')}>
                <h1 style={{color:'white'}}>{item.original_title}</h1>
                <p>Rankting :{' '}{item.vote_average} {''} <StarIcon style={{fontSize:'1em' ,marginTop:'-2px'}}/>
                </p>
                <p>Vote : {item.vote_count} {' '} <ThumbUpIcon style={{fontSize:'1em' ,marginTop:'-2px'}}/></p>
                <p className={cx('overview-movie')}>{item.overview}</p>
                <button className={cx('btn-ct')}>Xem chi tiết</button>
                </div></div>
            </div>
          <img
            src={widthScreen >= 768 ?  `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            :
            `https://image.tmdb.org/t/p/original${item.poster_path}`
            
          }
            alt=""
            className={cx('box-image') }
          />
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
);
}

export default MovieNew;