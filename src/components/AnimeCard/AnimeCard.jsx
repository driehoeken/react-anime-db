import React, { Component } from "react";
import "./AnimeCard.css";
import { Link } from "react-router-dom";

//setting date on hover
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

    //if next airing episode exists, it will set some additional data
    if (nextEp !== null) {
        episodeNo = nextEp.episode;
        timeToNextEp = nextEp.timeUntilAiring;
        daysToNextEp = Math.floor(timeToNextEp / 86400);
        hoursToNextEp = Math.floor((timeToNextEp - daysToNextEp * 86400) / 3600);
    }

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
        return setEpAiringMessage(daysToNextEp, hoursToNextEp, episodeNo);
    }
    //it will show the most accurate time we know the anime will be released
    else if (status === "NOT_YET_RELEASED") {
        if (nextEp !== null) {
            return setEpAiringMessage(daysToNextEp, hoursToNextEp, episodeNo);
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

    function setEpAiringMessage(days, hours, ep) {
        //just things with plural etc

        let outcome = `${ep} episode in `;
        if (days === 1) {
            outcome += `${days} day `;
        } else if (days > 1) {
            outcome += `${days} days `;
        }

        //if both hours and minutes are not zero it will add and in order for better readability

        if (days !== 0 && hours !== 0) {
            outcome += "and ";
        }

        if (hours === 1) {
            outcome += `${hours} hour`;
        } else if (hours > 1) {
            outcome += `${hours} hours`;
        }

        //if days and hours are 0 it means that next ep will be released in less than hour
        if (days === 0 && hours === 0) {
            outcome = `${ep} episode in less than hour!`;
        }
        return outcome;
    }
};

//setting episodes on hover
const setEpisodes = (animeData) => {
    const episodes = animeData.episodes;
    const format = animeData.format;
    if (episodes !== null) {
        //plural etc
        if (episodes !== 1) {
            return `${episodes} episodes`;
        } else if (episodes === 1 && format !== "MOVIE") {
            return `1 episode`;
            //if the format is movie it will show how long is movie
        } else {
            const duration = animeData.duration;
            const hours = Math.floor(duration / 60);
            const minutes = duration - hours * 60;
            let outcome = "";

            if (hours === 1) {
                outcome += `1 hour`;
            } else if (hours > 1) {
                outcome += `${hours} hours`;
            }

            if (minutes === 1) {
                outcome += `, 1 minute`;
            } else if (minutes > 1) {
                outcome += `, ${minutes} minutes`;
            }
            return outcome;
        }
    } else {
        return "";
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
                <p className="anime-card-hover-format-episodes">
                    {animeData.format !== "MOVIE" ? animeData.status : ""} {setEpisodes(animeData)}
                </p>
                <div className="anime-card-hover-genres">
                    {animeData.genres.map((genre) => {
                        return `${genre} `;
                    })}
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;
