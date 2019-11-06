import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import SideNavigation from "../sideNavigation";
import TemplateDataItem from './TemplateData';
import './template.css';

class Template extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      templateList: []
    } 
    
  }
  componentDidMount() { 
    this.templateList();
  }

  /*User List API*/
  templateList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`template/item/list`)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, templateList: res.data.data});     
         
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
    } )
  }
  render() {
    const { templateList, loading } = this.state; 
    let tableConatiner = '';
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />
    tableConatiner = <TemplateDataItem data={templateList} />;
   
    return (
       <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <MDBRow className="mb-12">
                <MDBCol md="12">
                  <h2 className="section-heading mb-4">Template List</h2>
                </MDBCol>                
                {loaderElement}
                <ToastContainer />
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

export default Template;