import React, { useEffect, useState } from 'react';
import ProfileLayout from '../layout';
import { getListMovies } from '../../../services/auth';
import { BASE_IMAGE_URL_3 } from '../../../services/movie.api';

export default function ListMovieProfile() {
  const local = JSON.parse(localStorage.getItem('dataUser'));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getListMovies(local.id);
        if (res.data.status === 'failed') {
          alert(res.data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setData(res.data.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <ProfileLayout>
      <section className='px-4 flex-grow'>
        <h1 className='text-3xl font-medium'>Danh sách phim</h1>
        <div className='overflow-y-scroll h-auto max-h-[500px] w-full grid grid-cols-2 space-x-2 space-y-2 py-2'>
          {loading ? (
            <>Loading ...</>
          ) : (
            data &&
            data.list &&
            data.list.map((item) => {
              const dateString = item.create_date;
              const dateObject = new Date(dateString);

              const year = dateObject.getFullYear();
              const month = dateObject.getMonth() + 1;
              const day = dateObject.getDate();
              const hours = dateObject.getHours();
              const minutes = dateObject.getMinutes();
              const seconds = dateObject.getSeconds();
              const formattedDate = `${day}/${month}/${year} `;
              return (
                <div className='flex w-[500px] group' key={item.slug}>
                  <div className='h-full w-[40%]   rounded-md overflow-hidden'>
                    <img
                      src={BASE_IMAGE_URL_3 + item.thumb_url}
                      alt={item.name}
                      className='h-full  transition-transform duration-300 transform group:scale-110'
                    />
                  </div>
                  <div className='w-[60%] px-2'>
                    <h4 className=' font-semibold text-lg'>{item.name}</h4>
                    <p className='text-sm'>
                      Tập :<span className='px-2 '>{item.tap}</span>
                    </p>
                    <p className='text-sm'>
                      Ngày thêm :<span className='px-2 '>{formattedDate}</span>
                    </p>
                    <p className='text-sm'>
                      Giờ thêm :
                      <span className='px-2 '>{`(${hours}:${minutes}:${seconds})`}</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </ProfileLayout>
  );
}
