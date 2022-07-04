import React from "react";
import "./Information.css";
import {
    capitalizeOnlyFirst,
    formatAnimeFormat,
    formatAnimeStatus,
    minsToHoursAndMins,
    secsToHoursAndMins,
} from "../../../misc";
const Information = (props) => {
    //setting all data
    const animeData = props.data;
    const data = [
        {
            info: "Format: ",
            value: formatAnimeFormat(animeData.format),
        },
        {
            info: "Status: ",
            value: formatAnimeStatus(animeData.status),
        },
        {
            info: "Romaji: ",
            value: animeData.title.romaji,
        },
        {
            info: "English: ",
            value: animeData.title.english,
        },
        {
            info: "Native: ",
            value: animeData.title.native,
        },
        {
            info: "Synonyms: ",
            value: animeData.synonyms,
        },
        {
            info: "Episodes: ",
            value: animeData.episodes,
        },
        {
            info: "Episode duration: ",
            value: minsToHoursAndMins(animeData.duration),
        },
        {
            info: "Average Score: ",
            value:
                (animeData.averageScore / 10) % 1 === 0
                    ? `${animeData.averageScore / 10}.0`
                    : animeData.averageScore / 10,
        },
        {
            info: "Premiered: ",
            value: `${capitalizeOnlyFirst(animeData.season)} ${animeData.seasonYear}`,
        },
        {
            info: "Start date: ",
            value: animeData.startDate.year
                ? `${animeData.startDate.day}.${animeData.startDate.month}.${animeData.startDate.year}`
                : null,
        },
        {
            info: "End date: ",
            value: animeData.endDate.year
                ? `${animeData.endDate.day}.${animeData.endDate.month}.${animeData.endDate.year}`
                : null,
        },
    ];
    if (animeData.nextAiringEpisode) {
        const episode = animeData.nextAiringEpisode.episode;
        const lefTime = secsToHoursAndMins(animeData.nextAiringEpisode.timeUntilAiring);
        data.unshift({
            info: "Airing ",
            value:
                lefTime !== 0
                    ? `${episode} episode in ${lefTime}`
                    : `${episode} episode in less than hour!`,
        });
    }
    //render
    const renderValue = (value) => {
        if (!Array.isArray(value)) {
            return value;
        } else {
            let result = "";
            value.forEach((val) => {
                result += `${val}, `;
            });
            result = result.slice(0, -2);
            return result;
        }
    };
    return (
        <div className="anime-information">
            {data.map((info, index) => {
                if (info.value && animeData !== undefined) {
                    return (
                        <div className="anime-info" key={index}>
                            <span className="anime-info-type">{info.info}</span>
                            <span className="anime-info-value">{renderValue(info.value)}</span>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Information;
