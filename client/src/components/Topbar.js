import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/topbar.css";
import { Search } from "@material-ui/icons";
import { ShoppingCart } from "@material-ui/icons";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate, useParams } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";

function Topbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedUser = localStorage.getItem("loggedUser");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  let { category } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const scrollToFeatured = () => {
    const element = document.getElementById("featured-product-container");
    scroll.scrollTo(element.offsetTop);
  };
  const scrollToHome = () => {
    if (category !== undefined) {
      navigate(`/`);
    }
    const element = document.getElementById("home-container");
    scroll.scrollTo(element.offsetTop);
  };

  useEffect(() => {
    axios.get("http://localhost:3002/product").then((response) => {
      setSuggestions(response.data);
    });
  }, []);

  const handleCategoriesClick = (event) => {
    let urlparam = event.currentTarget.textContent;
    urlparam = urlparam.replace(/\s/g, "");
    navigate(`/category/${urlparam}`);
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  let filteredSuggestions = [];
  if (searchText.length > 0)
    filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

    const handleLogout=()=>{
      localStorage.setItem("isLoggedIn",false);
      localStorage.setItem("loggedUser",'guest');
      navigate(`/login`);
    }
  return (
    <div className="topbar-container">
      <div className="topbarContainer">
        <span
          className="logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ShopHere
        </span>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for a product"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>
        {category === undefined && (
          <span className="navbar-links" onClick={scrollToFeatured}>
            FEATURED
          </span>
        )}
        {category !== undefined && (
          <span className="category-navbar-links navbar-links">FEATURED</span>
        )}
        <div className="topbarLinks">
          {category === undefined && (
            <span className="navbar-links" onClick={scrollToHome}>
              HOME
            </span>
          )}
          {category !== undefined && (
            <span className="category-navbar-links navbar-links">Home</span>
          )}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <ShoppingCart 
            className="cart-icon"
            onClick={() => {
              navigate(`/cart`);
            }}
            />
            <div className="topbarIconBadge"></div>
          </div>
          {(isLoggedIn==='undefined' ||isLoggedIn==='false') && (
            <IoLogInOutline
              className="login-icon"
              onClick={() => {
                localStorage.setItem("loggedUser",'guest');
                navigate(`/login`);
              }}
            />
          )}
          {isLoggedIn==='true'&& (
            <>
              <div className="username-label">
                {loggedUser}
                <FaUserCircle
                  className="user-icon"
                  size="30"
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                />
                {isProfileOpen && (
                  <>
                    <div
                      className="triangle-icon"
                      onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                      }}
                    ></div>
                    <div className="profile-div">
                      <div className="all-btn" onClick={handleLogout}>
                        <GoSignOut className="profile-open-icon" size="20" />
                        <span className="option-text">Logout</span>
                      </div>
                      <hr />
                      <div className="all-btn">
                        <FaUserCircle className="profile-open-icon" />
                        <span className="option-text">My Profile</span>
                      </div>
                      <hr />
                      <div className="all-btn">
                        <ShoppingCart className="profile-open-icon" />
                      <span className="option-text">My Cart</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {searchText.length > 0 && filteredSuggestions.length > 0 && (
        <div className="search-focus">
          <ul className="search-suggestions">
            {filteredSuggestions.map((suggestion) => (
              <li
                className="searchlist"
                key={suggestion._id}
                onClick={() => {
                  navigate(`/product/${suggestion._id}`);
                }}
              >
                {suggestion.name}
                {suggestion.featured && (
                  <span className="featured-suggestion">Featured</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="separator-line"></div>
      <div className="topbar-bottom">
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Smartphones
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Cameras
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Computers
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Men's Fashion
        </div>
      </div>
    </div>
  );
}

export default Topbar;

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_shapes_triangle-up
