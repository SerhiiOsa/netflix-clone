import { url } from '../config/tmdbUrls.js';
import { fetchFromTMDB } from '../services/tmdb.servise.js';

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(url.trendingTv);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error('Error in getTrendingTv controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvTrailers = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.tvTrailers(id));

    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.error('Error in getTvTrailers controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.tvDetails(id));

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error('Error in getTvDetails controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSimilarTvs = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchFromTMDB(url.similarTvs(id));

    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.error('Error in getSimilarTvs controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const data = await fetchFromTMDB(url.tvsByCategorie(category));

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getTvsByCategory controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
