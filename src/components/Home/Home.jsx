import React from "react";
import AnimeList from "../AnimeList/AnimeList";

const Home = () => {
    //getting current year and season
    const getCurrYear = () => {
        const date = new Date();

        return date.getFullYear();
    };

    const getCurrSeason = () => {
        const date = new Date();

        const month = date.getMonth();

        let season = "";
        if (month === 12 || month <= 2) {
            season = "WINTER";
        } else if (month >= 3 || month <= 5) {
            season = "SPRING";
        } else if (month >= 6 || month <= 8) {
            season = "SUMMER";
        } else {
            season = "FALL";
        }

        return season;
    };

    return (
        <React.Fragment>
            <h2>Trending Anime</h2>
            <AnimeList listClass="trending-list" page={1} perPage={5} args={"sort:TRENDING_DESC"} />
            <h2>Popular This Season Anime</h2>
            <AnimeList
                listClass="popular-this-season-list"
                page={1}
                perPage={5}
                args={`sort: POPULARITY_DESC, season: ${getCurrSeason()}, seasonYear: ${getCurrYear()}`}
            />
            <h2>Popular All Time Anime</h2>
            <AnimeList
                listClass="popular-all-time-list"
                page={1}
                perPage={5}
                args={"sort: POPULARITY_DESC"}
            />
        </React.Fragment>
    );
};

export default Home;
