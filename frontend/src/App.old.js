import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const defaultAccessor = [{ id: 1, group: "adroit" }, { id: 2, group: "admin" }];

export default function App() {
  const [accessor, setAccessor] = useState([]);
  const [inputs, setInputs] = useState([0]);

  useEffect(() => {
    setAccessor([...defaultAccessor]);
  }, []);

  const addInput = () => {
    setInputs(prev => [...prev, 0]);
  };

  const deleteInput = pIndex => {
    setInputs(prev => [...prev.filter((input, index) => index !== pIndex)]);
    const prevSelectedAccessorId = inputs[pIndex];
    let newAccessors = [...accessor];
    if(prevSelectedAccessorId) {
      let prevSelectedAccessor = newAccessors.find(ac => ac.id === Number(prevSelectedAccessorId));
      prevSelectedAccessor.selected = false;
    }
    setAccessor(newAccessors);
  };

  const handleChange = (event, pIndex) => {
    const { name, value } = event.target;
    let newInputs = [...inputs];
    const prevSelectedAccessorId = newInputs[pIndex];
    newInputs[pIndex] = value;
    setInputs(newInputs);
    let newAccessors = [...accessor];
    let newSelectedAccessor = newAccessors.find(ac => ac.id === Number(value));
    newSelectedAccessor.selected = true;
    if(prevSelectedAccessorId) {
      let prevSelectedAccessor = newAccessors.find(ac => ac.id === Number(prevSelectedAccessorId));
      prevSelectedAccessor.selected = false;
    }
    setAccessor(newAccessors);
  };

  return (
    <Container fluid>
      <Row className="mb-3 align-items-center">
        <Col xs="12">
          <h2>Component Permsision</h2>
        </Col>
        <Col xs="12">
          <Button size="sm" onClick={addInput}>
            Add accessor
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            {inputs.map((input, index) => (
              <Form.Group key={index}>
                <Form.Label>Accessor</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      as="select"
                      value={input}
                      onChange={event => handleChange(event, index)}
                    >
                      <option>Choose...</option>
                      {accessor.map(ac => (
                          <option disabled={ac.selected}hidden={ac.selected} key={ac.id} value={ac.id}>
                            {ac.group}
                          </option>
                        ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={() => deleteInput(index)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}