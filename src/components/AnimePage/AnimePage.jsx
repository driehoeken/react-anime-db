import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnimePage.css";
import parse from "html-react-parser";

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
                  type
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

    const renderAnimePage = () => {
        if (!loading) {
            return (
                <React.Fragment>
                    {renderBanner()}
                    <div className="main-section">
                        <img src={animeData.coverImage.large} className="anime-cover" />
                        <div className="anime-main-title-desc-wrapper">
                            <p className="anime-main-title">{animeData.title.romaji}</p>
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
