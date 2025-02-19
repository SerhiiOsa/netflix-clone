import { fetchFromTMDB } from '../services/tmdb.servise.js';
import { url } from '../config/tmdbUrls.js';

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(url.trendingMovie);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error('Error in getTrendingMovie controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.movieTrailers(id));

    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.error('Error in getMovieTrailers controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.movieDetails(id));

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error('Error in getMovieDetails controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.similarMovies(id));

    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.error('Error in getSimilarMovies controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const data = await fetchFromTMDB(url.moviesByCategorie(category));

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getMoviesByCategory controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
