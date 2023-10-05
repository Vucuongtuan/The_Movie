import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getTVMovie } from "../../../components/services/UserService";


function MovieSeries() {
    const [dataMovieSeries,setDataMovieSeries] = useState([])

    useEffect(()=>{
        getDataMovie()
    },[])
    // console.log(data);
    const getDataMovie = async()=>{
        let getdata = await getTVMovie()
        let result = getdata.data.results 
        const data = result.slice(0,10)
        setDataMovieSeries(data)
    }
console.log(dataMovieSeries);
    return ( 
        <Container>
            <div className="flex justify-between">
        <h2>TV Movie</h2> 
        <button className='h-[30px] w-24 mt-2  rounded-md border-1  border-current'>Xem Thêm</button>
        </div>
        <br/>
        <div className='h-[650px] grid grid-cols-5 gap-x-3 gap-y-4'>
{dataMovieSeries.map((item,index)=>(
            <div className='h-full w-full m-auto flex flex-col' key={index}>
                <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt=""
                className='h-[85%] w-full rounded-md'
                />
                <label className='text-xl h-[15%]'>{item.title}</label>
            </div>
))}
        </div>
        </Container>
     );
}

export default MovieSeries;