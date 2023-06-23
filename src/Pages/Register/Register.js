import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { getAuth, updateProfile } from 'firebase/auth';
import app from '../../Firebase/Firebase.config';
import Swal from 'sweetalert2'
const auth = getAuth(app)
const Register = () => {

    const [passwordError, setPasswordError] = useState('');

    const {createAccount} = useContext(AuthContext);


    let navigate = useNavigate()

    const handleRegister = event => {
          event.preventDefault();
          const form = event.target;
          const name = form.name.value;
          const email = form.email.value;
          const password = form.password.value;

           if(password.length < 8){
            //    setPasswordError("Password should be 8 charterer");
            Swal.fire({
                icon: 'error',
                title: 'Password...',
                text: 'Password should be 8 charterer.',
              })

    

               return;
           }
           setPasswordError('');

           createAccount(email, password)
           .then(result => {
                const user = result.user;
                updateUserName(name)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Account create successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate("/")
                form.reset()
               
           })
           .catch(error => {
                //  console.log(error.code)
                
                 if(error.code === 'auth/email-already-in-use'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Email...',
                        text: 'email-already-in-use.',
                      })
                      return;
                 }
           })

    }


    const updateUserName = name => {
           updateProfile(auth.currentUser,{
                displayName:name
           })
    }

    return (
        <Container>
            <div className='p-3'>
                <h2>Please create account.!</h2>
                <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control name="name" type="name" placeholder="Enter name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
                  <p>{passwordError}</p>
                <p className='my-4'>Already have an account? <Link to="/login"><small>Login</small></Link></p>
            </div>
        </Container>
    );
};

export default Register;