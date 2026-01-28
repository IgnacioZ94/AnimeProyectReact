import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAnime } from '../services/api';

const AdultSection = () => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Warning: This endpoint uses sfw=true as per requirements for "+18" section label
        searchAnime('', true)
            .then(response => setAnimes(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5">Loading content...</div>;

    return (
        <div className="container">
            <div className="alert alert-warning mb-4 shadow-sm" role="alert">
                Sección +18 (Safe for Work Mode Active)
            </div>
            <div className="row">
                {animes.map(anime => (
                    <div className="col-md-3 mb-4" key={anime.id || anime.mal_id}>
                        <Link to={`/anime/${anime.id || anime.mal_id}`} className="text-decoration-none text-dark">
                            <div className="card anime-card h-100 shadow-sm">
                                <img src={anime.imageUrl} className="card-img-top" alt={anime.title} />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{anime.title}</h5>
                                    <p className="card-text text-muted small">Rating: {anime.rating || 'N/A'}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdultSection;
