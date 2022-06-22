import React, { Component } from "react";
import "./AnimeCard.css";

const AnimeCard = (props) => {
    return (
        <div className="anime-card">
            <img
                className="anime-card-cover"
                src={props.animeData.coverImage.large}
                alt={props.animeData.title.romaji}
            />
            <p className="anime-card-title">{props.animeData.title.romaji}</p>
        </div>
    );
};

export default AnimeCard;
