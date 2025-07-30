
import React,{useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ImBin } from "react-icons/im";
import Modal from './Modal';
import { deleteFrontImage } from './Api/post';

function Billboard({image, desc, date, postId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false)

    // Open the modal when delete icon is clicked
    const handleDeleteClick = async() => {
      setIsModalOpen(true);
    };
  
    // Close the modal
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    // Confirm deletion action (Add your delete logic here)
    const handleConfirmDelete =async () => {
        const result= await deleteFrontImage(postId)

        if(result.status == 200){
            alert('item deleted successfully')
            setDeleteStatus(true)
        }
      console.log("Item Deleted");
      setIsModalOpen(false); // Close modal after confirming
    };
  return (
    <div className='billboard'>
        {/* <div className='image'>
            <img src={image} alt='preview' className='image'/>
        </div> */}
        <div className='image'>

         <LazyLoadImage 
          src={image} 
          alt="preview"
          className="image"
          effect="blur" // You can change this to "opacity" or "black-and-white"
        />
        </div>
        <p style={{fontSize:14, width:150}}>{desc.length > 40? desc.slice(0,30) + "....":desc}</p>

        <div className="billboard-footer">
        <p style={{fontSize:12, color:"#aaa"}}>{date}</p>
        <ImBin className="delete-icon"  size={14} color='#676767' onClick={handleDeleteClick}/>
        </div>

         {/* Confirmation Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
        deleteStatus={deleteStatus}
      />
    </div>
  )
}

export default Billboard