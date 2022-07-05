import React from "react";

const Tag = (props) => {
    const tag = props.tag;
    return (
        <div className="anime-tag">
            <span
                className={tag.isMediaSpoiler ? "tag-spoiler" : ""}
            >{`${tag.name} ${tag.rank}%`}</span>
        </div>
    );
};

export default Tag;
