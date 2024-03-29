import React, { Component } from 'react';
import { Table } from 'reactstrap';
function TemplateRow(props) {
  const templateInfo = props.templateInfo;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{templateInfo.userName}</td>
      <td>{templateInfo.categoryName}</td>
      <td>{templateInfo.fileName}</td>
      <td>{getStatus(templateInfo.status || true)}</td>
      <td>{templateInfo.action}</td>
    </tr>
  )
} 
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
        status: templateInfo.status || true,
        action: <p><a href={`${templateInfo.pdfUrl}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-download"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteTemplateItem(i)}} ><i className="fa fa-trash"></i></a></p>,

      }  
      rowsItem.push(templateDetail);
    } 

    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">User Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Filename</th>           
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((templateInfo, index) =>
            <TemplateRow key={index} templateInfo={templateInfo}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default TemplateData;