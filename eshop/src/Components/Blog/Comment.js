import axios from "axios";
import React, { useState } from "react";

const Comment = (props) => {
  const idReply = props.idReply;
  const [comment, setComment] = useState("");
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  function handlePostComment() {
    const appState = localStorage.getItem("appState");
    if (!appState) {
      alert("vui lòng đăng nhập!");
    } else {
      if (comment == "") {
        alert("Vui lòng nhập bình luận!");
      } else {
        const userData = JSON.parse(localStorage["appState"]);
        let url =
          "http://localhost/laravel/public/api/blog/comment/" + props.idBlog;
        let accessToken = userData.data.success.token;
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencode",
            Accept: "application/json",
          },
        };
        if (comment) {
          const formData = new FormData();
          formData.append("id_blog", props.idBlog);
          formData.append("id_user", userData.data.Auth.id);
          formData.append("id_comment", idReply ? idReply : 0); 
          formData.append("comment", comment);
          formData.append("image_user", userData.data.Auth.avatar);
          formData.append("name_user", userData.data.Auth.name);
          axios.post(url, formData, config).then((response) => {
            console.log(response);
            if (response.data.errors) {
              alert(response.data.errors);
            }else{
              props.getCmt(response.data.data);
            }
          });
        }
      }
    }
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        <h2>Leave a reply</h2>
        <div className="text-area">
          <div className="blank-arrow">
            <label>Your Name</label>
          </div>
          <span>*</span>
          <textarea
            name="message"
            rows={11}
            defaultValue={""}
            onChange={handleComment}
          />
          <a onClick={handlePostComment} className="btn btn-primary" href>
            Post comment
          </a>
        </div>
      </div>
    </div>
  );
};

export default Comment;

