import React, { Component } from "react";
import "./AnimeCard.css";
import { Link } from "react-router-dom";

const setDate = (animeData) => {
    const status = animeData.status;
    const endYear = animeData.endDate.year;
    const startYear = animeData.startDate.year;
    const seasonYear = animeData.seasonYear;
    const season = animeData.season;
    const timeToNextEp = animeData.nextAiringEpisode.timeUntilAiring;
    const nextEp = animeData.nextAiringEpisode.episode;

    if (status === "FINISHED") {
        if (endYear - startYear >= 2) {
            return `${startYear} - ${endYear}`;
        } else {
            return `${seasonYear} ${season}`;
        }
    } else if (status === "RELEASING") {
        const daysToNextEp = Math.floor(timeToNextEp / 86400);
        const hoursToNextEp = Math.floor((timeToNextEp - daysToNextEp * 86400) / 3600);
        let outcome = `${nextEp} episode in `;
        if (daysToNextEp === 1) {
            outcome += `${daysToNextEp} day `;
        } else if (daysToNextEp > 1) {
            outcome += `${daysToNextEp} days `;
        }

        if (daysToNextEp !== 0 && hoursToNextEp !== 0) {
            outcome += "and ";
        }

        if (hoursToNextEp === 1) {
            outcome += `${hoursToNextEp} hour`;
        } else if (hoursToNextEp > 1) {
            outcome += `${hoursToNextEp} hours`;
        }

        if (daysToNextEp === 0 && hoursToNextEp === 0) {
            outcome = `${nextEp} episode in less than hour!`;
        }
        return outcome;
    } else if (status === "NOT_YET_RELEASED") {
    } else if (status === "CANCELLED") {
    }
};

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
            <div className="anime-card-hover-data">
                <p className="anime-card-hover-date">
                    {props.animeData.seasonYear} {props.animeData.season}
                </p>
                <p className="anime-card-hover-episodes">{props.animeData.episodes}</p>
                <div className="anime-card-hover-genres"></div>
            </div>
        </div>
    );
};

export default AnimeCard;
