import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

class CategoryData extends Component {
  
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
  /* Edit Category Item */
  editCategoryItem(rowIndex){    
    this.props.editCategoryAction(rowIndex);
  }
  /*Delete Category*/
  deleteCategoryItem(rowIndex){    
    this.props.deleteCategoryAction(rowIndex);
  }
  
  render() {
    
    let rowsItem = [];    
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,
        status: cat.status ? "Active" : "Inactive" ,       
        action: <><a href="#!" className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editCategoryItem(i)}><i className="fa fa-pencil"></i> </a>
          <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          { if (window.confirm('Are you sure you wish to delete this category?')) this.deleteCategoryItem(i)}}><i className="fa fa-trash"></i></a></>,       
      }      
      rowsItem.push(catInfo);
    }
    
    const columns = [
      {
        label: 'Category',
        name: 'name',
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
        title={"Category List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default CategoryData;