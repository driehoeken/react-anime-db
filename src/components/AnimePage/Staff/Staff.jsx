import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Staff.css";
import Card from "../../Card/Card";
const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    //const staffs = [];

    const updateStaff = async () => {
        const query = `{
            Media(id: ${id}){
            id
            title {
              romaji
            }
            staff{
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

        const outcome = responseJson.data.Media.staff;
        console.log(outcome);
        setStaffs(outcome);
        setLoading(false);
    };

    useEffect(() => {
        updateStaff();
    }, []);
    if (!loading) {
        return (
            <>
                <h2>Staff</h2>
                <div className="anime-staff">
                    {staffs.nodes.map((staff) => {
                        return (
                            <Card
                                key={staffs.nodes.indexOf(staff)}
                                class={"staff"}
                                imgSrc={staff.image.medium}
                                imgAlt={staff.name.full}
                                top={staff.name.full}
                                bottom={staffs.edges[staffs.nodes.indexOf(staff)].role}
                            />
                        );
                    })}
                </div>
            </>
        );
    } else {
        return (
            <>
                <h2>Staff</h2>
                <p>loading...</p>
            </>
        );
    }
};

export default Staff;
