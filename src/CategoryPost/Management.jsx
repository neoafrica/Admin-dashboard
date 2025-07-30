// import React from 'react'
import "../assets/Styles/posts.css";
import "../assets/Styles/case.css";
import React, { useState } from "react";
import { createCase } from "../Api/post";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { useLogin } from "../Api/useLogin";

const Management = ({ category }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  const { userData } = useLogin();

  console.log(category);

  const [formData, setFormData] = useState({
    author: userData?._id,
    category: category,
    caseTitle:"",
    typeOfAnimal: "",
    sexOfAnimal: "",
    ageOfAnimal: "",
    managementCategory: "",
    description: "",
    // caseHistory: "",
    // clinicalFindings: "",
    // clinicalManagement: "",
    // drugsUsed: "",
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
          caseTitle:"",
          typeOfAnimal: "",
          sexOfAnimal: "",
          ageOfAnimal: "",
          managementCategory: "",
          description: "",
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
      <h2>🩺 Management Case Details</h2>
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

        <label>Management category:</label>
        <select
          name="managementCategory"
          value={formData.managementCategory}
          onChange={handleChange}
          className={!formData.managementCategory ? "placeholder" : ""}
        >
          <option value="" disabled hidden>
            Select Management category
          </option>
          <option value="Animal feeds">Animal feeds</option>
          <option value="Animal breeds">Animal breeds</option>
          <option value="Parasite control">Parasite control</option>
          <option value="Animal housing">Animal housing</option>
          <option value="Growth Management">Growth Management</option>
        </select>
        {errors.managementCategory && <p className="error">{errors.managementCategory}</p>}

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the choosen category"
        />
        {errors.description && (
          <p className="error">{errors.description}</p>
        )}


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
          multiple
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
            Submit Clinical Case
          </button>
        )}
      </form>
    </div>
  );
};

export default Management;