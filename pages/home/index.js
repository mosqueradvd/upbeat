import axios from "axios";
import { useState, useEffect } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const index = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      .then((response) => {
        setToken(response.data.access_token);

        axios("https://api.spotify.com/v1/me", {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
          method: "GET",
        })
          .then((userinfo) => {
            console.log("userinfo", userinfo);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [CLIENT_ID, CLIENT_SECRET]);

  return <div>HOME</div>;
};

export default index;
