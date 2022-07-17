import React from "react";
const StaffCard = (props) => {
    if (!props.loading) {
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
    } else {
        return <div className="anime-staff-card-loading">loading...</div>;
    }
};

export default StaffCard;
