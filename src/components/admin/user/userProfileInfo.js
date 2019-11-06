import React from "react";
import  { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavigation from "../sideNavigation";
import commonService from '../../../core/services/commonService';
import Loader from '../../loader';
class UserProfileInfo extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      profileInfo: {},
      loading: false,
      profileId: ""
    };
  }
  componentDidMount() {
  const { match: { params } } = this.props;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile/public/'+params.profileId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/user');  
            return;
          }   

          this.setState({loading:false, profileInfo: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
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
    const { profileInfo, loading } = this.state; 
    let loaderElement ='';
      
    if(loading)
        loaderElement = <Loader />
    return (
      <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <ToastContainer />              
              <MDBRow className="mb-12">
                <MDBCol md="6">
                  <h2 className="section-heading mb-4">Profile Information</h2>
                </MDBCol>
                <MDBCol md="6">
                  <div className="text-right">
                    <Link to = "/admin/user">
                      <MDBBtn size="sm" color="primary" className="px-2">
                        <i className="fa fa-arrow-left mt-0"></i> Back
                      </MDBBtn>
                    </Link>
                    
                  </div>
                </MDBCol>
                {loaderElement}
                <MDBCol md="12">
                    <MDBCard narrow>
                      <MDBCardBody cascade className="profileInfo">
                        <MDBRow>
                          <MDBCol md="4"><label>Name: </label><span> {profileInfo.firstName || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>Email: </label><span> {profileInfo.email || 'N/A' }</span></MDBCol>
                          <MDBCol md="4"><label>Phone: </label><span> {profileInfo.phoneNumber || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>Address: </label><span> {profileInfo.address || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>City: </label><span> {profileInfo.city || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>State: </label><span> {profileInfo.state || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>Country: </label><span> {profileInfo.country || 'N/A'}</span></MDBCol>
                          <MDBCol md="4"><label>Postal Code: </label><span> {profileInfo.postalCode || 'N/A'}</span></MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
          </MDBContainer>  
        </main>
      </React.Fragment>
    );
  }
}
export default UserProfileInfo;