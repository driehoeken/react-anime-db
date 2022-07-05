import React from "react";
import RelatedToggle from "./RelatedToggle";
import "./Related.css";
import RelatedCard from "./RelatedCard";

const Related = (props) => {
    if (props.relations !== null && props.relations?.nodes?.length > 0) {
        const animes = props.relations.nodes.filter((node) => node.type === "ANIME");
        const relationsNumber = animes.length;
        if (relationsNumber > 0) {
            const relations = props.relations.edges;
            let animesToShow = animes;
            if (!props.showAll) {
                animesToShow = animes.slice(0, 3);
            }
            //console.log(animesToShow);
            return (
                <div className="anime-related-wrapper">
                    <h2>Related</h2>
                    <div className="anime-related">
                        {animesToShow.map((anime, index) => {
                            if (anime.type === "ANIME") {
                                return (
                                    <RelatedCard
                                        key={anime.id}
                                        data={anime}
                                        relation={relations[index].relationType}
                                    />
                                );
                            }
                        })}
                    </div>
                    <RelatedToggle
                        setShowAll={props.setShowAll}
                        showAll={props.showAll}
                        relationsNumber={relationsNumber}
                    />
                </div>
            );
        }
    }
};

export default Related;
