import React from "react";
import { useParams } from "react-router-dom";
import "./Staff.css";
const Staff = () => {
    const { id } = useParams();
    return <p>{id}</p>;
};

export default Staff;
