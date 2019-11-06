import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

const AdminCardSection1 = () => {
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color"/>
                <div className="data">
                  <p>Users</p>
                  <h4>
                    <strong>10</strong>
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
                    <strong>0</strong>
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
                    <strong>0</strong>
                  </h4>
                </div>
              </div>             
            </MDBCard>
        </MDBCol>
        
      </MDBRow>
  )
}

export default AdminCardSection1;

