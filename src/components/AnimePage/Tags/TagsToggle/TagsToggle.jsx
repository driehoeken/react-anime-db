import React from "react";

const TagsToggle = (props) => {
    let spoilerTags = 0;
    props.tags.forEach((tag) => {
        if (tag.isMediaSpoiler || tag.isGeneralSpoiler) spoilerTags += 1;
    });

    if (spoilerTags > 0) {
        return (
            <div
                className="anime-tag-toggle"
                onClick={() => {
                    if (props.showSpoilers) props.setShowSpoilerTags(false);
                    else props.setShowSpoilerTags(true);
                }}
            >
                {props.showSpoilers ? "Hide" : "Show"}{" "}
                {spoilerTags !== 1 ? `${spoilerTags} spoiler tags` : `spoiler tag`}
            </div>
        );
    }
};

export default TagsToggle;
