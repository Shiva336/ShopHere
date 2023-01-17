import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./topbar.css";
import { Search } from "@material-ui/icons";
import { ShoppingCart } from "@material-ui/icons";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import {IoLogInOutline} from 'react-icons/io5'


function Topbar() {
  
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

  const handleCategoriesClick=(event)=>{
      let urlparam=event.currentTarget.textContent;
      urlparam = urlparam.replace(/\s/g, '');
      navigate(`/category/${urlparam}`);
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  let filteredSuggestions = [];
  if (searchText.length > 0)
    filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.name.startsWith(searchText)
    );

  return (
    <div className="topbar-container">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span
            className="logo"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ShopHere
          </span>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for a product"
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="searchInput"
            />

            <ul>
              {filteredSuggestions.map((suggestion) => (
                <li className="searchlist" key={suggestion._id}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="topbarRight">
          <span className="navbar-links" onClick={scrollToFeatured}>
            FEATURED
          </span>
          <div className="topbarLinks">
            <span className="navbar-links" onClick={scrollToHome}>
              HOME
            </span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <ShoppingCart />
              <span className="topbarIconBadge">2</span>
            </div>
            <IoLogInOutline className="login-icon"/>
          </div>
        </div>
      </div>
      <div className="separator-line"></div>
      <div className="topbar-bottom">
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>Smartphones</div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>Cameras</div>
        <div className="topbar-bottom-text" onClick={handleCategoriesClick}>Computers</div>
      </div>
    </div>
  );
}

export default Topbar;
