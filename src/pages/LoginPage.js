import React from "react";
import  { Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commenService from '../core/services/commonService';
import Loader from '../components/loader';
import {
  MDBView,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBMask,
  MDBCard
} from "mdbreact";
import "./LoginPage.css";

class LoginPage extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      email: '',
      password: '',
      userName: '',
      loggedIn: false,
      loading: false,
    };
  }

  scrollToTop = () => window.scrollTo(0, 0);
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if(this.state.email === "" || this.state.password === "") {
      toast.error("All field are required");
      return;
    }
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/sign-in`, loginData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
  
          const loggedInfo = res.data;
          if(loggedInfo.data.role.toLowerCase() !== 'admin') {
            this.setState( { loading: false } );
            toast.error("Invalid login access");
            return false
          }
          localStorage.setItem( 'accessToken', loggedInfo.data.accessToken );
          localStorage.setItem( 'refreshToken', loggedInfo.data.refreshToken );
          localStorage.setItem( 'role', loggedInfo.data.role );
          localStorage.setItem( 'userName', loggedInfo.data.firstName );
  
          this.setState( {
            loading: false,              
            loggedIn: true
          } )
          toast.success(res.data.message);
          this.props.history.push('/admin/dashboard');
          
        } )
        .catch( err => {
          debugger;
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loggedIn, loading } = this.state;

    if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return ( <Redirect to={`/admin/dashboard`} noThrow /> )
		} else {
    let loaderElement = <>Sign IN <div className="spinner-border text-primary buttonloader" role="status">
                  <span className="sr-only">Loading...</span>
              </div></>;
    
      return (
        <>
        <div id="loginPage">
          <MDBView>
            <MDBMask className="rgba-indigo-strong d-flex justify-content-center align-items-center" >
              <MDBContainer>
                <MDBRow>                  
                  <MDBCol className="loginForm">
                    <MDBCard >
                      <MDBCardBody className="z-depth-2">
                        <div className="text-center">
                          <h4 className="text-heading"><strong>Login to your account<br />And begin a beautiful journey</strong></h4>
                        </div>
                        <hr />
                        
                        <ToastContainer /> 
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                                    
                          <MDBInput icon="envelope" group type="email" name="email" value={email} onChange={this.changeHandler} id="email" label="Your email *" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your registered email-id.
                            </div>
                          </MDBInput>
                          <MDBInput icon="lock" group type="password" name="password" value={password} onChange={this.changeHandler} id="password" label="Password *" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your registered password.
                            </div>
                          </MDBInput>
                          
                          <MDBRow className="d-flex align-items-center">
                            <MDBCol md="7" className="d-flex align-items-start">
                              <MDBInput label={ <>Keep me signed in</> } type='checkbox' id='checkbox1' />
                            </MDBCol>
                            <MDBCol md="5" className="d-flex justify-content-end">
                              <p className="font-small pt-3">
                                <a href="#!" className="ml-1">Forgot Password?</a>
                            </p>
                            </MDBCol>
                          </MDBRow>
                          <div className="text-center mt-3">
                            <MDBBtn color="amber" type="submit" disabled = {loading ? true: false}>{loading ? loaderElement : 'SIGN IN'}</MDBBtn>
                          </div>                          
                        </form>  
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </div>         
        </>
      );
    }
  }
}

export default LoginPage;
