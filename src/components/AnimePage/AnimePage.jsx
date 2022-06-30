import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnimePage.css";
import parse from "html-react-parser";
import { capitalizeOnlyFirst, formatAnimeFormat, formatAnimeStatus } from "../../misc";

const AnimePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
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
        let outcome = [formatAnimeFormat(animeData.format)];

        const startYear = animeData.startDate.year;
        const endYear = animeData.endDate.year;

        if (endYear - startYear >= 2) {
            outcome.push(`${startYear} - ${endYear}`);
        } else {
            outcome.push(`${capitalizeOnlyFirst(animeData.season)} ${animeData.seasonYear}`);
        }

        const episodes = animeData.episodes;

        if (episodes) {
            if (episodes === 1) {
                outcome.push(`1 episode`);
            } else {
                outcome.push(`${episodes} episodes`);
            }
        }

        outcome.push(formatAnimeStatus(animeData.status));

        return outcome.map((info, index) => {
            return <li key={index}>{info}</li>;
        });
    };

    const renderAnimePage = () => {
        if (!loading) {
            return (
                <React.Fragment>
                    {renderBanner()}
                    <div className="main-section">
                        <div className="anime-main-left">
                            <img src={animeData.coverImage.large} className="anime-cover" />
                            {}
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
