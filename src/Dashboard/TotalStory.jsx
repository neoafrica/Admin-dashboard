import React, { useState, useEffect } from "react";
import { getStory } from "../Api/post";
import StoryCard from "./StoryCard";

function TotalStory() {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStory();
      setData(data);
      console.log(data)
    };
    fetchData();
  }, []);

  const filteredStory = data?.filter(
    (item) =>
      item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mainContainer">
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
      <div className="scrollable-post-grid">
        <div className="post-grid">
          {filteredStory?.map((item, index) => (
            <StoryCard
              key={index}
              id={item.id}
              username={item.username}
              date={new Date(item.timestamp).toLocaleDateString()}
              profileImage={item.authorPic}
              title={item.title}
              body={item.body}
              likes={item.likes}
              bookmarks={item.bookmarks?.length || 0}
              comments={item?.comments?.length || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TotalStory;
