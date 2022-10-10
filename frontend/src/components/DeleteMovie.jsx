import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import {Link, useNavigate, useParams} from "react-router-dom";
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import NavBar from "./NavBar";
import FooterBasic from "./Footer";
import React from "react";
import axios from "axios";


function Delete(){
    const navigate = useNavigate()
    const id_peliculaUpdate = useParams()
    const id_pel = id_peliculaUpdate.id

    const deleteMovie = (id) => {
        axios.delete(`http://localhost:9000/delete/${id}`).then((response) => {
            if((response.status === 201)){
                navigate("/")
            }else{
                navigate('/error')
            }
        })
    };

    return(
        <div className="deletePage">
            <NavBar/>
            <section className="py-4 py-xl-5">
                <Container className="h-100">
                    <Row className="h-100">
                        <Col className="col-md-10 col-xl-8 text-center d-flex
                        d-sm-flex d-md-flex justify-content-center align-items-center
                        mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                            <div>
                                <i className="fa fa-trash-o text-warning" style={{fontSize: "60px"}}></i>
                                <h2 className="text-uppercase fw-bold mb-3">Seguro que desea eliminar la película</h2>
                                <p className="mb-4">Una vez eliminada la película no se mostrara más y tendrá que
                                    regístrala de nuevo</p>

                                <button className="btn btn-danger fs-5" type="button"
                                        onClick={() => {
                                            deleteMovie(id_pel)
                                        }}
                                        >Eliminar película</button>
                                <br/>
                                <Link to="/">
                                    <button className="btn btn-dark" type="button"
                                            style={{marginTop: "5rem"}}
                                    >No eliminar y regresar al inicio</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="fixed-bottom">
                <FooterBasic/>
            </div>
        </div>
    )
}

export default Delete;