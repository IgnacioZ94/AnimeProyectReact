import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export const getTopAnime = () => api.get('/Anime/top');
export const searchAnime = (query, sfw = false) => api.get(`/Anime/search`, { params: { query, sfw } });
export const getCatalog = (query) => api.get('/Catalog', { params: { q: query } });
export const getAnimeById = (id) => api.get(`/Anime/${id}`);

export default api;
