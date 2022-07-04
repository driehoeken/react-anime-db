import React from "react";
import "./Banner.css";
const Banner = (props) => {
    if (props.src) {
        return <img className="anime-banner" src={props.src} />;
    }
};

export default Banner;
