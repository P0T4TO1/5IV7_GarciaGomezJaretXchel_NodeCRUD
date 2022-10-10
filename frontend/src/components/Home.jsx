import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import axios from "axios";
import React, {useEffect, useState} from "react";
import FooterBasic from "./Footer";

function Home(){
    const [moviesList, setMovieList] = useState([])
    useEffect(()=>{
        getMovies()
    },[]);

    const getMovies = () => {
        axios.get("http://localhost:9000/readAll").then((response) => {
            setMovieList(response.data);
        });
    };

    return(
        <div className="HomePage">
            <NavBar/>
            <Container className="py-4 py-xl-5">
                <Link to="/create">
                    <button className="btn btn-primary" type="button">Agregar una pelicula</button>
                </Link>
            </Container>
            <Container className="py-4 py-xl-5">
                <Row className="mb-5">
                    <Col className="col-md-8 col-xl-6 text-center mx-auto">
                        <h2>Lista de peliculas</h2>
                    </Col>
                </Row>
                <Row className="gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {moviesList.map(({ id_pelicula, img_pelicula, nom_director, nom_genero, nom_pelicula, year_movie}) => {
                        return(
                            <Col>
                                <Card>
                                    <img className="card-img-top w-100 d-block fit-cover" style={{height: "240px"}}
                                         src={img_pelicula} alt="imagePelicula"/>
                                    <Card.Body className="p-4">
                                        <p className="text-primary card-text mb-0">Genero: {nom_genero}</p>
                                        <h4 className="card-title">{nom_pelicula}</h4>
                                        <p className="card-text">{year_movie}</p>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <p className="fw-bold mb-0">Director: </p>
                                                <p className="mb-0">{nom_director}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex" style={{marginTop: "1rem"}}>
                                            <Link to={`/update/${id_pelicula}`}>
                                                <button className="btn btn-dark" type="button">
                                                    <i className="fa fa-edit"></i>
                                                    <span>Editar</span>
                                                </button>
                                            </Link>
                                            <Link to={`/delete/${id_pelicula}`}>
                                                <button className="btn btn-danger" style={{marginLeft: "1rem"}}>
                                                    <i className="fa fa-trash"></i>
                                                    <span>Eliminar</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})
                    }
                </Row>
            </Container>
            <FooterBasic/>
        </div>
    )
}

export default Home;