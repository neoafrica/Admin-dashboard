import React,{useState} from 'react';
import '../assets/Styles/posts.css'
import ClinicalPost from './ClinicalPost';
import Surgery from './Surgery';
import Vaccination from './Vaccination';
import Postmortem from './Postmortem';
import Management from './Management';

function CreatePost() {
  const categories = ["Clinical", "Surgery", "Vaccination", "Postmortem", "Management"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedCategory) {
      case "Clinical": return <ClinicalPost category={selectedCategory} />;
      case "Surgery": return <Surgery category={selectedCategory}/>;
      case "Vaccination": return <Vaccination category={selectedCategory}/>;
      case "Postmortem": return <Postmortem category={selectedCategory}/>;
      case "Management": return <Management category={selectedCategory}/>;
      default: return <p>Select a category to see details.</p>;
    }
  };

  return (
    <div className='mainContainer'>

    <div className="postcontainer">
      {/* Category Buttons */}
      {categories.map((item, index) => (
        <div 
          key={index} 
          className={`postcategory ${selectedCategory === item ? 'active' : ''}`}
          onClick={() => setSelectedCategory(item)}
        >
          <p>{item}</p>
        </div>
      ))}

      {/* Render the selected category's component */}
    </div>
      <div className="post-content">{renderComponent()}</div>

    </div>
  );
}

export default CreatePost;
