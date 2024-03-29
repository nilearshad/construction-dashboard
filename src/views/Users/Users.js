import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../core/services/commonService';
import Loader from '../Loader/Loader';
import UsersData from './UsersData';
import './Users.css'

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      userList: [],
    } 
    this.handleDeleteUserProfile = this.handleDeleteUserProfile.bind(this);
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

  /* Delete User Profile*/
  handleDeleteUserProfile(rowIndex) {
    const profileInfo = this.state.userList[rowIndex];
   
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `profile/`+profileInfo.profileId)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          
          toast.success(res.data.message);
          this.userList();
        } )
        .catch( err => {       
            
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else{
            this.setState( { loading: false } );
            toast.error(err.message);
          }
      } )
    })
  }
  render() {

    const { userList, loading } = this.state;     
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Users List</strong> 
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <UsersData data={userList} dataTableLoadingStatus = {this.state.loading} deleteUserProfile = {this.handleDeleteUserProfile} />
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default Users;
