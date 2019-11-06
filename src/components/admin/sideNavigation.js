import React from 'react';
import logo from "../../assets/logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './sideNavigation.css';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="tachometer-alt" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>                
                <NavLink to="/admin/category" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Category
                    </MDBListGroupItem>
                </NavLink> 
                <NavLink to="/admin/template" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user-tie" className="mr-3"/>
                        Manage Template
                    </MDBListGroupItem>
                </NavLink> 
                <NavLink to="/admin/user" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user-tie" className="mr-3"/>
                        Manage User
                    </MDBListGroupItem>
                </NavLink>              
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;