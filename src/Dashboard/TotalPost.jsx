
import React, { useState, useEffect } from "react";
import { recentCases } from "../Api/post";
import PostCard from "./PostCard";

function TotalPost() {
  const categories = [
    "Clinical",
    "Surgery",
    "Vaccination",
    "Postmortem",
    "Management",
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCase, setRecentCase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await recentCases();
      setRecentCase(data);
    };
    fetchData();
  }, []);

  const filteredCases = recentCase
    ?.filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .filter(
      (item) =>
        item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.caseTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="mainContainer">
      {/* Category Buttons */}
      <div className="postcontainer">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`postcategory ${
              selectedCategory === item ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(item)}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by title or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Scrollable Case Grid */}
      <div className="scrollable-post-grid">
        <div className="post-grid">
          {filteredCases?.map((item, index) => (
            <PostCard
              key={index}
              id={item.id}
              username={item.username}
              caseImage={item.caseImage}
              date={new Date(item.createdAt).toLocaleDateString()}
              profileImage={item.authorPic}
              title={item.caseTitle}
              body={item.caseHistory}
              body2={item.VaccinationRegime}
              body3={item.description}
              bookmarks={item.bookmarks?.length || 0}
              comments={item.comments || 0}
              category={item.category}
              typeOfAnimal={item.typeOfAnimal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TotalPost;

