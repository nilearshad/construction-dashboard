import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBDataTable, MDBIcon } from 'mdbreact';


  
  
class UserData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {     
    let rowsItem = [];
    let indexCount = 0;
    for(const [i, userInfo] of this.props.data.entries()){
      let userDetail = {
        name: userInfo.firstName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        status: (userInfo.status && userInfo.status != undefined) ? "Active": "InActive",

      }      
      rowsItem.push(userDetail);
    }    
    this.setState({dataTableItem: rowsItem});
  }
  
  
  render() {
    let data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',         
        },
        {
          label: 'Email Address',
          field: 'email',
          sort: 'asc',
         
        },
        {
          label: 'Phone',
          field: 'phoneNumber',
          sort: 'asc',
         
        },
        
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',          
        },   
        {
          label: 'Action',
          field: 'action',      
        },     
      ],
      rows: this.state.dataTableItem
    };
    let rowsItem = [];
    let indexCount = 0;
    for(const [i, userInfo] of this.props.data.entries()){
      let userDetail = {
        name: userInfo.firstName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address || "",
        status: (userInfo.status && userInfo.status != undefined) ? "Active": "InActive",
        action: <p><a disabled={this.state.buttonProcessing} ><MDBIcon icon="edit"></MDBIcon> </a>
          <a disabled={this.state.buttonProcessing} ><MDBIcon icon="trash"></MDBIcon></a></p>,

      }  
      debugger;    
      rowsItem.push(userDetail);
    } 
    data.rows = rowsItem;
    return (
      <MDBCard narrow>
      <MDBCardBody cascade>

        <MDBDataTable
          striped
          bordered
          hover
          data={data}
        />
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default UserData;