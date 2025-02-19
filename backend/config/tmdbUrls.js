export const url = {
  trendingMovie:
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  movieTrailers: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
  movieDetails: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
  similarMovies: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
  moviesByCategorie: (category) =>
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,

  trendingTv: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  tvTrailers: (id) =>
    `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
  tvDetails: (id) => `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
  similarTvs: (id) =>
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
  tvsByCategorie: (category) =>
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,

  searchPerson: (query) =>
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US`,
  searchMovie: (query) =>
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`,
  searchTv: (query) =>
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`,
};
