import React, { Component } from "react";
import AnimeCard from "../AnimeCard/AnimeCard";
import "./AnimeList.css";

const AnimeList = (props) => {
    return (
        <div className={props.listClass + " anime-list"}>
            {props.animes.map((anime, index) => {
                return <AnimeCard key={index} animeData={anime} />;
            })}
        </div>
    );
};

export default AnimeList;
