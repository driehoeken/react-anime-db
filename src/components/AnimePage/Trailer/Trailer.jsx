import React from "react";

const Trailer = (props) => {
    if (props.trailer) {
        const site = props.trailer.site;
        const id = props.trailer.id;

        if (site === "youtube") {
            return (
                <div className="anime-trailer">
                    <h2>Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }
    }
};

export default Trailer;
