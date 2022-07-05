import React from "react";

const RelatedToggle = (props) => {
    const toggleContent = () => {
        if (props.showAll && props.relationsNumber > 4) {
            return `Hide ${props.relationsNumber - 4} ${
                props.relationsNumber - 1 === 1 ? "relation" : "relations"
            }`;
        } else if (!props.showAll && props.relationsNumber > 4) {
            return `Show all ${props.relationsNumber} relations`;
        }
    };
    return (
        <div
            className="anime-related-toggle"
            onClick={() => {
                if (props.showAll) props.setShowAll(false);
                else props.setShowAll(true);
            }}
        >
            {toggleContent()}
        </div>
    );
};

export default RelatedToggle;
