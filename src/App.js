import logo from "./logo.svg";
import "./App.css";
import AnimeCard from "./components/AnimeCard/AnimeCard";
import AnimeList from "./components/AnimeList/AnimeList";
import React, { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const App = () => {
    const [trendingAnimes, setTrendingAnimes] = useState([]);
    const [popularThisSeasonAnimes, setPopularThisSeasonAnimes] = useState([]);
    const [popularAllTimeAnimes, setpopularAllTimeAnimes] = useState([]);

    const updateAnimeCardsList = async (page, perPage, args, setCallback) => {
        const query = `{
        Page(page:${page}, perPage: ${perPage}){
          media(${args}, type: ANIME){
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

        const outcome = responseJson.data.Page.media;
        //console.log(typeof responseJson.data.Page.media);
        //return responseJson.data.Page.media;
        //setTrendingAnimes(outcome);
        setCallback(outcome);
    };

    const getYearSeason = () => {
        const date = new Date();

        const month = date.getMonth();

        let season = "";
        if (month == 12 || month <= 2) {
            season = "WINTER";
        } else if (month >= 3 || month <= 5) {
            season = "SPRING";
        } else if (month >= 6 || month <= 8) {
            season = "SUMMER";
        } else {
            season = "FALL";
        }

        return { year: date.getFullYear(), season: season };
    };

    useEffect(() => {
        const currYearSeason = getYearSeason();

        updateAnimeCardsList(1, 5, "sort:TRENDING_DESC", setTrendingAnimes);
        updateAnimeCardsList(
            1,
            5,
            `sort: POPULARITY_DESC, season: ${currYearSeason.season}, seasonYear: ${currYearSeason.year}`,
            setPopularThisSeasonAnimes
        );
        updateAnimeCardsList(1, 5, "sort: POPULARITY_DESC", setpopularAllTimeAnimes);
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <h2>Trending Anime</h2>
                <AnimeList listClass="trending-list" animes={trendingAnimes} />
                <h2>Popular This Season Anime</h2>
                <AnimeList listClass="popular-this-season-list" animes={popularThisSeasonAnimes} />
                <h2>Popular All Time Anime</h2>
                <AnimeList listClass="popular-this-season-list" animes={popularAllTimeAnimes} />
            </div>
        </React.Fragment>
    );
};

export default App;
