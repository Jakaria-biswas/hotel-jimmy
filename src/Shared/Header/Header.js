import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BrandImage from '../../Images/brand-image1.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import Swal from 'sweetalert2'
const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    let navigate= useNavigate();





    

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Log out your account',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate("/login")
            })
            .catch(() => { })
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand ><Link to="/"><img style={{ width: "250px" }} src={BrandImage} alt="" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link>Room</Nav.Link>



                    </Nav>
                    <Nav>
                        {user?.email && <Nav.Link >{user.displayName}</Nav.Link>}
                        {
                            user?.email ? <Nav.Link ><button onClick={handleLogOut}>Log Out</button></Nav.Link> : <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                        }


                    </Nav>
                    {/* <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;