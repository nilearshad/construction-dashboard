import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

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
  }
  /*Delete Template Data*/
  deleteTemplateItem(rowIndex){    
    this.props.deleteTemplateAction(rowIndex);
  }
  render() {
    
    let rowsItem = []; 
    for(const [i, templateInfo] of this.props.data.entries()){    
      let templateDetail = {
        userName: templateInfo.userName,
        categoryName: templateInfo.categoryName,
        fileName: templateInfo.fileName || " ",        
        status: templateInfo.status ? "Active" : "Inactive",
        action: <><a href={`${templateInfo.pdfUrl}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-download"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteTemplateItem(i)}} ><i className="fa fa-trash"></i></a></>,

      }  
      rowsItem.push(templateDetail);
    } 
    const columns = [
      {
        label: 'Category Name',
        name: 'categoryName',
      },
      {
        label: 'Filename',
        name: 'fileName',
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
        title={"User File"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default TemplateData;