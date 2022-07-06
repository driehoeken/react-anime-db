import React from "react";

const StaffCard = (props) => {
    const data = props.data;
    return (
        <div className="anime-staff-card">
            <img src={data.image.medium} alt={data.name.full} />
            <p>{data.name.full}</p>
        </div>
    );
};

export default StaffCard;
