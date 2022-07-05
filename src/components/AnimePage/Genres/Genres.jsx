import React from "react";
import "./Genres.css";
const Genres = (props) => {
    if (props.genres) {
        return (
            <div className="anime-main-genres">
                {props.genres.map((genre) => {
                    return (
                        <a className="anime-genre" key={genre}>
                            {genre}
                        </a>
                    );
                })}
            </div>
        );
    }
};

export default Genres;
