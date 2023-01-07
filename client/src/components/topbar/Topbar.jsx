import React from 'react'
import './topbar.css'
import {Person} from '@material-ui/icons';
import {Search } from '@material-ui/icons';
import {Notifications} from '@material-ui/icons';
import {ShoppingCart} from '@material-ui/icons';

function Topbar() {
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <span className="logo">ShopHere</span>
        </div>

        <div className="topbarCenter">
            <div className="searchbar">
                <Search className='searchIcon'/>
                <input placeholder='Search for a product' className="searchInput" />
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
            <img src="/assets/person/people1.jpg " alt="profile pic" className='topbarImg'/>
        </div>
    </div>
  )
}

export default Topbar