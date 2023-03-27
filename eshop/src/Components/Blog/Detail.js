import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Rate from "./Rate";

function Detail() {
  let params = useParams();
  const idBlog = params.id;
  const [getData, setData] = useState("");
  const [getReply, setReply] = useState("");
  const [idReply, setIdReply] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/laravel/public/api/blog/detail/" + idBlog)
      .then((response) => {
        setData(response.data);
        setReply(response.data.data.comment);
      })
      .catch((error) => console.log(error));
  }, []);

  function fetchData() {
    if (Object.keys(getData).length > 0) {
      return (
        <div className="single-blog-post">
          <h3>{getData.data.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            {/* <span>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star-half-o"></i>
                                      </span> */}
          </div>
          <a href>
            <img
              src={
                "http://localhost/laravel/public/upload/Blog/image/" +
                getData.data.image
              }
              alt=""
            />
          </a>
          <div>{getData.data.content}</div>
          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <a href="#">Pre</a>
              </li>
              <li>
                <a href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  function resCount() {
    if (getReply.length > 1) {
      return <> {getReply.length} Responses </>;
    } else {
      return <> {getReply.length} Response </>;
    }
  }

  function handleClickReply(e) {
    console.log(e.target.id);
    setIdReply(e.target.id);
  }

  function fetchReply() {
    if (Object.keys(getReply).length > 0) {
      return getReply.map((value, key) => {
        if (value.id_comment == 0) {
          return (
            <>
              <li className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src={"http://localhost/laravel/public/upload/user/avatar/" + value.image_user}
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li key={key}>
                      <i className="fa fa-user" />
                      {value.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{value.comment}</p>
                  <a
                    id={value.id}
                    onClick={handleClickReply}
                    className="btn btn-primary"
                    href
                  >
                    <i className="fa fa-reply" />
                    Reply
                  </a>
                </div>
              </li>
              {
                getReply.map((value2, key2) => {
                  if (value2.id_comment == value.id) {
                    return (
                    
                        <li className="media second-media">
                          <a className="pull-left" href="#">
                            <img className="media-object" 
                              src={"http://localhost/laravel/public/upload/user/avatar/" + value2.image_user}
                              alt="" />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li>
                                <i className="fa fa-user" />
                                {value2.name_user}
                              </li>
                              <li>
                                <i className="fa fa-clock-o" /> 1:33 pm
                              </li>
                              <li>
                                <i className="fa fa-calendar" /> DEC 5, 2013
                              </li>
                            </ul>
                            <p>{value2.comment}</p>
                            <a className="btn btn-primary" href>
                              <i className="fa fa-reply" />
                              Reply
                            </a>
                          </div>
                        </li>
                     
                    );
                  }
                })
              }
            </>
          );
          
        }
      });
    }
  }

  function getCmt(data) {
    console.log(data);
    let listcmt = getReply.concat(data);

    setReply(listcmt);
  }

  return (
    <section>
      <div className="container">
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            {fetchData()}
          </div>
          {/*/blog-post-area*/}
          <div className="rating-area">
            <ul className="ratings">
              <Rate idBlog={idBlog}/>
            </ul>
            <ul className="tag">
              <li>TAG:</li>
              <li>
                <a className="color" href>
                  Pink <span>/</span>
                </a>
              </li>
              <li>
                <a className="color" href>
                  T-Shirt <span>/</span>
                </a>
              </li>
              <li>
                <a className="color" href>
                  Girls
                </a>
              </li>
            </ul>
          </div>
          <div className="socials-share">
            <a href>
              <img src="images/blog/socials.png" alt="" />
            </a>
          </div>
          <div className="response-area">
            <h2>{resCount()}</h2>
            <ul className="media-list">
              {fetchReply()}
            </ul>
          </div>
          <div className="replay-box">
            <Comment idBlog={idBlog} idReply={idReply} getCmt={getCmt} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;
