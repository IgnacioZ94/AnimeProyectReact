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
            <button className="btn btn-outline-primary mb-4 border-0" onClick={() => navigate(-1)}>
                <span className="me-2">&larr;</span> Volver
            </button>
            <div className="row g-5">
                <div className="col-md-5">
                    <img
                        src={anime.imageUrl}
                        className="img-fluid rounded-4 shadow-lg w-100"
                        alt={anime.title}
                        style={{ border: '1px solid var(--nav-border)' }}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="fw-black mb-1" style={{ color: 'var(--text-main)', fontSize: '3rem' }}>{anime.title}</h1>
                    <div className="d-flex align-items-center mb-4 gap-2">
                        <span className="badge rounded-pill bg-warning text-dark px-3 py-2">⭐ {anime.score || 'N/A'}</span>
                        <span className="badge rounded-pill bg-primary px-3 py-2">{anime.rating || 'Rating N/A'}</span>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: 'var(--text-main)' }}>Sinopsis</h4>
                    <p className="lead mb-4" style={{ textAlign: 'justify', color: 'var(--text-muted)', lineHeight: '1.8' }}>
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
