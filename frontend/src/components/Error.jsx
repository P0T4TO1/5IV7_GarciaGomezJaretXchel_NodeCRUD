import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import NavBar from "./NavBar";

function Error(){
    return(
        <div className="errorPage">
            <NavBar/>
            <section className="py-4 py-xl-5">
                <Container className="h-100">
                    <Row className="h-100">
                        <Col
                            className="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                            <div>
                                <i className="fa fa-warning text-danger" style={{fontSize: "60px"}}></i>
                                <h2 className="text-uppercase fw-bold mb-3">Algo salio mal</h2>
                                <p className="mb-4">Descanse en paz la pagina se murio.</p>
                                <Link to="/">
                                    <button className="btn btn-dark fs-5" type="button">Regresar al inicio</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Error;