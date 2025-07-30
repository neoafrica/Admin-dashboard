

import React, { useEffect, useState } from "react";
import defaultimage from "../assets/user5.jpg"
import "../assets/Styles/userTable.css"
import { getTotalUsers, DeleteUser } from "../Api/post";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getTotalUsers();
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
      user?.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      // await axios.delete(`http://localhost:5000/api/users/${userId}`);
      await DeleteUser(userId)
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-table-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Registration Date</th>
            <th>Profile</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Total Posts</th>
            <th>Total Story</th>
            <th>Total Questions</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user?._id} className="row-hover">
                <td>{new Date(user?.timestamp).toLocaleDateString()}</td>
                <td>
                  {user?.profileImage?.secure_url ? (
                    <img
                      src={user?.profileImage?.secure_url}
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
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>
                  <span
                    className={`role-badge ${
                      user?.role === "Student"
                        ? "student"
                        : user?.role === "Agrovet owner"
                        ? "Agrovet-owner"
                        : "Farmer"
                    }`}
                  >
                    {user?.role}
                  </span>
                </td>
                <td>{user?.totalCases || 0}</td>
                <td>{user?.totalStories || 0}</td>
                <td>{user?.totalQAs || 0}</td>
                <td>
                  <span
                    className={`role-badge ${
                      user?.isAdmin ? "admin-yes" : "admin-no"
                    }`}
                  >
                    {user?.isAdmin ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user?._id)}
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

export default UserTable;
