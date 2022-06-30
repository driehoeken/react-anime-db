import React, { useEffect, useState } from "react";
import AnimeCard from "../AnimeCard/AnimeCard";
import "./AnimeList.css";

const AnimeList = (props) => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateAnimeCardsList = async (page, perPage, args) => {
        const query = `{
        Page(page:${page}, perPage: ${perPage}){
          media(${args}, type: ANIME){
            id
            title {
                romaji
            }
            coverImage {
              large
            }
            genres
            episodes
            nextAiringEpisode {
                timeUntilAiring
                episode
            }
            seasonYear
            season
            format
            status
            startDate {
                year
            }
            endDate{
                year
            }
            duration
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

        //setting data with callback
        const outcome = responseJson.data.Page.media;
        setAnimes(outcome);
        setLoading(false);
    };

    useEffect(() => {
        updateAnimeCardsList(props.page, props.perPage, props.args);
    }, []);

    const loadingState = (index) => {
        return <div key={index}>loading...</div>;
    };

    const renderList = () => {
        if (loading) {
            let outcome = [];
            for (let i = 0; i < props.perPage; i++) {
                outcome.push(loadingState(i));
            }
            return outcome;
        } else {
            return animes.map((anime, index) => {
                return <AnimeCard key={index} animeData={anime} />;
            });
        }
    };

    return <div className={props.listClass + " anime-list"}>{renderList()}</div>;
};

export default AnimeList;
