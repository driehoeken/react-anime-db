import React, { Component } from "react";
import "./AnimeCard.css";

const AnimeCard = () => {
  return (
    <div className="anime-card">
      <img
        className="anime-card-cover"
        src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b5-Zs2cbrglTu67.png"
        alt="Cowboy Bebop: Tengoku no Tobira"
      />
      <p className="anime-card-title">Cowboy Bebop: Tengoku no Tobira</p>
    </div>
  );
};

export default AnimeCard;
