import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdultSection from './pages/AdultSection';
import SearchResults from './pages/Search';
import Detail from './pages/Detail';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <Router>
            <div className="App">
                <MyNavbar theme={theme} toggleTheme={toggleTheme} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/adult" element={<AdultSection />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/anime/:id" element={<Detail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
