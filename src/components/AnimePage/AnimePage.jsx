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
} from "../../misc";
const AnimePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpoilerTags, setShowSpoilerTags] = useState(false);
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

    const Banner = (props) => {
        if (props.src) {
            return <img className="anime-banner" src={props.src} />;
        }
    };

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

    const Tags = (props) => {
        const Tag = (props) => {
            const tag = props.tag;
            return (
                <div className="anime-tag">
                    <span
                        className={tag.isMediaSpoiler ? "tag-spoiler" : ""}
                    >{`${tag.name} ${tag.rank}%`}</span>
                </div>
            );
        };
        const TagsToggle = (props) => {
            let spoilerTags = 0;
            props.tags.forEach((tag) => {
                if (tag.isMediaSpoiler || tag.isGeneralSpoiler) spoilerTags += 1;
            });

            if (spoilerTags > 0) {
                return (
                    <div
                        className="anime-tag-toggle"
                        onClick={() => {
                            if (props.showSpoilers) props.setShowSpoilerTags(false);
                            else props.setShowSpoilerTags(true);
                        }}
                    >
                        {props.showSpoilers ? "Hide" : "Show"}{" "}
                        {spoilerTags !== 1 ? `${spoilerTags} spoiler tags` : `spoiler tag`}
                    </div>
                );
            }
        };
        const showSpoilers = props.showSpoilers;
        return (
            <div className="anime-tags-wrapper">
                <h2>Tags</h2>
                <div className="anime-tags">
                    {props.tags.map((tag, index) => {
                        if (
                            ((showSpoilers === false && tag.isMediaSpoiler === false) ||
                                showSpoilers) &&
                            ((showSpoilers === false && tag.isGeneralSpoiler === false) ||
                                showSpoilers)
                        ) {
                            return <Tag key={index} tag={tag} />;
                        }
                    })}
                </div>
                <TagsToggle
                    tags={props.tags}
                    showSpoilers={showSpoilers}
                    setShowSpoilerTags={props.setShowSpoilerTags}
                />
            </div>
        );
    };

    const Trailer = (props) => {
        if (props.trailer) {
            const site = props.trailer.site;
            const id = props.trailer.id;

            if (site === "youtube") {
                return (
                    <div className="anime-trailer">
                        <h2>Trailer</h2>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${id}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            }
        }
    };

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
    const renderAnimePage = () => {
        if (!loading) {
            return (
                <React.Fragment>
                    <Banner src={animeData.bannerImage} />
                    <div className="main-section">
                        <div className="anime-main-left">
                            <img src={animeData.coverImage.extraLarge} className="anime-cover" />
                            <Information data={animeData} />
                        </div>
                        <div className="anime-main-right">
                            <h1 className="anime-main-title">{animeData.title.romaji}</h1>
                            <UnderTitle
                                format={animeData.format}
                                startYear={animeData.startDate.year}
                                endYear={animeData.endDate.year}
                                season={animeData.season}
                                seasonYear={animeData.seasonYear}
                                duration={animeData.duration}
                                status={animeData.status}
                                episodes={animeData.episodes}
                            />
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
                            <Trailer trailer={animeData.trailer} />
                            <Tags
                                tags={animeData.tags}
                                showSpoilers={showSpoilerTags}
                                setShowSpoilerTags={setShowSpoilerTags}
                            />
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
