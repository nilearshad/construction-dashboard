import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import SideNavigation from "../sideNavigation";
import UserDataItem from './UserData';
import './user.css';

class user extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      userList: []
    } 
    
  }
  componentDidMount() { 
    this.userList();
  }

  /*User List API*/
  userList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`profile/list`)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, userList: res.data.data});     
         
        } )
        .catch( err => {   
          debugger;      
          if(err.response != undefined && err.response.status == 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message); 
          }  
        } )
    } )
  }
  render() {
    const { userList, loading } = this.state; 
    let tableConatiner = '';
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />
    tableConatiner = <UserDataItem data={userList} />;
    
    return (
       <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <MDBRow className="mb-12">
                <MDBCol md="12">
                  <h2 className="section-heading mb-4">User List </h2>
                </MDBCol>                
                {loaderElement}
                <MDBCol md="12">
                    {tableConatiner}
                </MDBCol>
            </MDBRow>
          </MDBContainer>
        </main>
      </React.Fragment>
    );
  }
}

export default user;