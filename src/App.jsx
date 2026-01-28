import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdultSection from './pages/AdultSection';
import SearchResults from './pages/Search';
import Detail from './pages/Detail';

function App() {
    return (
        <Router>
            <div className="App">
                <MyNavbar />
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
