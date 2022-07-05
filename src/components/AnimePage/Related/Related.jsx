import React from "react";
import RelatedToggle from "./RelatedToggle";
import "./Related.css";

const Related = (props) => {
    if (props.relations !== null && props.relations?.nodes?.length > 0) {
        const animes = props.relations.nodes;
        console.log(animes);
        const relationsNumber = animes.length;
        const relations = props.relations.edges;
        let animesToShow = animes;
        if (!props.showAll) {
            animesToShow = animes.slice(0, 4);
        }
        //console.log(animesToShow);
        return (
            <div className="anime-related">
                <h2>Related</h2>
                {animesToShow.map((anime, index) => {
                    if (anime.type === "ANIME") {
                        return (
                            <div className="anime-related-card" key={anime.id}>
                                {anime.title.romaji} {relations[index].relationType}
                            </div>
                        );
                    }
                })}
                <RelatedToggle
                    setShowAll={props.setShowAll}
                    showAll={props.showAll}
                    relationsNumber={relationsNumber}
                />
            </div>
        );
    }
};

export default Related;
