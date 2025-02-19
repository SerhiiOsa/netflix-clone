import { url } from '../config/tmdbUrls.js';
import { fetchFromTMDB } from '../services/tmdb.servise.js';
import User from '../models/user.model.js';

export const searchPerson = async (req, res) => {
  try {
    const query = req.params.query;

    const data = await fetchFromTMDB(url.searchPerson(query));

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const userId = req.user._id;
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].profile_path,
            title: data.results[0].name,
            searchType: 'person',
            createdAt: new Date(),
          },
        },
      }
    );

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getTrendingTV controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const query = req.params.query;

    const data = await fetchFromTMDB(url.searchMovie(query));

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const userId = req.user._id;
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].poster_path,
            title: data.results[0].title,
            searchType: 'movie',
            createdAt: new Date(),
          },
        },
      }
    );

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getTVTrailers controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const searchTv = async (req, res) => {
  try {
    const query = req.params.query;

    const data = await fetchFromTMDB(url.searchTv(query));

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const userId = req.user._id;
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].poster_path,
            title: data.results[0].name,
            searchType: 'tv',
            createdAt: new Date(),
          },
        },
      }
    );

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getTVDetails controller: ', error.message);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const searchHistory = req.user.searchHistory;
    res.status(200).json({ success: true, searchHistory });
  } catch (error) {
    console.error('Error in getSearchHistory controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = parseInt(req.params.id);

    await User.updateOne(
      { _id: userId },
      { $pull: { searchHistory: { id: itemId } } }
    );
    res
      .status(200)
      .json({ success: true, message: 'Item removed from search history' });
  } catch (error) {
    console.error('Error in getSearchHistory controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
