import React, { Component } from "react";
import { useParams } from "react-router-dom";

const AnimePage = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export default AnimePage;
