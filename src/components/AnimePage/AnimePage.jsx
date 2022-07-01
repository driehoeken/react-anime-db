import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnimePage.css";
import parse from "html-react-parser";
import Banner from "./Banner/Banner";
import Information from "./Information/Information";
import Trailer from "./Trailer/Trailer";
import Tags from "./Tags/Tags";
import UnderTitle from "./UnderTitle/UnderTitle";

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

    const renderUnderTitle = () => {};

    const renderTagsToggle = () => {
        let spoilerTags = 0;
        animeData.tags.forEach((tag) => {
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

        if (spoilerTags > 0) {
            return (
                <div>
                    {renderTagToggle(spoilerTags, "spoiler", showSpoilerTags, () => {
                        if (showSpoilerTags) setShowSpoilerTags(false);
                        else setShowSpoilerTags(true);
                    })}
                </div>
            );
        }
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
