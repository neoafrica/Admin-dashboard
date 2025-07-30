import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../Api/post";
import "../assets/Styles/PostDetails.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"; // For left and right arrows
import { getComments, addComment, addReply, deleteComment } from "../Api/post";
import { useLogin } from "../Api/useLogin";
import { FaTrashAlt } from "react-icons/fa"; // Import Trash icon
import { formatText } from "./formatText";

function QnDetails() {
  const { id } = useParams();
  //   const location = useLocation();
  const [post, setPost] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //   Comments code below

  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyVisible, setReplyVisible] = useState({});

  const [repliesVisible, setRepliesVisible] = useState({});

  const [comments, setComments] = useState();

  //   handle comment delete

  const [showOverlay, setShowOverlay] = useState(false); // For the overlay
  const [commentToDelete, setCommentToDelete] = useState(null); // Store comment to delete

  const { userData } = useLogin();

  const fetchComments = async (post_Id) => {
    // console.log("posts id", post_Id);
    const posts = await getComments(post_Id);

    setComments(posts);
    // console.log("comments =>", posts);
  };

  useEffect(() => {
    if (!post) {
      getQuestionById(id).then(setPost);
    }

    fetchComments(id);
  }, [id, post]);

  // Handle next and previous image navigation
  const handleNextImage = () => {
    if (currentImageIndex < post.qnImage?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (!post) return <p>Loading...</p>;

  //   handle comment delete

  const handleDeleteClick = (comment) => {
    setShowOverlay(true);
    setCommentToDelete(comment); // Store the comment that needs deletion
  };

  const confirmDelete = async () => {
    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentToDelete.id)
    );
    await deleteComment(commentToDelete.id); // Corrected: Pass the comment ID
    setShowOverlay(false);
    setCommentToDelete(null);
  };

  const cancelDelete = () => {
    setShowOverlay(false);
    setCommentToDelete(null);
  };

  const handleSendComment = async () => {
    if (commentText.trim()) {
      const newComment = {
        postId: id, // post ID
        author: userData._id,
        comment: commentText,
      };

      try {
        await addComment(newComment);
        setCommentText("");
        fetchComments(id); // Refresh comments
      } catch (err) {
        console.error("Failed to add comment:", err);
      }
    }
  };

  const handleSendReply = async (idx) => {
    if (replyText[idx]?.trim()) {
      const targetComment = comments[idx]; // Get the correct comment
      if (!targetComment || !targetComment.id) {
        console.error("No comment found at index", idx);
        return;
      }

      const reply = {
        reply: replyText[idx],
        commentId: targetComment.id,
        author: userData._id,
      };

      try {
        await addReply(reply);
        setReplyText((prev) => ({ ...prev, [idx]: "" }));
        setReplyVisible((prev) => ({ ...prev, [idx]: false }));
        fetchComments(id); // Refresh comments and replies
      } catch (err) {
        console.error("Failed to add reply:", err);
      }
    }
  };

  const toggleReply = (idx) => {
    setReplyVisible((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleRepliesVisibility = (idx) => {
    setRepliesVisible((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleReplyChange = (idx, value) => {
    setReplyText((prev) => ({ ...prev, [idx]: value }));
  };




  return (
    <div className="post-detail-container">
      {/* Post Header */}
      <div className="post-detail-header">
        <div className="post-author-avatar">
          <img
            src={post.authorPic}
            alt="post-author"
            className="post-author-image"
          />
          <p>{post.username}</p>
        </div>
        <div className="post-author-details">
          <p>{new Date(post.timestamp).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Case Images with Navigation */}
      <div className="post-image-container">
        {post.qnImage && post.qnImage.length > 0 && (
          <>
            <button
              onClick={handlePrevImage}
              className={`post-arrow-button left-arrow ${
                currentImageIndex === 0 ? "disabled" : ""
              }`}
              disabled={currentImageIndex === 0}
            >
              <BsArrowLeft size={30} />
            </button>

            <img
              src={post.qnImage[currentImageIndex].url}
              alt="Post Image"
              className="post-case-image"
            />

            <button
              onClick={handleNextImage}
              className={`post-arrow-button right-arrow ${
                currentImageIndex === post.qnImage.length - 1
                  ? "disabled"
                  : ""
              }`}
              disabled={currentImageIndex === post.qnImage.length - 1}
            >
              <BsArrowRight size={30} />
            </button>
          </>
        )}
      </div>

      {/* Post Body */}
      <div className="post-detail-body">
        {/* <h3 className="post-title">{post.caseTitle}</h3> */}

        {post.qnImage &&<p className="bio-data">
          #{post.typeOfAnimal}, {post.ageOfAnimal}, {post.sexOfAnimal}
        </p>}

        {post.qnImage?<p className="post-body">{formatText(post.history)}</p>:<p className="post-body">{formatText(post.qn)}</p>}
     
      </div>

      {/* Footer */}

      {/* Comments sections */}

      {/* Comment Section */}
      {/* Comment Section */}
      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>

        {/* New Comment Input */}
        <div className="comment-input-wrapper">
          <img
            src={userData.profileImage.secure_url}
            alt="user"
            className="comment-user-image"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleSendComment} className="comment-send-button">
            Send
          </button>
        </div>

        {/* Render Comments */}
        <div className="comments-list">
          {comments?.map((comment, idx) => (
            <div key={idx} className="comment-item">
              <img
                src={comment.authorPic}
                alt="author"
                className="comment-user-image"
              />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-time">{comment.createAt}</span>
                </div>
                <p className="comment-text">{formatText(comment.comment)}</p>

                <div className="comment-footer-row">
                  <div className="comment-actions">
                    <button
                      className="comment-reply-button"
                      onClick={() => toggleReply(idx)}
                    >
                      Reply
                    </button>

                    {comment.replies && comment.replies.length > 0 && (
                      <button
                        className="toggle-replies-button"
                        onClick={() => toggleRepliesVisibility(idx)}
                      >
                        {replyVisible[idx]
                          ? `Hide Replies (${comment.replies.length})`
                          : `Show Replies (${comment.replies.length})`}
                      </button>
                    )}
                  </div>

                  {comment.authorId === userData._id && (
                    <button
                      className="comment-delete-button"
                      onClick={() => handleDeleteClick(comment)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </div>

                {/* Reply Input */}
                {replyVisible[idx] && (
                  <div className="reply-input-wrapper">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="reply-input"
                      value={replyText[idx] || ""}
                      onChange={(e) => handleReplyChange(idx, e.target.value)}
                    />
                    <button
                      onClick={() => handleSendReply(idx)}
                      className="reply-send-button"
                    >
                      Send
                    </button>
                  </div>
                )}

                {/* Show Replies */}
                {repliesVisible[idx] &&
                  comment.replies &&
                  comment.replies?.length > 0 && (
                    <div className="replies-list">
                      {comment.replies.map((reply, rIdx) => (
                        <div key={rIdx} className="reply-item">
                          <img
                            src={reply.author.profileImage.secure_url}
                            alt="reply-author"
                            className="comment-user-image"
                          />
                          <div className="comment-content">
                            <div className="comment-header">
                              <span className="comment-username">
                                {reply.author.username}
                              </span>
                              <span className="comment-time">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="comment-text">{reply.reply}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Delete Confirmation Overlay */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Are you sure you want to delete this comment?</p>
            <button className="confirm-delete-button" onClick={confirmDelete}>
              Yes, Delete
            </button>
            <button className="cancel-delete-button" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QnDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getQuestionById, getComments, addComment, addReply, deleteComment } from "../Api/post";
// import { useLogin } from "../Api/useLogin";
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import { FaTrashAlt } from "react-icons/fa";
// import "../assets/Styles/PostDetails.css";

// function QnDetails() {
//   const { id } = useParams();
//   const [post, setPost] = useState();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [commentText, setCommentText] = useState("");
//   const [replyText, setReplyText] = useState({});
//   const [replyVisible, setReplyVisible] = useState({});
//   const [repliesVisible, setRepliesVisible] = useState({});
//   const [comments, setComments] = useState();

//   const [showOverlay, setShowOverlay] = useState(false);
//   const [commentToDelete, setCommentToDelete] = useState(null);

//   const { userData } = useLogin();

//   const fetchComments = async (post_Id) => {
//     const posts = await getComments(post_Id);
//     setComments(posts);
//   };

//   useEffect(() => {
//     if (!post) {
//       getQuestionById(id).then(setPost);
//     }
//     fetchComments(id);
//   }, [id, post]);

//   const handleNextImage = () => {
//     if (currentImageIndex < post.qnImage.length - 1) {
//       setCurrentImageIndex(currentImageIndex + 1);
//     }
//   };

//   const handlePrevImage = () => {
//     if (currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     }
//   };

//   const handleDeleteClick = (comment) => {
//     setShowOverlay(true);
//     setCommentToDelete(comment);
//   };

//   const confirmDelete = async () => {
//     setComments((prev) => prev.filter((comment) => comment.id !== commentToDelete.id));
//     await deleteComment(commentToDelete.id);
//     setShowOverlay(false);
//     setCommentToDelete(null);
//   };

//   const cancelDelete = () => {
//     setShowOverlay(false);
//     setCommentToDelete(null);
//   };

//   const handleSendComment = async () => {
//     if (commentText.trim()) {
//       const newComment = {
//         postId: id,
//         author: userData._id,
//         comment: commentText,
//       };
//       try {
//         await addComment(newComment);
//         setCommentText("");
//         fetchComments(id);
//       } catch (err) {
//         console.error("Failed to add comment:", err);
//       }
//     }
//   };

//   const handleSendReply = async (idx) => {
//     if (replyText[idx]?.trim()) {
//       const targetComment = comments[idx];
//       if (!targetComment || !targetComment.id) {
//         console.error("No comment found at index", idx);
//         return;
//       }

//       const reply = {
//         reply: replyText[idx],
//         commentId: targetComment.id,
//         author: userData._id,
//       };

//       try {
//         await addReply(reply);
//         setReplyText((prev) => ({ ...prev, [idx]: "" }));
//         setReplyVisible((prev) => ({ ...prev, [idx]: false }));
//         fetchComments(id);
//       } catch (err) {
//         console.error("Failed to add reply:", err);
//       }
//     }
//   };

//   const toggleReply = (idx) => {
//     setReplyVisible((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const toggleRepliesVisibility = (idx) => {
//     setRepliesVisible((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const handleReplyChange = (idx, value) => {
//     setReplyText((prev) => ({ ...prev, [idx]: value }));
//   };

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="post-detail-container">
      
//       {/* Post Header */}
//       <div className="post-detail-header">
//         <div className="post-author-avatar">
//           <img src={post.authorPic} alt="post-author" className="post-author-image" />
//           <p>{post.username}</p>
//         </div>
//         <div className="post-author-details">
//           <p>{new Date(post.timestamp).toLocaleDateString()}</p>
//         </div>
//       </div>

//       {/* Case Images with Navigation */}
//       <div className="post-image-container">
//         {post.qnImage && post.qnImage.length > 0 && (
//           <>
//             <button
//               onClick={handlePrevImage}
//               className={`post-arrow-button left-arrow ${currentImageIndex === 0 ? "disabled" : ""}`}
//               disabled={currentImageIndex === 0}
//             >
//               <BsArrowLeft size={30} />
//             </button>

//             <img
//               src={post.qnImage[currentImageIndex].url}
//               alt="Post Image"
//               className="post-case-image"
//             />

//             <button
//               onClick={handleNextImage}
//               className={`post-arrow-button right-arrow ${
//                 currentImageIndex === post.qnImage.length - 1 ? "disabled" : ""
//               }`}
//               disabled={currentImageIndex === post.qnImage.length - 1}
//             >
//               <BsArrowRight size={30} />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Post Body */}
//       <div className="post-detail-body">
//         {post.qnImage && (
//           <p className="bio-data">
//             #{post.typeOfAnimal}, {post.ageOfAnimal}, {post.sexOfAnimal}
//           </p>
//         )}
//         {post.qnImage ? (
//           <p className="post-body">{post.history}</p>
//         ) : (
//           <p className="post-body">{post.qn}</p>
//         )}
//       </div>

//       {/* Comment Section */}
//       <div className="comments-section">
//         <h3 className="comments-title">Comments</h3>

//         {/* New Comment Input */}
//         <div className="comment-input-wrapper">
//           <img
//             src={userData.profileImage.secure_url}
//             alt="user"
//             className="comment-user-image"
//           />
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             className="comment-input"
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//           <button onClick={handleSendComment} className="comment-send-button">
//             Send
//           </button>
//         </div>

//         {/* Render Comments */}
//         <div className="comments-list">
//           {comments?.map((comment, idx) => (
//             <div key={idx} className="comment-item">
//               <img src={comment.authorPic} alt="author" className="comment-user-image" />
//               <div className="comment-content">
//                 <div className="comment-header">
//                   <span className="comment-username">{comment.username}</span>
//                   <span className="comment-time">{comment.createAt}</span>
//                 </div>
//                 <p className="comment-text">{comment.comment}</p>

//                 <div className="comment-footer-row">
//                   <div className="comment-actions">
//                     <button
//                       className="comment-reply-button"
//                       onClick={() => toggleReply(idx)}
//                     >
//                       Reply
//                     </button>

//                     {comment.replies && comment.replies.length > 0 && (
//                       <button
//                         className="toggle-replies-button"
//                         onClick={() => toggleRepliesVisibility(idx)}
//                       >
//                         {repliesVisible[idx]
//                           ? `Hide Replies (${comment.replies.length})`
//                           : `Show Replies (${comment.replies.length})`}
//                       </button>
//                     )}
//                   </div>

//                   {comment.authorId === userData._id && (
//                     <button
//                       className="comment-delete-button"
//                       onClick={() => handleDeleteClick(comment)}
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   )}
//                 </div>

//                 {/* Reply Input */}
//                 {replyVisible[idx] && (
//                   <div className="reply-input-wrapper">
//                     <input
//                       type="text"
//                       placeholder="Write a reply..."
//                       className="reply-input"
//                       value={replyText[idx] || ""}
//                       onChange={(e) => handleReplyChange(idx, e.target.value)}
//                     />
//                     <button
//                       onClick={() => handleSendReply(idx)}
//                       className="reply-send-button"
//                     >
//                       Send
//                     </button>
//                   </div>
//                 )}

//                 {/* Show Replies */}
//                 {repliesVisible[idx] &&
//                   comment.replies &&
//                   comment.replies.length > 0 && (
//                     <div className="replies-list">
//                       {comment.replies.map((reply, rIdx) => (
//                         <div key={rIdx} className="reply-item">
//                           <img
//                             src={reply.author.profileImage.secure_url}
//                             alt="reply-author"
//                             className="comment-user-image"
//                           />
//                           <div className="comment-content">
//                             <div className="comment-header">
//                               <span className="comment-username">
//                                 {reply.author.username}
//                               </span>
//                               <span className="comment-time">
//                                 {new Date(reply.createdAt).toLocaleString()}
//                               </span>
//                             </div>
//                             <p className="comment-text">{reply.reply}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Delete Confirmation Overlay */}
//       {showOverlay && (
//         <div className="overlay">
//           <div className="overlay-content">
//             <p>Are you sure you want to delete this comment?</p>
//             <button className="confirm-delete-button" onClick={confirmDelete}>
//               Yes, Delete
//             </button>
//             <button className="cancel-delete-button" onClick={cancelDelete}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QnDetails;
