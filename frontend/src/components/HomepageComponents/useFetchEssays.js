import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.ALLOCATED_PORT}`;


export const useFetchEssays = () => {
  const [essays, setEssays] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getEssays/getdata`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEssays(response.data.essays);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchEssays();
  }, []);

  return { essays, error, isLoading };
};
