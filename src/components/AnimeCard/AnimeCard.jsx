import React, { Component } from "react";
import "./AnimeCard.css";
import { Link } from "react-router-dom";

const setDate = (animeData) => {
    const status = animeData.status;
    const endYear = animeData.endDate.year;
    const startYear = animeData.startDate.year;
    const seasonYear = animeData.seasonYear;
    const season = animeData.season;
    const nextEp = animeData.nextAiringEpisode;

    let episodeNo;
    let timeToNextEp;
    let daysToNextEp;
    let hoursToNextEp;

    if (nextEp !== null) {
        episodeNo = nextEp.episode;
        timeToNextEp = nextEp.timeUntilAiring;
        daysToNextEp = Math.floor(timeToNextEp / 86400);
        hoursToNextEp = Math.floor((timeToNextEp - daysToNextEp * 86400) / 3600);
    }

    if (status === "FINISHED") {
        if (endYear - startYear >= 2) {
            return `${startYear} - ${endYear}`;
        } else {
            return `${seasonYear} ${season}`;
        }
    } else if (status === "RELEASING") {
        return setEpAiringMessage(daysToNextEp, hoursToNextEp, episodeNo);
    } else if (status === "NOT_YET_RELEASED") {
        if (nextEp !== null) {
            return setEpAiringMessage(daysToNextEp, hoursToNextEp, episodeNo);
        } else if (animeData.season !== null) {
            return `${seasonYear} ${season}`;
        } else if (startYear !== null) {
            return `${startYear}`;
        } else {
            return `TBA`;
        }
    } else if (status === "CANCELLED") {
        if (animeData.season !== null) {
            return `${seasonYear} ${season}`;
        } else if (startYear !== null) {
            return `${startYear}`;
        } else {
            return `Cancelled`;
        }
    }

    function setEpAiringMessage(days, hours, ep) {
        let outcome = `${ep} episode in `;
        if (days === 1) {
            outcome += `${days} day `;
        } else if (days > 1) {
            outcome += `${days} days `;
        }

        if (days !== 0 && hours !== 0) {
            outcome += "and ";
        }

        if (hours === 1) {
            outcome += `${hours} hour`;
        } else if (hours > 1) {
            outcome += `${hours} hours`;
        }

        if (days === 0 && hours === 0) {
            outcome = `${ep} episode in less than hour!`;
        }
        return outcome;
    }
};

const AnimeCard = (props) => {
    const animeData = props.animeData;
    return (
        <div className="anime-card">
            <div className="anime-card-cover-wrapper">
                <img
                    className="anime-card-cover"
                    src={animeData.coverImage.large}
                    alt={animeData.title.romaji}
                />
            </div>
            <p className="anime-card-title">{animeData.title.romaji}</p>
            <div className="anime-card-hover-data">
                <p className="anime-card-hover-date">{setDate(animeData)}</p>
                <p className="anime-card-hover-episodes">{/*props.animeData.episodes*/}</p>
                <div className="anime-card-hover-genres"></div>
            </div>
        </div>
    );
};

export default AnimeCard;
