import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { commentsMovie } from '../../../services/auth';
import { io } from 'socket.io-client';
export default function Comment({ slug }) {
  const local = JSON.parse(localStorage.getItem('dataUser'));
  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    newSocket.on('comments', (data) => {
      setComments(data);
    });

    newSocket.emit('comments', slug);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        message: e.target.comment.value,
        slug: slug,
        idUser: local.id,
      };
      try {
        const response = await commentsMovie(data);
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },
    [local, slug],
  );
  return (
    <section className='h-auto min-h-[400px]'>
      <h2>Bình luận</h2>
      <form action='POST' onSubmit={handleSubmit}>
        <input
          type='text'
          name='comment'
          id='comment'
          className='px-4 my-2 rounded-md mx-2 bg-[#1f1f1f]'
        />
        <button type='submit'>Send</button>
      </form>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.message}</p>
          <p>Người dùng: {comment.idUser}</p>
        </div>
      ))}
    </section>
  );
}
