import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

class UsersData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {   
  }
  
  deleteUserInfo(index){

  }
  render() {
    
    let rowsItem = [];
    
    for(const [i, userInfo] of this.props.data.entries()){    
      let userDetail = {
        firstName: userInfo.firstName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber || " ",
        address: userInfo.address || " ",
        status: userInfo.status ? "Active" : "Inactive",
        action: <p><Link to={`/admin/users/${userInfo.profileId}`}><i className="fa fa-eye"></i> </Link>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => {
          if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUserInfo(i) }} ><i className="fa fa-trash"></i></a></p>,

      }  
      rowsItem.push(userDetail);
    }       
    const columns = [
      {
        label: 'Name',
        name: 'firstName',
      },
      {
        label: 'Email',
        name: 'email',
      },
      {
        label: 'Phone',
        name: 'phoneNumber',
      },
      {
        label: 'Status',
        name: 'status',
      },
      {
        label: 'Action',
        name: 'action',
      },
    ];
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      download: false,
      selectableRows: false,
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Proccessing........" : "Sorry, no matching records found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      }

    };
    
    return (
      <MUIDataTable
        title={"User List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default UsersData;