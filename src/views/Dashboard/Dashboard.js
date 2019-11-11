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
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">                
                <div className="text-value">{dashBoardStats.userCount}</div>
                <div>Users</div>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                
                <div className="text-value">{dashBoardStats.categoryCount}</div>
                <div>Category</div>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                
                <div className="text-value">{dashBoardStats.templateCount}</div>
                <div>User Template</div>
              </CardBody>
              
            </Card>
          </Col>          
        </Row>        
      </div>
    );
  }  
}

export default Dashboard;
