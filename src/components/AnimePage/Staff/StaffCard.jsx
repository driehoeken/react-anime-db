import React from "react";

const StaffCard = (props) => {
    return <div className="anime-staff-card">{props.data.name.first}</div>;
};

export default StaffCard;
