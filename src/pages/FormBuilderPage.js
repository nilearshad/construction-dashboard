import React from "react";
import ReactDOM from 'react-dom';
import  { Redirect } from 'react-router-dom';
import Auth from '../Auth';
import {ReactFormBuilder } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import "./FormBuilderPage.css";

import {
  MDBView,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBMask,
  MDBCard,
  MDBAlert
} from "mdbreact";
const getUrl = (cid) => `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;
class FormBuilderPage extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      email: '',
      password: '',
      userName: '',
      loggedIn: false,
      loading: false,
      error: '',
      alertColor: '',
      alertClassName: 'd-none'
    };
  }
  onLoad = () => {
    const url = getUrl(this.formId);
    console.log('onLoad', url);
    //return get(url);
  };

  onPost = (data) => {
    const saveUrl = getUrl(this.formId);
    console.log('onPost', saveUrl, data);
    debugger;
  };
  scrollToTop = () => window.scrollTo(0, 0);
  
  

  render() {
    

      return (
        <MDBView>
           
              <MDBContainer>
                <MDBRow>                  
                  <MDBCol className="form-builder">
                    <MDBCard >
                      <MDBCardBody className="z-depth-2">
                        <div className="text-center">
                          <h4 className="text-heading"><strong>Create Your Own Template</strong></h4>
                        </div>
                        <hr />
                         <ReactFormBuilder
        
          onPost={this.onPost}
         />
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            
          </MDBView>
        
      );
    
  }
}

export default FormBuilderPage;
