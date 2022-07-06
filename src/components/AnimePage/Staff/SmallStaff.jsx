import React from "react";
import StaffCard from "./StaffCard.jsx";

const Staff = (props) => {
    const people = props.staff;
    const edges = props.edges;

    if (people !== null && people?.length > 0) {
        return (
            <div className="anime-staff-wrapper">
                <h2>Staff</h2>
                <div className="anime-staff">
                    {people.map((person, index) => {
                        return (
                            <StaffCard
                                key={edges[index].id}
                                data={person}
                                role={edges[index].role}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Staff;
