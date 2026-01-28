import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAnime } from '../services/api';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            searchAnime(query)
                .then(response => setAnimes(response.data))
                .catch(error => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [query]);

    if (!query) return <div className="container mt-5">Ingrese una búsqueda.</div>;
    if (loading) return <div className="text-center mt-5">Buscando...</div>;

    return (
        <div className="container">
            <h2 className="mb-4">Resultados para: {query}</h2>
            <div className="row">
                {animes.map(anime => (
                    <div className="col-md-3 mb-4" key={anime.id || anime.mal_id}>
                        <Link to={`/anime/${anime.id || anime.mal_id}`} className="text-decoration-none text-dark">
                            <div className="card anime-card h-100 shadow-sm">
                                <img src={anime.imageUrl} className="card-img-top" alt={anime.title} />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{anime.title}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
