import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Search } from "@material-ui/icons";
import { ShoppingCart } from "@material-ui/icons";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import {IoLogInOutline} from 'react-icons/io5'


function Navbar() {
  
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
      suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
    console.log(filteredSuggestions);

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
          </div>
        </div>

        <div className="topbarRight">
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
            <IoLogInOutline className="login-icon" onClick={()=>{navigate(`/login`)}}/>
          </div>
        </div>
      </div>
      <div className="search-focus">
        {searchText.length > 0&&
        <ul className="search-suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li className="searchlist" key={suggestion._id}  onClick={()=> {window.location.href = `/product/${suggestion._id}`; }}>
              {suggestion.name}
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
}

export default Navbar;
