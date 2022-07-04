import React from "react";
import "./UnderTitle.css";
import {
    capitalizeOnlyFirst,
    formatAnimeFormat,
    formatAnimeStatus,
    minsToHoursAndMins,
} from "../../../misc";
const UnderTitle = (props) => {
    const format = props.format;
    const startYear = props.startYear;
    const endYear = props.endYear;
    const season = props.season;
    const seasonYear = props.seasonYear;
    const duration = props.duration;
    const status = props.status;
    const episodes = props.episodes;
    const outcome = [formatAnimeFormat(format)];

    if (endYear - startYear >= 2) {
        outcome.push(`${startYear} - ${endYear}`);
    } else {
        outcome.push(`${capitalizeOnlyFirst(season)} ${seasonYear}`);
    }

    if (format !== "MOVIE") {
        if (episodes) {
            if (episodes === 1) {
                outcome.push(`1 episode`);
            } else {
                outcome.push(`${episodes} episodes`);
            }
        }
    } else {
        outcome.push(minsToHoursAndMins(duration));
    }

    outcome.push(formatAnimeStatus(status));

    return (
        <ul className="anime-under-title">
            {outcome.map((info, index) => {
                return <li key={index}>{info}</li>;
            })}
        </ul>
    );
};

export default UnderTitle;
