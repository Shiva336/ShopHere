import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const scrollToHome = () => {
    const element = document.getElementById("home-container");
    scroll.scrollTo(element.offsetTop);
  };

  useEffect(() => {
    axios.get("http://localhost:3002/product").then((response) => {
      setSuggestions(response.data);
    });
  }, []);

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
            <BsSearch className="searchIcon" />
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
              <FaShoppingCart />
              <span className="topbarIconBadge">2</span>
            </div>
            <IoLogInOutline
              className="login-icon"
              onClick={() => {
                navigate(`/login`);
              }}
            />
          </div>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
