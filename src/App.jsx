
import "./app.css";
// import "./assets/Styles/loader.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink,Link } from "react-router-dom";

import { UserProvider } from "./Api/userContext";
import { useLogin } from "./Api/useLogin";

import FrontImage from "./FrontImage";
import CreatePost from "./CategoryPost/CreatePost";
import Card from "./card";
import AuthForm from "./login";
import { LogOut } from "./logOut";
import UserTable from "./Dashboard/userTable";
import TotalPost from "./Dashboard/TotalPost";
import PostDetails from "./Dashboard/PostDetails";
import QnDetails from "./Dashboard/QnDEtails";
import StoryBillboardImage from "./StoryBillBoard";

import {
  UserCircle,
  Home,
  FileText,
  Users,
  PlusCircle,
  HelpCircle,
  BookOpenText,
  FilePlus,
  Image,
  ImageUp,
} from "lucide-react";
import { CiLogout } from "react-icons/ci";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { LiaComment } from "react-icons/lia";
import TotalComments from "./Dashboard/TotalComments";
import TotalStory from "./Dashboard/TotalStory";
import StoryDetails from "./Dashboard/StoryDetails";
import TotalQns from "./Dashboard/TotalQns";
import TwitterThreadPost from "./Dashboard/ThreadPost";
import TotalThreads from "./Dashboard/Thread/TotalThread";
import ThreadDetails from "./Dashboard/Thread/ThreadDetails";

// Sidebar Component
const Sidebar = () => {
  const { userData, getToken } = useLogin();

  useEffect(() => {
    getToken();
  }, []);

  const name = userData?.username;

  return (
    <div className="sidebar">
      <div className="user-info">
        <UserCircle size={40} />
        <span>{name}</span>
      </div>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Home size={20} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <UserCircle size={20} /> <span>User Profile</span>
        </NavLink>
        <NavLink to="/create-post" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <PlusCircle size={20} /> <span>Create Post</span>
        </NavLink>
        <NavLink to="/sponsor-logo" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Image size={20} /> <span>Sponsor Logo</span>
        </NavLink>
        <NavLink to="/front-image" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <ImageUp size={20} /> <span>Front Image</span>
        </NavLink>
        <NavLink to="/story-image" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <ImageUp size={20} /> <span>Story Billboard Image</span>
        </NavLink>
        <NavLink to="/log-out" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          {/* <ImageUp size={20} /> <span>Log Out</span> */}
          <CiLogout size={20}  /> <span>Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

// Header Component
const Header = () => (
  <div className="header">
    <h1 className="text-xl font-bold">Admin Panel</h1>
    <div className="flex items-center space-x-2">
      <UserCircle size={30} />
      <span>Admin</span>
    </div>
  </div>
);

// Dashboard Page

const Dashboard = () => (
  <div className="dashboard">
    <Link to="/users">
      <Card className="card clickable"><Users size={20} /> Total Users: 100</Card>
    </Link>
    <Link to="/posts">
      <Card className="card clickable"><FileText size={20} /> Total Posts: 50</Card>
    </Link>
    <Link to="/questions">
      <Card className="card clickable"><HelpCircle size={20} /> Total Questions: 20</Card>
    </Link>
    <Link to="/stories">
      <Card className="card clickable"><BookOpenText size={20} /> Total Stories: 20</Card>
    </Link>
    <Link to="/create-post">
      <Card className="card clickable"><FilePlus size={20} /> Create Post</Card>
    </Link>
    <Link to="/create-thread">
      <Card className="card clickable"><FilePlus size={20} /> Create Thread</Card>
    </Link>
    <Link to="/threads">
      <Card className="card clickable"><FilePlus size={20} /> Total Threads</Card>
    </Link>
    <Link to="/comments">
      <Card className="card clickable"><LiaComment  size={20}/> Total commments: 20</Card>
    </Link>
  </div>
);

// User Profile Page
const UserProfile = () => <div className="dashboard">User Profile Page</div>;
const SponsorLogo = () => <div className="dashboard">Sponsor Logo</div>;

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("isLogin");
    setIsLoggedIn(data === "true");
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="spinner-container">
          <Spinner animating={true} speed={1} size={32} color="#028704" />
          <div className="spinner-text">Loading, please wait...</div>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <div >
          {isLoggedIn ? (
            <div className="app-wrapper">
              <Sidebar />
              <div className="main-content">
                <Header />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/stories" element={<TotalStory />} />
                  <Route path="/questions" element={<TotalQns />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/create-thread" element={<TwitterThreadPost/>} />
                  <Route path="/sponsor-logo" element={<SponsorLogo />} />
                  <Route path="/front-image" element={<FrontImage />} />
                  <Route path="/story-image" element={<StoryBillboardImage />} />
                  <Route path="/log-out" element={<LogOut setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path="/users" element={<UserTable />} />
                  <Route path="/posts" element={<TotalPost />} />
                  <Route path="/threads" element={<TotalThreads />} />
                  <Route path="/comments" element={<TotalComments />} />
                  <Route path="/post/:id" element={<PostDetails />} />
                  <Route path="/story/:id" element={<StoryDetails />} />
                  <Route path="/questions/:id" element={<QnDetails />} />
                  <Route path="/threads/:id" element={<ThreadDetails />} />
                  
                </Routes>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          )}
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;



