import React from 'react';
import { MDBCard, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import commonService from '../../../core/services/commonService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../loader';
class AdminCardSection1 extends React.Component {
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
      <>{loaderElement}
      <ToastContainer />
      <MDBRow className="mb-4">
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color"/>
                <div className="data">
                  <p>Users</p>
                  <h4>
                    <strong>{dashBoardStats.userCount}</strong>
                  </h4>
                </div>
              </div>              
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color"/>
                <div className="data">
                  <p>Category</p>
                  <h4>
                    <strong>{dashBoardStats.categoryCount}</strong>
                  </h4>
                </div>
              </div>              
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-pie" className="light-blue lighten-1"/>
                <div className="data">
                  <p>User Template</p>
                  <h4>
                    <strong>{dashBoardStats.templateCount}</strong>
                  </h4>
                </div>
              </div>             
            </MDBCard>
        </MDBCol>
        
      </MDBRow>
      </>
    )
  }
}

export default AdminCardSection1;

