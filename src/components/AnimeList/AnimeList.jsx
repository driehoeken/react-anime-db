import React, { Component } from "react";
import AnimeCard from "../AnimeCard/AnimeCard";
import "./AnimeList.css";

const AnimeList = (props) => {
    return (
        <div className="anime-trending anime-list">
            {props.animes.data.Page.media.map((anime, index) => {
                return <AnimeCard animeData={anime} key={index} />;
            })}
        </div>
    );
};

export default AnimeList;
