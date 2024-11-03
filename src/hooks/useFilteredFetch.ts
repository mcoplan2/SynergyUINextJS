import { useState, useEffect } from 'react';
import { useUser } from '@/src/context/UserContext';

type FetchFunction<T> = (user: any, ...args: any[]) => Promise<T>;

export default function useFilteredFetch<T>(
    fetchFunction: FetchFunction<T>,
    selectedLetter: string,
    selectedSearch: string
) {
    const { user } = useUser();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setIsLoading(true);
                try {
                    const result = await fetchFunction(user, selectedLetter, selectedSearch);
                    setData(result);
                } catch (err) {
                    setError(err as Error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [user, fetchFunction, selectedLetter, selectedSearch]);

    return { data, isLoading, error };
}
