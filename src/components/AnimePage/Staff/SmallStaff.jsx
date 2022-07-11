import React from "react";
import { useParams } from "react-router-dom";
import StaffCard from "./StaffCard.jsx";
import { Link } from "react-router-dom";

const Staff = (props) => {
    let people = props.staff;
    const edges = props.edges;
    const { id, name } = useParams();

    if (people !== null && people?.length > 0) {
        people = people.slice(0, 3);
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
                <Link to={`/anime/${id}/${name}/staff`} className="anime-staff-toggle">
                    <p>Show all</p>
                </Link>
            </div>
        );
    }
};

export default Staff;
