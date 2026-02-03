import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyNavbar = ({ theme, toggleTheme }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search)}`);
            setSearch('');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg mb-4 sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/" style={{ color: 'var(--primary-color)' }}>AnimePro</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{ color: 'var(--text-main)' }}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalog" style={{ color: 'var(--text-main)' }}>Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adult" style={{ color: 'var(--text-main)' }}>+18</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <div className="form-check form-switch me-3 pt-1">
                            <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="themeSwitch"
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                style={{ cursor: 'pointer' }}
                            />
                            <label className="form-check-label small ms-1" htmlFor="themeSwitch" style={{ cursor: 'pointer', minWidth: '60px', color: 'var(--text-main)' }}>
                                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                            </label>
                        </div>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar anime..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;
