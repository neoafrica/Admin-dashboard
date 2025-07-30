// import React, { useState, useEffect } from "react";
// import { getQuestions } from "../Api/post";
// import QnCard from "./QnCard";

// function TotalQns() {
//   const [data, setData] = useState();
//   const [searchQuery, setSearchQuery] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getQuestions();
//       setData(data);
//       console.log(data)
//     };
//     fetchData();
//   }, []);

//   const filteredStory = data?.filter(
//     (item) =>
//       item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.qn?.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   return (
//     <div className="mainContainer">
//       {/* Search Bar */}
//       <div className="search-bar-container">
//         <input
//           type="text"
//           placeholder="Search by title or username..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />
//       </div>
//       <div className="scrollable-post-grid">
//         <div className="post-grid">
//           {filteredStory?.map((item, index) => (
//             <QnCard
//             key={index}
//             id={ item.id}
//             authorId={ item.authorId}
//             username= {item?.username}
//             authorPic= {item?.authorPic}
//             history= {item?.history}
//             qn= {item?.qn}
//             typeOfAnimal= {item.typeOfAnimal}
//             sexOfAnimal= {item.sexOfAnimal}
//             ageOfAnimal ={ item.ageOfAnimal}
//             qnImage= {item?.qnImage}
//             comments= {item?.comments}
//             timestamp= {item.timestamp}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TotalQns;

import React, { useState, useEffect } from "react";
import { getQuestions } from "../Api/post";
import QnCard from "./QnCard";

function TotalQns() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuestions();
        setData(response);
        // console.log("Fetched questions:", response);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchData();
  }, []);

  const filteredQuestions = data.filter(
    (item) =>
      (item?.username?.toLowerCase() || "").includes(
        searchQuery.toLowerCase())
      // ) || (item?.qn?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mainContainer">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by question or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Questions Grid */}
      <div className="scrollable-post-grid">
        <div className="post-grid">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <QnCard
                key={index}
                id={item.id}
                authorId={item.authorId}
                username={item?.username}
                authorPic={item?.authorPic}
                history={item?.history}
                qn={item?.qn}
                typeOfAnimal={item.typeOfAnimal}
                sexOfAnimal={item.sexOfAnimal}
                ageOfAnimal={item.ageOfAnimal}
                qnImage={item?.qnImage}
                comments={item?.comments}
                timestamp={item.timestamp}
              />
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalQns;
