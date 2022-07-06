import React from "react";
import { formatAnimeFormat, formatRelationType, makeSlug } from "../../../misc";
import { Link } from "react-router-dom";
const RelatedCard = (props) => {
    return (
        <div className="anime-related-card">
            <Link to={`/anime/${props.data.id}/${makeSlug(props.data.title.romaji)}`}>
                <img
                    className="anime-related-card-cover"
                    src={props.data.coverImage.medium}
                    alt={props.data.title.romaji}
                />
            </Link>
            <div className="anime-related-card-info-wrap">
                <p className="anime-related-card-title">
                    <Link to={`/anime/${props.data.id}/${makeSlug(props.data.title.romaji)}`}>
                        {props.data.title.romaji}
                    </Link>
                </p>

                <div className="anime-related-card-relation-format-wrap">
                    <p className="anime-related-card-relation">
                        {formatRelationType(props.relation)}
                    </p>
                    <p className="anime-related-card-format">
                        {formatAnimeFormat(props.data.format)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RelatedCard;
