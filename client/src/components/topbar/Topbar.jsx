import React from "react";
import axios from "axios";
import { useState } from "react";
import "./topbar.css";
import { Person } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import { Notifications } from "@material-ui/icons";
import { ShoppingCart } from "@material-ui/icons";
import { animateScroll as scroll } from "react-scroll";


function Topbar() {
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
 
  useEffect(()=> {
        axios.get("http://localhost:3002/product").then(
        (response) => { 
                setSuggestions(response.data);
        });
    },[])

    const handleSearchChange = event => {
        setSearchText(event.target.value);
    };

    let filteredSuggestions = [];
    if(searchText.length > 0)
        filteredSuggestions = suggestions.filter(suggestion => suggestion.name.startsWith(searchText));

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
              {filteredSuggestions.map(suggestion => (
                  <li className='searchlist' key={suggestion._id}>{suggestion.name}</li>
              ))}
          </ul>
        </div>
      </div>

      <div className="topbarRight">
        <span className="navbar-links" onClick={scrollToFeatured}>Featured</span>
        <div className="topbarLinks">
          <span className="topbarLink"  onClick={scrollToHome}>Homepage</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ShoppingCart />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img
          src="assets/person/people1.jpg"
          alt="profile pic"
          className="topbarImg"
        />
      </div>
    </div>
  );
}

export default Topbar;
