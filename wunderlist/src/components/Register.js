import React, {useState} from 'react';
import axios from 'axios';
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Register(props) {
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', password: ''});

    const handleChanges = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const submitForm = e => {
        e.preventDefault();
        axios.post('/users/register', user)
            .then(response => {
                props.history.push('/login')
            })
            .catch(error => {
                console.log(error)
                setUser({first_name: '', last_name: '', email: '', password: ''})
            })
    };

    return (
        <div>
            <Form onSubmit={submitForm} style={{margin: "5% 25%"}}>
            <h2>Register</h2>
            <Row form>
                <Col md={3}>
                <FormGroup>
                    <Input type="text" name="first_name" id="first_name" placeholder="First Name"  value={user.first_name} onChange={handleChanges} />
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Input type="text" name="last_name" id="last_name" placeholder="Last Name" value={user.last_name} onChange={handleChanges} />
                </FormGroup>
                </Col>
            </Row>
            <FormGroup row>
                <Col sm={8}>
                <Input type="email" name="email" id="email" placeholder="Email Address" value={user.email} onChange={handleChanges} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={8}>
                <Input type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChanges} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                <Button type="submit">Submit</Button>
                </Col>
            </FormGroup>
            </Form>
        </div>
    )
}

export default Register