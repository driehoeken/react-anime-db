import React from "react";
import "./AnimeCard.css";
import { Link } from "react-router-dom";
import {
    formatAnimeFormat,
    minsToHoursAndMins,
    secsToHoursAndMins,
    setEpAiringMessage,
} from "../../../misc";

//setting date on hover
const setDate = (animeData) => {
    const status = animeData.status;
    const endYear = animeData.endDate.year;
    const startYear = animeData.startDate.year;
    const seasonYear = animeData.seasonYear;
    const season = animeData.season;
    const nextEp = animeData.nextAiringEpisode;

    if (status === "FINISHED") {
        //if anime was being released for 2 years or more it will be sth like '2016 - 2019'
        if (endYear - startYear >= 2) {
            return `${startYear} - ${endYear}`;
        }
        //otherwise year and season
        else {
            return `${seasonYear} ${season}`;
        }
    }
    //if anime is being released it will show time to the next ep
    else if (status === "RELEASING") {
        return setEpAiringMessage(
            animeData.nextAiringEpisode.episode,
            secsToHoursAndMins(animeData.nextAiringEpisode.timeUntilAiring)
        );
    }
    //it will show the most accurate time we know the anime will be released
    else if (status === "NOT_YET_RELEASED") {
        if (nextEp) {
            return setEpAiringMessage(
                animeData.nextAiringEpisode.episode,
                secsToHoursAndMins(animeData.nextAiringEpisode.timeUntilAiring)
            );
        } else if (animeData.season !== null) {
            return `${seasonYear} ${season}`;
        } else if (startYear !== null) {
            return `${startYear}`;
        } else {
            return `TBA`;
        }
    }
    //again the most accurate data about time we know
    else if (status === "CANCELLED") {
        if (animeData.season !== null) {
            return `${seasonYear} ${season}`;
        } else if (startYear !== null) {
            return `${startYear}`;
        } else {
            return `Cancelled`;
        }
    }
};

//setting episodes on hover
const setEpisodes = (animeData) => {
    const episodes = animeData.episodes;
    const format = animeData.format;
    if (episodes !== null) {
        //plural etc
        if (episodes !== 1) {
            return ` - ${episodes} episodes`;
        } else if (episodes === 1 && format !== "MOVIE") {
            return ` - 1 episode`;
            //if the format is movie it will show how long is movie
        } else {
            return `${minsToHoursAndMins(animeData.duration)}`;
        }
    }
};
const setFormat = (format) => {
    if (format) {
        if (format !== "MOVIE") {
            return `${formatAnimeFormat(format)}`;
        }
    }
};
const AnimeCard = (props) => {
    const animeData = props.animeData;
    return (
        <div className="anime-card">
            <div className="anime-card-cover-wrapper">
                <Link to={`/anime/${animeData.id}`}>
                    <img
                        className="anime-card-cover"
                        src={animeData.coverImage.large}
                        alt={animeData.title.romaji}
                    />
                </Link>
            </div>
            <p className="anime-card-title">
                <Link to={`/anime/${animeData.id}`}>{animeData.title.romaji}</Link>
            </p>
            <Link to={`/anime/${animeData.id}`}>
                <div className="anime-card-hover-data">
                    <p className="anime-card-hover-date">{setDate(animeData)}</p>
                    <p className="anime-card-hover-format-episodes">
                        {setFormat(animeData.format)}
                        {setEpisodes(animeData)}
                    </p>
                    <div className="anime-card-hover-genres">
                        {animeData.genres.map((genre) => {
                            return (
                                <span className="anime-card-hover-genre" key={genre}>
                                    {genre}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AnimeCard;
