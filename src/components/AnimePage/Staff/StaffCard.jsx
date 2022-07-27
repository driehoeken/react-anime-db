import React from "react";
const StaffCard = (props) => {
    return (
        <div className="anime-staff-card">
            <img
                className="anime-staff-card-img"
                src={props?.data?.image?.medium}
                alt={props?.data?.name?.full}
            />
            <div className="anime-staff-card-info-wrap">
                <p className="anime-staff-card-name">{props?.data?.name?.full}</p>

                <p className="anime-staff-card-role">{props?.role}</p>
            </div>
        </div>
    );
};

export default StaffCard;
