import "./App.css";
import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimePage from "./components/AnimePage/AnimePage";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/anime/:id/*" element={<AnimePage />} />
                    <Route path="/anime/:id/:name/*" element={<AnimePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
