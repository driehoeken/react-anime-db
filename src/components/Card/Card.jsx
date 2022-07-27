import React from "react";
import "./Card.css";
const Card = (props) => {
    return (
        <div className={`anime-${props.class}-card card`}>
            <img
                className={`anime-${props.class}-card-img card-img`}
                src={props.imgSrc}
                alt={props.imgAlt}
            />
            <div className={`anime-${props.class}-card-info-wrap card-info-wrap`}>
                <p className={`anime-${props.class}-card-top card-top`}>{props.top}</p>

                <p className={`anime-${props.class}-card-bottom card-bottom`}>{props.bottom}</p>
            </div>
        </div>
    );
};

export default Card;
