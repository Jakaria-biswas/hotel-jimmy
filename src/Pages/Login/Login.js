import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../Firebase/Firebase.config';
import Swal from 'sweetalert2'
const auth = getAuth(app)
const Login = () => {


    const { loginToAccount } = useContext(AuthContext)
    let navigate = useNavigate();
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"



    const handleLogin = event => {

        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginToAccount(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.code)
                if (error.code === 'auth/user-not-found') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email...',
                        text: 'user-not-found',
                    })
                }
                if (error.code === 'auth/wrong-password') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Password...',
                        text: 'wrong-password.',
                    })

                }
            })
    }


    // modal working area



    const [forgetEmail, setForgetEmail] = useState('')

    const handleForgetPassword = () => {
        console.log(forgetEmail)

        if (!forgetEmail) {
            alert("Please enter your email.")
            return;
        }
        sendPasswordResetEmail(auth, forgetEmail)
            .then(() => {
                // Password reset email sent!
                alert("Check your email.")
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // ..
            })
    }

    return (
        <Container>

            <div className='p-3'>

                <h2>Please login your account.!</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setForgetEmail(e.target.value)} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" />
                        <Form.Text className="text-muted">
                            <Link onClick={handleForgetPassword}> Forget password.?</Link>
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <p className='my-4 '>New to website? <Link to="/register">please register</Link></p>

            </div>
        </Container>
    );
};

export default Login;