import React from 'react'
import axios from "axios"
import { useState } from 'react';
import { useEffect } from 'react';
import './topbar.css'
import {Person} from '@material-ui/icons';
import {Search } from '@material-ui/icons';
import {Notifications} from '@material-ui/icons';
import {ShoppingCart} from '@material-ui/icons';

function Topbar() {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]); 

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
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <span className="logo">ShopHere</span>
        </div>

        <div className="topbarCenter">
            <div className="searchbar">
                <Search className='searchIcon'/>
                <input placeholder='Search for a product' type='text' value={searchText} onChange={handleSearchChange} className="searchInput" />
                
                <ul className='searchlist'>
                    {filteredSuggestions.map(suggestion => (
                        <li key={suggestion.name}>{suggestion.name}</li>
                    ))}
                </ul>

            </div>
        </div>

        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
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
            <img src="assets/person/people1.jpg" alt="profile pic" className='topbarImg'/>
        </div>
    </div>
  )
}

export default Topbar