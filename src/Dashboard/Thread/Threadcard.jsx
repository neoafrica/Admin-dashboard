import React from "react";
import { BsFillTagsFill, BsBookmark } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
// import './PostCard.css';
import "../../assets/Styles/postCard.css";
// import ImageLoader from "./ImageLoader";
import ImageLoader from "../ImageLoader";
// import DefaultImage from "../assets/ImgPlaceholder.jpg";
import DefaultImage from "../../assets/ImgPlaceholder.jpg";

import { Link } from "react-router-dom";

function ThreadCard({
  thread,
//   id,
  //   username,
  //   profileImage,
  //   date,
//   title,
//   body,
  //   bookmarks,
//   body2,
//   body3,
  //   category,
//   caseImage,
  //   comments,
//   typeOfAnimal,
}) {
    // console.log("From card", thread)

    const firstTweet = thread.tweets?.[0];
  return (
    <Link to={`/threads/${thread._id}`} className="post-card-link">
      <div className="post-card-container">
        <div className="post-card-header">
          <img
            src={thread.user?.profileImage?.secure_url}
            alt="author"
            className="author-image"
          />
          <div className="author-details">
            <p className="username">
              {thread.user?.username || "Unknown User"}
            </p>
            <p className="date">{new Date(thread.createdAt).toLocaleDateString()}</p>
            
          </div>
        </div>

        {firstTweet?.imageUrl  && (
          <div className="image-container">
            {/* {console.log(caseImage[0].url)} */}
            {/* <img src={caseImage[1]?.url} alt="case" className="image-container"/> */}
            <ImageLoader
              defaultImageSource={DefaultImage}
              source={firstTweet?.imageUrl }
              alt="Post Image"
              className="image-container"
            />
          </div>
        )}

        <div className="post-card-body">
          {/* <h3 className="title">
            {title?.length > 30 ? title?.slice(0, 30) + "..." : title}
          </h3> */}
          <p className="body">
            {/* {body
            ? body?.length > 80
              ? body.slice(0, 80) + "..."
              : body
            : body2?.length > 80
            ? body2.slice(0, 80) + "..."
            : body2
            } */}

            {firstTweet?.text?.length > 100
              ? firstTweet.text.slice(0, 100) + "..."
              : firstTweet?.text}
          </p>

          <div className="post-card-footer">
            <span className="footer-item">
              {/* <BsFillTagsFill /> {category} */}
            </span>
            <span className="footer-item">
              <BsBookmark /> {thread.commentsCount || 0}
            </span>
            <span className="footer-item">
              <TfiCommentAlt /> {thread.bookmarksCount || 0}
            </span>
          </div>
          {/* <span className="animal">
            <p>#{typeOfAnimal?.toUpperCase()}</p>
          </span> */}
        </div>
      </div>
    </Link>
  );
}

export default ThreadCard;
