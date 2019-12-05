import React, { Component} from 'react';

import {  
  Card,
  CardBody,  
  Col, 
  Row,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../core/services/commonService';
import Loader from '../Loader/Loader';
import './Dashboard.css';
class Dashboard extends Component {
  constructor( props ){
    super( props );
    this.state = {      
      loading: false,
      dashBoardStats : {userCount: 0, categoryCount: 0, templateCount: 0}
    };
  }
  // Fetch the category List
  componentDidMount() { 
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('dashboard')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, dashBoardStats: res.data.data});     
         
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
    const { dashBoardStats, loading } = this.state; 
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader /> 
    return (
      <div className="animated fadeIn">
        <Row>
          {loaderElement}
          <ToastContainer />
          <Col xs="12" sm="12" lg="12">
            <div className="Main-dashboardHeading"><h2>Dashboard</h2></div>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white cardDetails">
              <CardBody className="">
                <div className="ic-totalUser"> <img src="/assets/img/user-group.png" /> </div>   
                <div className="cardHeading"><h6>Total Users</h6></div>             
                <div className="text-value cardSubHeading">{dashBoardStats.userCount}</div>
                <div className="cardBottomHeading"> <span>8.5%</span> Up from yesterday </div>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white cardDetails">
              <CardBody className="">
                <div className="ic-totalUser categoryYellow"> <img src="/assets/img/ic-category.png" /> </div>   
                <div className="cardHeading"><h6>Total Category</h6></div> 
                <div className="text-value cardSubHeading">{dashBoardStats.categoryCount}</div>
                <div className="cardBottomHeading"> <span>8.5%</span> Up from yesterday </div>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white cardDetails">
              <CardBody className="">
                <div className="ic-totalUser templateRed"> <img src="/assets/img/ic-template.png" /> </div>   
                <div className="cardHeading"><h6>Total Template</h6></div> 
                <div className="text-value cardSubHeading">{dashBoardStats.templateCount}</div>
                <div className="cardBottomHeading"> <span>8.5%</span> Up from yesterday </div>
              </CardBody>
              
            </Card>
          </Col>          
        </Row>        
      </div>
    );
  }  
}

export default Dashboard;
