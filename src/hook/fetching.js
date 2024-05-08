import { useEffect, useState } from 'react';

export default function useFetching(fcGet) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fcGet;
        if (response.status === 'success') {
          setData(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fcGet]);
  return { data, error, loading };
}
