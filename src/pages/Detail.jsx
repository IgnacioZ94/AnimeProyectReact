import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimeById } from '../services/api';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnimeById(id)
            .then(response => setAnime(response.data))
            .catch(error => {
                console.error(error);
                alert("Anime no encontrado");
                navigate('/');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Cargando detalles...</p></div>;
    if (!anime) return null;

    return (
        <div className="container mt-5 pb-5">
            <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>&larr; Volver</button>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={anime.imageUrl}
                        className="img-fluid rounded shadow-lg"
                        alt={anime.title}
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="fw-bold">{anime.title}</h1>
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge bg-warning text-dark me-2">⭐ {anime.score || 'N/A'}</span>
                        <span className="badge bg-info">{anime.rating || 'Rating N/A'}</span>
                    </div>
                    <h4>Sinopsis</h4>
                    <p className="lead" style={{ textAlign: 'justify' }}>
                        {anime.synopsis || 'Sin descripción disponible.'}
                    </p>

                    {anime.trailerUrl && (
                        <div className="mt-4">
                            <a
                                href={anime.trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-danger btn-lg shadow"
                            >
                                <i className="bi bi-play-fill"></i> Ver Trailer en YouTube
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detail;
