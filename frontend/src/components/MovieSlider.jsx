import { useEffect, useRef, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV shows';
  const formattedCategory =
    category.replaceAll('_', ' ')[0].toUpperCase() +
    category.replaceAll('_', ' ').slice(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(response.data.content);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const checkScroll = () => {
    if (sliderRef.current) {
      setCanScrollLeft(sliderRef.current.scrollLeft > 0);
      setCanScrollRight(
        sliderRef.current.scrollLeft + sliderRef.current.clientWidth <
          sliderRef.current.scrollWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
  }, [content]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', checkScroll);
    return () => slider.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategory} {formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hidden"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>
      {showArrows && canScrollLeft && (
        <button
          className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 cursor-pointer
            "
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {showArrows && canScrollRight && (
        <button
          className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 cursor-pointer
            "
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
