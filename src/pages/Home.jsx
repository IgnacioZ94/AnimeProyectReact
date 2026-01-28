import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopAnime } from '../services/api';

const Home = () => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopAnime()
            .then(response => setAnimes(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container">
            <h2 className="mb-4">Top Animes</h2>
            <div className="row">
                {animes.map(anime => (
                    <div className="col-md-3 mb-4" key={anime.id || anime.mal_id}>
                        <Link to={`/anime/${anime.id || anime.mal_id}`} className="text-decoration-none text-dark">
                            <div className="card anime-card h-100 shadow-sm">
                                <img src={anime.imageUrl} className="card-img-top" alt={anime.title} />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{anime.title}</h5>
                                    <p className="card-text text-muted">⭐ {anime.score}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
