
import React, { useEffect, useState } from "react";
import defaultimage from "../assets/user5.jpg"
import "../assets/Styles/userTable.css"
import { getAllComments,deleteComment } from "../Api/post";

const TotalComments = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllComments();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Handle search query update
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DeleteComment = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      // await axios.delete(`http://localhost:5000/api/users/${userId}`);
      await deleteComment(userId)
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="user-table-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search comment..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Date created</th>
            <th>Profile</th>
            <th>User Name</th>
            <th>Comment</th>
            <th>Replies</th>
            <th>Likes</th>
            <th>Post Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user?.id} className="row-hover">
                <td>{new Date(user?.createAt).toLocaleDateString()}</td>
                <td>
                  {user?.authorPic? (
                    <img
                      src={user?.authorPic}
                      alt={user?.username}
                      className="user-image"
                    />
                  ) : (
                    <img
                      src={defaultimage}
                      alt={user?.username}
                      className="user-image"
                    />
                  )}
                </td>
                <td>{user?.username}</td>
                <td>{user?.comment}</td>
                <td>{user?.replies.length}</td>
                <td>{user?.likes.length}</td>
                {/* <td>
                  <span
                    className={`role-badge ${
                      user?.role === "Student"
                        ? "student"
                        : user?.role === "Business Owner"
                        ? "business-owner"
                        : "farmer"
                    }`}
                  >
                    {user?.role}
                  </span>
                </td> */}
                <td>{user?.postId}</td>
               
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>  DeleteComment(user?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="no-data">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default TotalComments