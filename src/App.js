import logo from "./logo.svg";
import "./App.css";
import AnimeCard from "./components/AnimeCard/AnimeCard";
import AnimeList from "./components/AnimeList/AnimeList";
import React, { useState } from "react";

const App = () => {
    const [trendingAnimes, setTrendingAnimes] = useState({
        data: {
            Page: {
                media: [
                    {
                        title: {
                            romaji: "Tomodachi Game",
                        },
                        coverImage: {
                            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx141014-eRFDPNpf3hI7.jpg",
                        },
                    },
                    {
                        title: {
                            romaji: "ONE PIECE",
                        },
                        coverImage: {
                            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
                        },
                    },
                    {
                        title: {
                            romaji: "Yuusha, Yamemasu",
                        },
                        coverImage: {
                            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140457-sIgseoInp02B.jpg",
                        },
                    },
                    {
                        title: {
                            romaji: "SPY×FAMILY",
                        },
                        coverImage: {
                            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-Yl5M3AiLZAMq.png",
                        },
                    },
                    {
                        title: {
                            romaji: "Sono Bisque Doll wa Koi wo Suru",
                        },
                        coverImage: {
                            large: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx101583-LsEOUNrjOpez.jpg",
                        },
                    },
                ],
            },
        },
    });

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
