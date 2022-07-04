import React from "react";
import "./Genres.css";
const Genres = (props) => {
    if (props.genres) {
        return (
            <div className="anime-main-genres">
                {props.genres.map((genre, index) => {
                    return (
                        <a className="anime-genre" key={index}>
                            {genre}
                        </a>
                    );
                })}
            </div>
        );
    }
};

export default Genres;
