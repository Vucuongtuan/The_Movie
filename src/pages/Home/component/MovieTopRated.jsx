import { useEffect, useState } from "react";
import { getMOvieTopRated } from "../../../services/UserService";
import SkeletonLoading from "./Skeleton";


function MovieTopRated() {
const [dataMovieTopRated, setDataMovieTopRated] = useState([])
const [loading,setLoading] = useState(false)

useEffect(()=>{
    getdata()
},[])
const getdata = async ()=>{
    let res = await getMOvieTopRated()
    let result = res.data.results 
    const data = result.slice(0,10)
    setDataMovieTopRated(data)
    setLoading(true)

}
    return ( 
        <>
        <div className="flex justify-between">
    <h2>Xem nhiều</h2> 
    <button className='h-[30px] w-24 mt-2  rounded-md border-1  border-current'>Xem Thêm</button>
    </div>
    <br/>
    <div className='h-auto w-full grid gap-x-3 gap-y-4
     xl:grid-cols-5 
     lg:grid-cols-5  
     md:grid-cols-4
     sm:grid-cols-2
     '>
    {
loading ?
dataMovieTopRated.map((item,index)=>(
             <div className='h-full w-full m-auto flex flex-col cursor-pointer 
             md:grid-cols-2 
             sm:gird-cols-2
             ' key={index}>
             <div className="h-[85%] w-full overflow-hidden">
             <img
             src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
             alt=""
             className='h-full w-full rounded-md hover:scale-105 duration-500 ease-out'
             />
 </div>
             <span className='text-xl h-[15%] flex items-center'>{item.title}</span>
         </div>
))
:
<SkeletonLoading/>
}
    </div>
    </>
     );
}

export default MovieTopRated;