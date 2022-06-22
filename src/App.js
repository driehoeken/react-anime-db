import logo from "./logo.svg";
import "./App.css";
import AnimeCard from "./components/AnimeCard/AnimeCard";
import AnimeList from "./components/AnimeList/AnimeList";
import React, { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const App = () => {
    const [trendingAnimes, setTrendingAnimes] = useState([]);

    const updateAnimeCardsList = async (page, perPage, sort, setCallback) => {
        const query = `{
        Page(page:${page}, perPage: ${perPage}){
          media(sort: ${sort}){
            title {
              romaji
            }
            coverImage {
              large
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
    useEffect(() => {
        updateAnimeCardsList(1, 5, "TRENDING_DESC", setTrendingAnimes);
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <h2>Trending Anime</h2>
                <AnimeList animes={trendingAnimes}></AnimeList>
            </div>
        </React.Fragment>
    );
};

export default App;
