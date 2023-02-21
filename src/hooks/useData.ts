import { useEffect, useState } from 'react';

export const useData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        setIsLoading(true);
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (!ignore) {
              setData(data);
              setIsLoading(false);
            }
          });
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return {
    data,
    setData,
    isLoading,
    isError,
  };
};
