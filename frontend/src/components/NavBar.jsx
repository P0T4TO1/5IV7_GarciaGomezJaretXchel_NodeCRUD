import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavBar(){
    return(
        <Navbar className="navbar navbar-dark navbar-expand-md bg-dark py-3">
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                        <i className="fa fa-film"></i>
                    </span>
                    <span>Movies app</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavBar;