import React from "react";
import "./Tags.css";
import Tag from "./Tag";
import TagsToggle from "./TagsToggle";

const Tags = (props) => {
    const showSpoilers = props.showSpoilers;
    return (
        <div className="anime-tags-wrapper">
            <h2>Tags</h2>
            <div className="anime-tags">
                {props.tags.map((tag) => {
                    if (
                        ((showSpoilers === false && tag.isMediaSpoiler === false) ||
                            showSpoilers) &&
                        ((showSpoilers === false && tag.isGeneralSpoiler === false) || showSpoilers)
                    ) {
                        return <Tag key={tag.id} tag={tag} />;
                    }
                })}
            </div>
            <TagsToggle
                tags={props.tags}
                showSpoilers={showSpoilers}
                setShowSpoilerTags={props.setShowSpoilerTags}
            />
        </div>
    );
};

export default Tags;
