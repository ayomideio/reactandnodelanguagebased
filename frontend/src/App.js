import React from 'react';
import Table from './components/Table';
import Form from './components/Form';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';
import components from './components/Dummy/components.json';
import axios from 'axios'
var language=[]
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [...components],
      language:[],
      showForm: false,
      selectedData: null,
      mode: null // Mode available: create, edit, view, delete
    }
  }
  componentDidMount(){
    // alert(navigator.language)
   
    axios.get("http://localhost:3003/languages").then(
      res=>{
        
       
        var dt
         for (var i=0;i<res.data.length;i++){
          dt= res.data[i].language
      // alert(navigator.language)
        }
        for (var j=0;j<dt.length;j++){
          if(JSON.stringify(dt[j]).includes('en_')){
            language.push(dt[j])
            this.setState({
              language:[dt[j]]
            })
          }
        }
        // alert(JSON.stringify(this.state.language))
  
        
      }
      
    )
  }
  
  handleForm = (event) => {
    const { name } = event.target;
    this.setState({
      mode: name || null,
      ...(!name && {selectedData: null})
    }, () => {
      this.setState(prevState => ({
        showForm: !prevState.showForm
      }))
    })
  }

  submitForm = (data, mode) => {
    if(mode === 'create') {
      this.setState(prev => ({
        data: [
          data,
          ...prev.data
        ],
        selectedData: null
      }))
    }
    else if(mode === 'edit') {
      let newData = [...this.state.data];
      let editedDataId = newData.findIndex(dt => dt.key === data.key);
      newData[editedDataId] = data;
      this.setState({
        data: newData,
        selectedData: null
      })
    }

    this.setState({
      showForm: false
    })
  }

  selectData = (data) => {
    this.setState({
      selectedData: data
    })
  }

  deleteData = (e) => {
    e.preventDefault();
    const { data, selectedData } = this.state;
    if(window.confirm('Are you sure to delete this data?')) {
      this.setState({
        data: [...data.filter(dt => dt.key !== selectedData.key)],
        selectedData: null,
        showForm: false,
        mode: null,
      })
    }
  }

  render() {
    const { data, showForm, selectedData, mode } = this.state;
    return (
     
this.state.language.map((lang)=>{
  return(


      
      <Container fluid className="p-4" style={{ backgroundColor: '#F2F2F2' }}>
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex flex-row align-items-center">
                <h2>{lang.ComponentList}</h2>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button
                  variant="info"
                  size="sm"
                  name="create"
                  onClick={this.handleForm}
                >
                  {lang.Create}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="ml-1"
                  name="edit"
                  disabled={!selectedData}
                  onClick={this.handleForm}
                >
                  {lang.Edit}
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  className="ml-1"
                  name="view"
                  disabled={!selectedData}
                  onClick={this.handleForm}
                >
                  {lang.View}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-1"
                  name="delete"
                  disabled={!selectedData}
                  onClick={this.handleForm}
                >
                  {lang.Delete}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <Table
                  data={data}
                  selectData={this.selectData}
                  selectedData={selectedData}
                /> */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Form
          show={showForm}
          handleForm={this.handleForm}
          submitForm={this.submitForm}
          mode={mode}
          selectedData={selectedData}
          deleteData={this.deleteData}
        />
      </Container>
    
    )
  })
    );
  }
}

export default App;