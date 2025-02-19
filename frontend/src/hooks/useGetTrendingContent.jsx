import { useEffect, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
  const { contentType } = useContentStore();
  const [trendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(response.data.content);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
