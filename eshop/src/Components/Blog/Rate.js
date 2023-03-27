import axios from "axios";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const Rate = (props) => {
  const [rating, setRating] = useState(0);
  const [getStars, setStars] = useState("");
  let url = "http://localhost/laravel/public/api/blog/rate/" + props.idBlog;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        let sum = 0;
        res.data.data.map((value) => {
          sum += parseInt(value.rate);
        });
        let avgStar = sum / parseInt(Object.keys(res.data.data).length);

        setRating(avgStar);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(getStars)

  function handleRating(newRating, name) {
    const appState = localStorage.getItem("appState");
    if (!appState) {
      alert("Vui lòng đăng nhập!");
    } else {
      setRating(newRating);
      const userData = JSON.parse(appState);
      let accessToken = userData.data.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencode",
          Accept: "application/json",
        },
      };
      if (rating !== 0) {
        const formData = new FormData();
        formData.append("user_id", userData.data.Auth.id);
        formData.append("blog_id", props.idBlog);
        formData.append("rate", rating);
        axios.post(url, formData, config).then((response) => {
          console.log(response);
          if (response.data.errors) {
            alert(response.data.errors);
          }
        });
      }
    }
  }

  return (
    <>
      <li className="rate-this">Rate this item:</li>
      <StarRatings
        rating={rating}
        starRatedColor="#FE980F"
        changeRating={handleRating}
        numberOfStars={5}
        name="rating"
      />
      <li className="color">{getStars}</li>
    </>
  );
};

export default Rate;
