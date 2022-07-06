import React from "react";
import SmallStaff from "./Staff/SmallStaff.jsx";
import Trailer from "./Trailer/Trailer";
import Tags from "./Tags/Tags";
import Related from "./Related/Related";
const AnimeMain = (props) => {
    const animeData = props.animeData;
    return (
        <>
            <Trailer trailer={animeData.trailer} />
            <Tags
                tags={animeData.tags}
                showSpoilers={props.showSpoilerTags}
                setShowSpoilerTags={props.setShowSpoilerTags}
            />
            <Related
                relations={animeData.relations}
                showAll={props.showAllRelated}
                setShowAll={props.setShowAllRelated}
            />
            <SmallStaff staff={animeData.staff.nodes} edges={animeData.staff.edges} />
        </>
    );
};

export default AnimeMain;
