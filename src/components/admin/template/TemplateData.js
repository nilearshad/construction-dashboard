import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBDataTable } from 'mdbreact';


  
  
class TemplateData extends Component {
  
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
    for(const [i, templateInfo] of this.props.data.entries()){
      let templateDetail = {
        userName: templateInfo.userName,
        categoryName: templateInfo.categoryName,
        caption: templateInfo.caption,
        status: (templateInfo.status && templateInfo.status !== undefined) ? "Active": "InActive",

      }   
      console.log(JSON.stringify(templateDetail));  
      rowsItem.push(templateDetail);
    }    
    this.setState({dataTableItem: rowsItem});
  }
  
  
  render() {
    let data = {
      columns: [
        {
          label: 'User Name',
          field: 'userName',
          sort: 'asc',         
        },
        {
          label: 'Category Name',
          field: 'categoryName',
          sort: 'asc',
         
        },
        {
          label: 'Caption',
          field: 'caption',
          sort: 'asc',
         
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
         
        }       
      ],
      rows: this.state.dataTableItem
    };
    let rowsItem = [];    
    for(const [i, templateInfo] of this.props.data.entries()){
      let templateDetail = {
        userName: templateInfo.userName,
        categoryName: templateInfo.categoryName,
        caption: templateInfo.caption,
        status: (templateInfo.status && templateInfo.status !== undefined) ? "Active": "InActive",

      }   
      console.log(JSON.stringify(templateDetail));  
      rowsItem.push(templateDetail);
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

export default TemplateData;