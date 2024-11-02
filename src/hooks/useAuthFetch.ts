import { useState, useEffect } from 'react';

type FetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export default function useAuthFetch<T>(
  fetchFunction: (user: any) => Promise<T>,
  user: any
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const result = await fetchFunction(user);
          setData(result);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [fetchFunction, user]);

  return { data, isLoading, error };
}