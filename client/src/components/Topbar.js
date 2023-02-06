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
import {api} from '../api'

function Topbar() {
  const [loading, setLoading] = useState(true);
  let urlLength=window.location.pathname;
  const [cartCount,setCartCount]=useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedUser = localStorage.getItem("loggedUser");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const scrollToFeatured = () => {
    const element = document.getElementById("featured-product-container");
    scroll.scrollTo(element.offsetTop);
  };
  const scrollToHome = () => {
    const element = document.getElementById("home-container");
    scroll.scrollTo(element.offsetTop);
  };

  useEffect(() => {
    axios.get("http://localhost:3002/product").then((response) => {
      setSuggestions(response.data);
    });
  }, []);

  
  async function getData() {
    try {
      setLoading(true);
      let curr_user = localStorage.getItem("loggedUser");
      const data = {
        username: curr_user,
      };
      const response = await api.put(`order/show`, data);
      setCartCount(response.data.items.length);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  }
  useEffect(() => {
    (async () => {
      await getData();
    })();
    return () => {};
  }, [getData]);

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

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("loggedUser", "guest");
    navigate(`/login`);
  };
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
        {urlLength.length==1 && (
          <span className="navbar-links" onClick={scrollToFeatured}>
            FEATURED
          </span>
        )}
        {urlLength.length>1  && (
          <span className="category-navbar-links">FEATURED</span>
        )}
        <div className="topbarLinks">
          {urlLength.length==1 && (
            <span className="navbar-links" onClick={scrollToHome}>
              HOME
            </span>
          )}
          {urlLength.length>1 && (
            <span className="category-navbar-links">Home</span>
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
            <div className="topbarIconBadge">{cartCount}</div>
          </div>
          {(isLoggedIn === "undefined" || isLoggedIn === "false") && (
            <IoLogInOutline
              className="login-icon"
              onClick={() => {
                localStorage.setItem("loggedUser", "guest");
                navigate(`/login`);
              }}
            />
          )}
          {isLoggedIn === "true" && (
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
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Women's Fashion
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Headphones
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Furniture
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Books
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Fragrances
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Grocery
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Skin Care
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Watches
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Shoes
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Kitchenware
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Chocolates
        </div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>
          Jewellery
        </div>
      </div>
    </div>
  );
}

export default Topbar;

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_shapes_triangle-up
