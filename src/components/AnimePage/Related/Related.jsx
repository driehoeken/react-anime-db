import React from "react";

const Related = (props) => {
    if (props.relations !== null && props.relations?.nodes?.length > 0) {
        const nodes = props.relations.nodes;
        const edges = props.relations.edges;
        return (
            <div className="anime-related">
                <h2>Related</h2>
                {nodes.map((anime, index) => {
                    if (anime.type === "ANIME") {
                        return (
                            <div className="anime-related-card" key={anime.id}>
                                {anime.title.romaji} {edges[index].relationType}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
};

export default Related;
