import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Search } from "@material-ui/icons";
import { ShoppingCart } from "@material-ui/icons";
import {IoLogInOutline} from 'react-icons/io5'

function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
      suggestion.name.startsWith(searchText)
    );

  console.log(filteredSuggestions);
  return (
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
        <div className="topbarLinks">
          <span
            className="navbar-links"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            HOME
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <ShoppingCart />
            <span className="topbarIconBadge">2</span>
          </div>
        </div><IoLogInOutline className="login-icon"/>
      </div>
    </div>
  );
}

export default Navbar;
