import React, { useState } from "react";
import axios from "axios";
// import "./TwitterThreadPost.css";
import "../assets/Styles/ThreadPost.css";
import { useLogin } from "../Api/useLogin";

const MAX_WORDS = 280;

const TwitterThreadPost = () => {
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState([{ text: "", image: null }]);

const { userData } = useLogin();

  const getTotalWords = () => {
    return thread
      .map((t) => t.text.trim())
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
  };

  const handleInputChange = (index, value) => {
    const updatedThread = [...thread];
    updatedThread[index].text = value;
    setThread(updatedThread);
  };

  const addThreadPart = () => {
    setThread([...thread, { text: "", image: null }]);
  };

  const removeThreadPart = (index) => {
    if (thread.length > 1) {
      const updatedThread = [...thread];
      updatedThread.splice(index, 1);
      setThread(updatedThread);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedThread = [...thread];
      updatedThread[index].image = file;
      setThread(updatedThread);
    }
  };

  const removeImage = (index) => {
    const updatedThread = [...thread];
    updatedThread[index].image = null;
    setThread(updatedThread);
  };

  const submitThread = async () => {
    const totalWords = getTotalWords();

    if (totalWords > MAX_WORDS) {
      return alert(`Thread must be under ${MAX_WORDS} words.`);
    }

    if (!thread.some((t) => t.text.trim() || t.image)) {
      return alert("Please add text or image to at least one paragraph.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("author", userData._id);

      const tweetTextArray = thread.map(({ text }) => ({ text }));
      formData.append("tweets", JSON.stringify(tweetTextArray));

      thread.forEach((item) => {
        if (item.image) {
          formData.append("images", item.image);
        }
      });

      const response = await axios.post(
        "http://localhost:3000/api/post/threads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Thread posted successfully!");
        setThread([{ text: "", image: null }]);
        // navigateBack?.();
      } else {
        alert("Failed to post thread.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the thread.");
    } finally {
      setLoading(false);
    }
  };

  const totalWords = getTotalWords();
  const wordClass =
    totalWords > MAX_WORDS ? "danger" : totalWords > 250 ? "warning" : "normal";

  return (
    <div className="thread-container">
      <h2 className="thread-heading">Create Thread</h2>

      {thread.map((item, index) => (
        <div key={index} className="thread-card">
          <textarea
            placeholder={`Paragraph ${index + 1}`}
            value={item.text}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="thread-textarea"
          />

          {item.image && (
            <div className="image-preview-container">
              <img
                src={URL.createObjectURL(item.image)}
                alt="preview"
                className="image-preview"
              />
              <button onClick={() => removeImage(index)} className="remove-btn">
                Remove Image
              </button>
            </div>
          )}

          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
          /> */}
          {/* 
          <label className="file-label">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="file-input"
            />
          </label> */}
          <label className="file-label">
            {item.image ? "Change Image" : "Select Image"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="file-input"
            />
          </label>

          {thread.length > 1 && (
            <button
              onClick={() => removeThreadPart(index)}
              className="remove-btn"
            >
              Remove Paragraph
            </button>
          )}
        </div>
      ))}

      <p className={`word-count ${wordClass}`}>
        Total words: {totalWords}/{MAX_WORDS}
      </p>

      <button onClick={addThreadPart} className="add-btn">
        + Add another Paragraph
      </button>

      <br />

      {/* <button
        onClick={submitThread}
        disabled={totalWords > MAX_WORDS || loading}
      >
        {loading ? "Posting..." : "Post Thread"}
      </button> */}
      <button
        className="post-thread-btn"
        onClick={submitThread}
        disabled={totalWords > MAX_WORDS || loading}
      >
        {loading ? "Posting..." : "Post Thread"}
      </button>
    </div>
  );
};

export default TwitterThreadPost;
