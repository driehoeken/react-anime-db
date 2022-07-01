import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnimePage.css";
import parse from "html-react-parser";
import {
    capitalizeOnlyFirst,
    formatAnimeFormat,
    formatAnimeStatus,
    minsToHoursAndMins,
    secsToHoursAndMins,
    setEpAiringMessage,
} from "../../misc";

const AnimePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpoilerTags, setShowSpoilerTags] = useState(false);
    const [showAdultTags, setShowAdultTags] = useState(false);
    const { id } = useParams();

    const updateAnimeData = async () => {
        const query = `{
            Media(id: ${id}){
                title {
                    romaji
                    english
                    native
                }
                  	format
                  	status
                  	description
                  	startDate {
                  	  year
                  	  month
                  	  day
                  	}
                  	endDate {
                  	  year
                  	  month
                  	  day
                  	}
                  	season
                  	seasonYear
                  	episodes
                  	duration
                  	trailer {
                  	  site
                  	  id
                  	}
                  	coverImage {
                  	  extraLarge
                  	  large
                  	  medium
                  	  color
                  	}
                  	bannerImage
                  	genres
                  	averageScore
                  	tags {
                  	  id
                  	  name
                  	  isAdult
                  	  isMediaSpoiler
                      isGeneralSpoiler
                  	  rank
                  	  category
                  	}
                  	relations {
                  	  edges {
                  	    id
                  	    relationType
                  	  }
                  	  nodes{
                  	    id
                  	    title {
                  	      romaji
                  	      english
                  	      native
                  	      userPreferred
                  	    }
                  	  }
                  	}
                  	chapters
                  	staff {
                  	  edges {
                  	    id
                  	  }
                  	}
                  	studios {
                  	  edges {
                  	    id
                  	  }
                  	}
                  	isAdult
                  	nextAiringEpisode {
                  	  id
                      episode
                      timeUntilAiring
                  	}
                  	externalLinks {
                  	  id
                  	}
                  	streamingEpisodes {
                  	  title
                  	  thumbnail
                  	  url
                  	  site
                  	}
                  	recommendations {
                  	  edges {
                  	    node {
                  	      id
                  	    }
                  	  }
                  	}
					synonyms
            	}
        	}`;

        const url = "https://graphql.anilist.co";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        };

        const response = await fetch(url, options);
        const responseJson = await response.json();

        const outcome = responseJson.data.Media;
        setAnimeData(outcome);
        setLoading(false);
    };

    useEffect(() => {
        updateAnimeData();
    }, []);

    const renderBanner = () => {
        if (animeData.bannerImage) {
            return <img className="anime-banner" src={animeData.bannerImage} />;
        }
    };

    const renderUnderTitle = () => {
        const outcome = [formatAnimeFormat(animeData.format)];

        const startYear = animeData.startDate.year;
        const endYear = animeData.endDate.year;

        if (endYear - startYear >= 2) {
            outcome.push(`${startYear} - ${endYear}`);
        } else {
            outcome.push(`${capitalizeOnlyFirst(animeData.season)} ${animeData.seasonYear}`);
        }

        const episodes = animeData.episodes;

        if (animeData.format !== "MOVIE") {
            if (episodes) {
                if (episodes === 1) {
                    outcome.push(`1 episode`);
                } else {
                    outcome.push(`${episodes} episodes`);
                }
            }
        } else {
            outcome.push(minsToHoursAndMins(animeData.duration));
        }

        outcome.push(formatAnimeStatus(animeData.status));

        return outcome.map((info, index) => {
            return <li key={index}>{info}</li>;
        });
    };

    const renderInfos = () => {
        const result = [
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
            result.unshift({
                info: "Airing ",
                value:
                    lefTime !== 0
                        ? `${episode} episode in ${lefTime}`
                        : `${episode} episode in less than hour!`,
            });
        }
        const renderInside = () => {
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
            return result.map((data, index) => {
                if (data.value && animeData !== undefined) {
                    return (
                        <div className="anime-info" key={index}>
                            <span className="anime-info-type">{data.info}</span>
                            <span className="anime-info-value">{renderValue(data.value)}</span>
                        </div>
                    );
                }
            });
        };

        return <div className="anime-information">{renderInside()}</div>;
    };

    const renderTrailer = () => {
        if (animeData.trailer) {
            const site = animeData.trailer.site;
            const id = animeData.trailer.id;

            if (site === "youtube") {
                return (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );
            }
        }
    };

    const renderTags = (showSpoilers, showAdults) => {
        return animeData.tags.map((tag, index) => {
            if (
                ((showSpoilers === false && tag.isMediaSpoiler === false) || showSpoilers) &&
                ((showSpoilers === false && tag.isGeneralSpoiler === false) || showSpoilers) &&
                ((showAdults === false && tag.isAdult === false) || showAdults)
            ) {
                return (
                    <div className="anime-tag" key={index}>
                        <span
                            className={tag.isMediaSpoiler ? "tag-spoiler" : ""}
                        >{`${tag.name} ${tag.rank}%`}</span>
                    </div>
                );
            }
        });
    };

    const renderTagsToggle = () => {
        let spoilerTags = 0;
        let adultTags = 0;
        animeData.tags.forEach((tag) => {
            if (tag.isAdult) adultTags += 1;
            if (tag.isMediaSpoiler || tag.isGeneralSpoiler) spoilerTags += 1;
        });

        const renderTagToggle = (howManyTags, name, showTags, func) => {
            if (howManyTags > 0) {
                return (
                    <div className="anime-tag-toggle" onClick={func}>
                        {showTags ? "Hide" : "Show"}{" "}
                        {howManyTags !== 1 ? `${howManyTags} ${name} tags` : `${name} tag`}
                    </div>
                );
            }
        };

        if (spoilerTags > 0 || adultTags > 0) {
            return (
                <div>
                    {renderTagToggle(spoilerTags, "spoiler", showSpoilerTags, () => {
                        if (showSpoilerTags) setShowSpoilerTags(false);
                        else setShowSpoilerTags(true);
                    })}
                    {renderTagToggle(adultTags, "adult", showAdultTags, () => {
                        if (showAdultTags) setShowAdultTags(false);
                        else setShowAdultTags(true);
                    })}
                </div>
            );
        }
    };

    const renderAnimePage = () => {
        if (!loading) {
            return (
                <React.Fragment>
                    {renderBanner()}
                    <div className="main-section">
                        <div className="anime-main-left">
                            <img src={animeData.coverImage.extraLarge} className="anime-cover" />
                            {renderInfos()}
                        </div>
                        <div className="anime-main-right">
                            <h1 className="anime-main-title">{animeData.title.romaji}</h1>
                            <ul className="anime-under-title">{renderUnderTitle()}</ul>
                            <div className="anime-main-genres">
                                {animeData.genres.map((genre, index) => {
                                    return (
                                        <a className="anime-genre" key={index}>
                                            {genre}
                                        </a>
                                    );
                                })}
                            </div>
                            <p className="anime-main-desc">{parse(animeData.description)}</p>
                            <div className="anime-trailer">{renderTrailer()}</div>
                            <div className="anime-tags-wrapper">
                                <h2>Tags</h2>
                                <div className="anime-tags">
                                    {renderTags(showSpoilerTags, showAdultTags)}
                                </div>
                            </div>
                            {renderTagsToggle()}
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return <p>loading...</p>;
        }
    };

    return <React.Fragment>{renderAnimePage()}</React.Fragment>;
};

export default AnimePage;
