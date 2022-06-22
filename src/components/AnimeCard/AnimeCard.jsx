import React, { Component } from "react";
import "./AnimeCard.css";

const AnimeCard = (props) => {
    return (
        <div className="anime-card">
            <div className="anime-card-cover-wrapper">
                <img
                    className="anime-card-cover"
                    src={props.animeData.coverImage.large}
                    alt={props.animeData.title.romaji}
                />
            </div>
            <p className="anime-card-title">{props.animeData.title.romaji}</p>
            <div className="anime-card-hover-data"></div>
        </div>
    );
};

export default AnimeCard;
