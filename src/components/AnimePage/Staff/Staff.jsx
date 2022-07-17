import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Staff.css";
import StaffCard from "./StaffCard.jsx";
const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [load, setLoad] = useState(0);
    const { id } = useParams();
    //const staffs = [];

    const loadNewStaff = async () => {
        console.log("loadStaff");
        let newStaffs = staffs;
        for (let i = 0; i < 3; i++) {
            newStaffs.push({
                key: staffs.length + i,
                data: null,
                role: null,
                loading: true,
            });
        }
        setStaffs(newStaffs);
        const query = `{
            Media(id: ${id}){
            id
            title {
              romaji
            }
            staff(page: ${currPage}, perPage: 3){
              edges{
                id
                role
              }
              nodes{
                id
                name {
                  first
                  middle
                  last
                  full
                  native
                }
                image {
                  large
                  medium
                }
              }
            }
          }
        }`;

        const url = "https://graphql.anilist.co";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        };

        const response = await fetch(url, options);
        const responseJson = await response.json();

        const outcome = responseJson.data.Media;
        for (let i = 0; i < 3; i++) {
            newStaffs[currPage * 3 + i] = {
                key: staffs.length + i,
                data: outcome.staff.nodes[i],
                role: outcome.staff.edges[i].role,
                loading: false,
            };
        }
        console.log(`currPage: ${currPage}`);
        setCurrPage(currPage + 1);
        setStaffs(staffs.concat(newStaffs));
        //console.log(staffs);
    };

    const checkLoad = () => {
        const windowHeight = window.innerHeight;
        const staffsY = document.querySelector(".anime-staff").getBoundingClientRect().bottom;
        const scrollY = window.scrollY + windowHeight;
        //console.log(`windowHeight: ${windowHeight} | staffsY: ${staffsY} | scrollY: ${scrollY}`);
        if (staffsY - scrollY < 300) {
            setLoad(load + 1);
        }
    };
    useEffect(() => {
        console.log("useEffect");
        checkLoad();
    }, []);
    useEffect(() => {
        console.log("load useEffect");
        loadNewStaff();
    }, [load]);

    window.addEventListener("scroll", checkLoad);
    return (
        <>
            <p onClick={loadNewStaff}>Load new staff</p>
            <div className="anime-staff">
                {staffs.map((staff) => {
                    return <StaffCard key={staff.key} role={staff.role} data={staff.data} />;
                })}
            </div>
        </>
    );
};

export default Staff;
