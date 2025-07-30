import React from "react";
import { BsFillTagsFill, BsBookmark } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
// import './PostCard.css';
import "../assets/Styles/postCard.css";
import { FcLike } from "react-icons/fc";

import { Link } from 'react-router-dom';

function StoryCard({
  id,
  username,
  profileImage,
  date,
  title,
  body,
  bookmarks,
  comments,
  likes
}) {
  return (
    <Link to={`/story/${id}`} className="post-card-link">
    <div className="post-card-container">
      <div className="post-card-header">
        <img src={profileImage} alt="author" className="author-image" />
        <div className="author-details">
          <p className="username">{username}</p>
          <p className="date">{date}</p>
        </div>
      </div>

      <div className="post-card-body">
        <h3 className="title">
          {title?.length > 30 ? title.slice(0, 30) + "..." : title}
        </h3>
        <p className="body">
          {body
            ? body.length > 80
              ? body.slice(0, 80) + "..."
              : body:body}
        </p>

        <div className="post-card-footer">
          <span className="footer-item">
          <FcLike color="#1989b9" /> {likes.length}
          </span>
          <span className="footer-item">
            <BsBookmark /> {bookmarks}
          </span>
          <span className="footer-item">
            <TfiCommentAlt /> {comments}
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

export default StoryCard