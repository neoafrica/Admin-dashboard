import React, { useState, useRef, useEffect,useContext } from "react";
import { Upload } from "lucide-react";
import "./FrontImage.css";
// import "./assets/Fro"
import { StoryBillBoardImage, getStoryBillBoardImage } from "./Api/post";
import {  Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import StoryBillboardCard from "./StoryBillboardCard";
import { ScrollMenu, VisibilityContext, } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StoryBillboardImage = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const [Data, setData] = useState();
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile)); // Preview image
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageUploaded) return;

    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setImageUploaded(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      const response = await StoryBillBoardImage(formData);
      if (response.error) {
        alert("error while upload image!");
        setImageUploaded(false);
      }
      if (!response.error) {
        alert("Image uploaded successfully!");
        setImageUploaded(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const getBillboardImage = async () => {
    const data = await getStoryBillBoardImage();
    // console.log("data =>", data);
    setData(data);
  };

  useEffect(() => {
    getBillboardImage();
  }, [Data]);

  
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <button onClick={() => scrollPrev()} className="arrow left">
        <FaChevronLeft />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <button onClick={() => scrollNext()} className="arrow right">
        <FaChevronRight />
      </button>
    );
  };
  return (
    <div className="container">
    {Data?.length >0?    <ScrollMenu wrapperClassName="custom-scroll" LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {Data?.map((post) => (
          <StoryBillboardCard
            key={post.id}
            postId={post.id}
            image={post?.Image?.url}
            desc={post.description}
            date={post.createdAt}
          />
        ))}
      </ScrollMenu>:null}

      <h2 className="title">Upload story billboard Image</h2>

      {/* Image Preview */}
      <div className="image-preview">
        {image ? (
          <img src={image} alt="Preview" className="preview-img" />
        ) : (
          <p className="placeholder">No Image Selected</p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden-input"
      />

      {/* Upload Button */}
      <button onClick={handleButtonClick} className="upload-button">
        <Upload className="icon" /> Choose Image
      </button>

      {/* Description Input */}
      <textarea
        placeholder="Enter Image Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description-input"
      />

      {/* Submit Button */}

      {imageUploaded ? (
        <div className="spinner">
          <Spinner animating={true} speed={1} size={16} color="#fff" />
        </div>
      ) : (
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      )}
    </div>
  );
};

export default StoryBillboardImage;