import React, { useCallback, useEffect, useState } from 'react';
import ProfileLayout from '../layout';
import { deleteListMovies, getListMovies } from '../../../services/auth';
import { BASE_IMAGE_URL_3 } from '../../../services/movie.api';
import { Link } from 'react-router-dom';

export default function ListMovieProfile() {
  const local = JSON.parse(localStorage.getItem('dataUser'));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getListMovies(local.email);
        if (res.data.status === 'failed') {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleremoveMovie = useCallback(async (email, slug) => {
    const data = {
      email: email,
      slug: slug,
    };
    const res = await deleteListMovies(data);
    if (res.data.status === 'success') {
      alert('Đã xóa thành công');
    } else {
      alert('Xóa thất bại thử lại sau');
    }
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
                <div
                  className=' w-[500px] group bg-[#252323ee] rounded-lg relative'
                  key={item.slug}
                >
                  <Link to={`/details/${item.slug}`} className='flex'>
                    <div className='h-full w-[40%] rounded-s-xl overflow-hidden'>
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
                        Ngày thêm :
                        <span className='px-2 '>{formattedDate}</span>
                      </p>
                      <p className='text-sm'>
                        Giờ thêm :
                        <span className='px-2 '>{`${hours + ' giờ'} ${
                          minutes + ' phút'
                        } ${seconds + ' giây'}`}</span>
                      </p>
                      {localStorage.getItem(item.slug) && (
                        <p className='text-sm'>
                          Đang xem : {localStorage.getItem(item.slug)}
                        </p>
                      )}
                    </div>
                  </Link>
                  <button
                    title='Xóa phim khỏi danh sách'
                    className='bg-red-600 border-none  font-bold absolute bottom-2 right-2 px-6 rounded-lg border-2'
                    onClick={() => handleremoveMovie(data.email, item.slug)}
                  >
                    Xóa
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </ProfileLayout>
  );
}
