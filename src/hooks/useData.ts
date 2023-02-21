import { useEffect, useState } from 'react';

export const useData = (url: string) => {
  const [data, setData] = useState<any>(null); // Should use generic type, instead of any, To-Do why T is undefined in this env
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
