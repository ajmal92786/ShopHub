import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}${endpoint}`);

        if (!res.ok) {
          let errorMessage = `Error ${res.status}`;

          try {
            const errorBody = await res.json();
            errorMessage = errorBody?.message || errorMessage;
          } catch (error) {}

          throw new Error(errorMessage);
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
