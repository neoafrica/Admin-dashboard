// import React from "react";
// import { BsFillTagsFill, BsBookmark } from "react-icons/bs";
// import { TfiCommentAlt } from "react-icons/tfi";
// // import './PostCard.css';
// import "../assets/Styles/postCard.css";
// import ImageLoader from "./ImageLoader";
// import DefaultImage from "../assets/ImgPlaceholder.jpg";

// import { Link } from "react-router-dom";

// function QnCard({
//     id,
//     // authorId,
//     username,
//     authorPic,
//     history,
//     qn,
//     typeOfAnimal,
//     // sexOfAnimal,
//     // ageOfAnimal,
//     qnImage,
//     timestamp,
//     comments
// }) 

// {
//   return (
//     <Link to={`/questions/${id}`} className="post-card-link">
//       <div className="post-card-container">
//         <div className="post-card-header">
//           <img src={authorPic} alt="author" className="author-image" />
//           <div className="author-details">
//             <p className="username">{username}</p>
//             <p className="date">{timestamp}</p>
//           </div>
//         </div>

//         {qnImage?
//         <div>
//           <div className="image-container">
//             {/* {console.log(caseImage[0].url)} */}
//             {/* <img src={caseImage[1]?.url} alt="case" className="image-container"/> */}
//             <ImageLoader
//               defaultImageSource={DefaultImage}
//               source={qnImage[0]?.url}
//               alt="Post Image"
//               className="image-container"
//             />
//           </div>
        

//         <div className="post-card-body">
//           {/* <h3 className="title">
//             {history?.length > 30 ? history?.slice(0, 30) + "..." : history}
//           </h3> */}
//           <p className="body">
//             {/* {body
//             ? body?.length > 80
//               ? body.slice(0, 80) + "..."
//               : body
//             : body2?.length > 80
//             ? body2.slice(0, 80) + "..."
//             : body2
//             } */}

//             {history
//               ? history.length > 80
//                 ? history.slice(0, 80) + "..."
//                 : history
//               : null}
//           </p> 

//           </div> 

//           <div className="post-card-footer">
//             {/* <span className="footer-item">
//               <BsFillTagsFill /> {category}
//             </span>
//             <span className="footer-item">
//               <BsBookmark /> {bookmarks}
//             </span> */}
//             <span className="footer-item">
//               <TfiCommentAlt /> {comments}
//             </span>
//           </div>
//           <span className="animal">
//             <p>#{typeOfAnimal?.toUpperCase()}</p>
//           </span>
//         </div>: <>   <div className="post-card-body">
//           {/* <h3 className="title">
//             {history?.length > 30 ? history?.slice(0, 30) + "..." : history}
//           </h3> */}
//           <p className="body">
//             {/* {body
//             ? body?.length > 80
//               ? body.slice(0, 80) + "..."
//               : body
//             : body2?.length > 80
//             ? body2.slice(0, 80) + "..."
//             : body2
//             } */}

//             {qn
//               ? qn.length > 80
//                 ? qn.slice(0, 80) + "..."
//                 : qn
//               : null}
//           </p> 

//           </div> 

//           <div className="post-card-footer">
//             {/* <span className="footer-item">
//               <BsFillTagsFill /> {category}
//             </span>
//             <span className="footer-item">
//               <BsBookmark /> {bookmarks}
//             </span> */}
//             <span className="footer-item">
//               <TfiCommentAlt /> {comments}
//             </span>
//           </div>
//           <span className="animal">
//             <p>#{typeOfAnimal?.toUpperCase()}</p>
//           </span></>}
//       </div>

//     </Link>
//   );
// }

// export default QnCard;

import React from "react";
import { BsFillTagsFill, BsBookmark } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import "../assets/Styles/postCard.css";
import ImageLoader from "./ImageLoader";
import DefaultImage from "../assets/ImgPlaceholder.jpg";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "./getTimeAgo";
import { formatText } from "./formatText";

function QnCard({
  id,
  username = "Unknown User",
  authorPic,
  history,
  qn,
  typeOfAnimal,
  qnImage,
  timestamp,
  comments = [],
}) {
  return (
    <Link to={`/questions/${id}`} className="post-card-link">
      <div className="post-card-container">
        {/* Top: Author */}
        <div className="post-card-header">
          <img
            src={authorPic || DefaultImage}
            alt="author"
            className="author-image"
            onError={(e) => (e.target.src = DefaultImage)}
          />
          <div className="author-details">
            <p className="username">{username}</p>
            {/* <p className="date">{timestamp || "Unknown date"}</p> */}
            <p className="date">{timestamp ? formatTimeAgo(timestamp) : "Unknown date"}</p>

          </div>
        </div>

        {/* Image or Body Section */}
        {qnImage?.length > 0 && qnImage[0]?.url ? (
          <div>
            <div className="image-container">
              <ImageLoader
                defaultImageSource={DefaultImage}
                source={qnImage[0]?.url}
                alt="Post Image"
                className="image-container"
              />
            </div>

            <div className="post-card-body">
              <p className="body">
                {history
                  ? history.length > 80
                    ? history.slice(0, 80) + "..."
                    : formatText(history)
                  : "No history provided"}
              </p>
            </div>

          </div>
        ) : (
          <div className="post-card-body">
            <p className="body">
              {qn
                ? qn.length > 80
                  ? qn.slice(0, 80) + "..."
                  :formatText(qn)
                : "No question provided"}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="post-card-footer">
          <span className="qn-footer-item">
            <TfiCommentAlt /> {comments || 0}
          </span>
        </div>

        {/* Animal Tag */}
        {typeOfAnimal && (
          <span className="animal">
            <p>#{typeOfAnimal.toUpperCase()}</p>
          </span>
        )}
      </div>
    </Link>
  );
}

export default QnCard;
