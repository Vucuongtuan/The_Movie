import MovieCartoon from "./component/MovieCartoon";
import MovieTopRated from "./component/MovieTopRated";
import {MovieNew, MovieSeries,MoviePopular} from "./component/index";


function HomePage() {
    return ( 
<>
  <MovieNew/>
  <br/>
  <div className="m-auto sm:w-[95%] sm:mt-[20px] lg:w-[80%] xl-[80%]">
  <MoviePopular/>
  <br/>
  <MovieSeries/>
  <br/>
  <MovieTopRated/>
  <br />
  <MovieCartoon/>
  </div>
</>
     );
}

export default HomePage;