import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCatalog } from '../services/api';

const Catalog = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const fetchCatalog = (q = '') => {
        setLoading(true);
        getCatalog(q)
            .then(response => setCatalogs(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCatalog();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCatalog(query);
    };

    return (
        <div className="container">
            <h2 className="mb-4">Catálogo</h2>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar en catálogo..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Buscar</button>
                </div>
            </form>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="row">
                    {catalogs.map(item => (
                        <div className="col-md-3 mb-4" key={item.operationId}>
                            <Link to={`/anime/${item.animeId}`} className="text-decoration-none text-dark">
                                <div className="card h-100 anime-card shadow-sm">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                                    ) : (
                                        <div className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white">
                                            No Image
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">{item.name}</h5>
                                        <p className="card-text text-muted small">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalog;
