import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnimePage.css";
import parse from "html-react-parser";
import Banner from "./Banner/Banner";
import Information from "./Information/Information";
import Trailer from "./Trailer/Trailer";
import Tags from "./Tags/Tags";
import UnderTitle from "./UnderTitle/UnderTitle";
import Genres from "./Genres/Genres";
import Related from "./Related/Related";

const AnimePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpoilerTags, setShowSpoilerTags] = useState(false);
    const [showAllRelated, setShowAllRelated] = useState(false);
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
                  	relations{
                      nodes{
                        id
                        title {
                          romaji
                        }
                        type
                        format
                        coverImage{
                          medium
                        }
                      }
                      edges{
                        id
                        relationType
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
        setLoading(true);
        updateAnimeData();
    }, [id]);
    const renderAnimePage = () => {
        if (!loading) {
            return (
                <>
                    <Banner src={animeData.bannerImage} />
                    <div className="main-section">
                        <div className="anime-main-left">
                            <img
                                src={animeData.coverImage.extraLarge}
                                alt={animeData.title.romaji}
                                className="anime-cover"
                            />
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
                            <Genres genres={animeData.genres} />
                            <p className="anime-main-desc">
                                {animeData.description !== null && parse(animeData.description)}
                            </p>
                            <Trailer trailer={animeData.trailer} />
                            <Related
                                relations={animeData.relations}
                                showAll={showAllRelated}
                                setShowAll={setShowAllRelated}
                            />
                            <Tags
                                tags={animeData.tags}
                                showSpoilers={showSpoilerTags}
                                setShowSpoilerTags={setShowSpoilerTags}
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            return <p>loading...</p>;
        }
    };

    return <React.Fragment>{renderAnimePage()}</React.Fragment>;
};

export default AnimePage;
