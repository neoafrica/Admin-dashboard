// import React from 'react'
import "../assets/Styles/posts.css";
import "../assets/Styles/case.css";
import React, { useState } from "react";
import { createCase } from "../Api/post";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { useLogin } from "../Api/useLogin";

const Surgery = ({ category }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  const { userData } = useLogin();

  console.log(category);

  const [formData, setFormData] = useState({
    author: userData?._id,
    category: category,
    typeOfAnimal: "",
    sexOfAnimal: "",
    ageOfAnimal: "",
    caseHistory: "",
    drugsUsed: "",
    caseTitle: "",
    ProceduralSteps: "",
    Poc: "",
  });

  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFiles(files); // store actual image files
    setImagePreviews(previews); // store previews for display
  };

  const renderImages = () => (
    <div className="grid grid-cols-3 gap-4 my-4">
      {imagePreviews.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Preview ${idx}`}
          className="w-full h-40 object-cover rounded-xl shadow"
        />
      ))}
    </div>
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (imageUploaded) return;

    setImageUploaded(true);

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    imageFiles.forEach((file) => {
      submissionData.append("images", file); // adjust the key name as needed
    });

    // console.log("submit =>",submissionData)
    // You can now send `submissionData` via fetch or axios
    try {
      const response = await createCase(submissionData);

      // if (!response.ok) throw new Error("Submission failed");

      console.log("form =>", formData);

      if (response.data.status === "ok") {
        alert("Clinical Case Submitted Successfully!");
        setFormData({
          author: userData?._id,
          category: category,
          typeOfAnimal: "",
          sexOfAnimal: "",
          ageOfAnimal: "",
          caseHistory: "",
          drugsUsed: "",
          caseTitle: "",
          ProceduralSteps: "",
          Poc: "",
        });
        setImageFiles([]);
        setImagePreviews([]);

        setImageUploaded(false);
      }
    } catch (err) {
      setImageUploaded(false);
      const errorMessage =
        err?.response?.data?.message || err.message || "Unknown error";
      alert("Error submitting form: " + errorMessage);
    }
  };

  return (
    <div className="clinical-form-container">
      <h2>🩺 Surgical Case Details</h2>
      <form onSubmit={handleSubmit} className="clinical-form">
        {/* Fields */}
        <label>Case Title:</label>
        <textarea
          name="caseTitle"
          value={formData.caseTitle}
          onChange={handleChange}
          placeholder="Case Title"
        />
        {errors.caseTitle && (
          <p className="error">{errors.caseTitle}</p>
        )}
        <label>Type of Animal:</label>
        <select
          name="typeOfAnimal"
          value={formData.typeOfAnimal}
          onChange={handleChange}
          className={!formData.typeOfAnimal ? "placeholder" : ""}
        >
          <option value="" disabled hidden>
            Select Type of Animal
          </option>
          <option value="dog">Dog</option>
          <option value="cow">Cow</option>
          <option value="poultry">Poultry</option>
          <option value="cat">Cat</option>
          <option value="goat">Goat</option>
          <option value="pig">Pig</option>
        </select>
        {errors.typeOfAnimal && <p className="error">{errors.typeOfAnimal}</p>}

        <label>Sex of Animal:</label>
        <select
          name="sexOfAnimal"
          value={formData.sexOfAnimal}
          onChange={handleChange}
          className={!formData.sexOfAnimal ? "placeholder" : ""}
        >
          <option value="" disabled hidden>
            Select Sex of Animal
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.sexOfAnimal && <p className="error">{errors.sexOfAnimal}</p>}

        <label>Age of Animal:</label>
        <input
          name="ageOfAnimal"
          value={formData.ageOfAnimal}
          onChange={handleChange}
          placeholder="Enter Age of Animal"
        />
        {errors.ageOfAnimal && <p className="error">{errors.ageOfAnimal}</p>}

        <label>Background Information:</label>
        <textarea
          name="caseHistory"
          value={formData.caseHistory}
          onChange={handleChange}
          placeholder="Enter background information"
        />
        {errors.caseHistory && <p className="error">{errors.caseHistory}</p>}

        <label>Procedural steps:</label>
        <textarea
          name="ProceduralSteps"
          value={formData.ProceduralSteps}
          onChange={handleChange}
          placeholder="Describe surgery procedural steps"
        />
        {errors.ProceduralSteps && (
          <p className="error">{errors.ProceduralSteps}</p>
        )}

        <label>Post operative care (P.o.C):</label>
        <textarea
          name="Poc"
          value={formData.Poc}
          onChange={handleChange}
          placeholder="Enter management details"
        />
        {errors.Poc && (
          <p className="error">{errors.Poc}</p>
        )}

        <label>Drugs Used:</label>
        <textarea
          name="drugsUsed"
          value={formData.drugsUsed}
          onChange={handleChange}
          placeholder="Enter drugs used"
        />
        {errors.drugsUsed && <p className="error">{errors.drugsUsed}</p>}

        {/* File Upload */}
        <label
          htmlFor="file-upload"
          className="upload-btn block mt-4 text-blue-600 font-semibold cursor-pointer"
        >
          + Attach Images
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple          /**Allow multiple images selection */
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Previews */}
        {renderImages()}

        {/* <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4 hover:bg-green-700 transition-all"
        >
          Submit Clinical Case
        </button> */}

        {imageUploaded ? (
          <div className="spinner">
            <Spinner animating={true} speed={1} size={16} color="#fff" />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-6 py-2 rounded-xl mt-4 hover:bg-green-700 transition-all"
          >
            Submit Surgical Case
          </button>
        )}
      </form>
    </div>
  );
};

export default Surgery;
