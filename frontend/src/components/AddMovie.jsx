import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {Link, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import axios from "axios"
import Swal from "sweetalert2";
import FooterBasic from "./Footer";


const Create = () => {
    const [allCategories, setAllCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [directorName, setDirectorName] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState("");
    const [file,setFile] = useState("");

    const navigate = useNavigate();

    const setTittleName = (e)=>{
        setTitle(e.target.value);
    }

    const setDirector = (e) => {
        setDirectorName(e.target.value);
    }

    const setCategoryId = (e) => {
        setCategory(e.target.value);
    }

    const setYearData = (e) => {
        setYear(e.target.value);
    }

    const setimgfile = (e)=>{
        setFile(e.target.files[0])
    }

    const fileError = () => {
        Swal.fire({
            title: "Error",
            text: "Tienes que subir una imagen",
            icon: "error",
            confirmButtonColor: "rgb(13, 110, 253)",
        });
    };

    const inputError = () => {
        Swal.fire({
            title: "Error",
            text: "Tienes que completar todos los campos",
            icon: "error",
            confirmButtonColor: "rgb(13, 110, 253)",
        });
    };

    const addMovie = async () => {
        if(!file){
            fileError()
            return
        }
        if(!title || !directorName || !year || !category){
            inputError()
            return
        }

        const formdata = new FormData()
        formdata.append('image', file)
        formdata.append('movieTitle', title)
        formdata.append('director', directorName)
        formdata.append('movieYear', year)
        formdata.append('category', category)

        await fetch('http://localhost:9000/addMovie', {
            method: 'POST',
            body: formdata,
        })
            .then((res) => {
                if((res.status === 201)){
                    navigate('/')
                }else{
                    navigate('/error')
                }})

        setFile(null)
    }


    const getCategories = async () => {
        axios.get("http://localhost:9000/getCategories").then((response) => {
            setAllCategories(response.data);
        });
    };

    return(
        <div className="createPage">
            <NavBar/>
            <section className="position-relative py-4 py-xl-5">
                <Container className="position-relative">
                    <Row className="d-flex justify-content-center">
                        <Col className="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style={{width: "50%"}}>
                            <Card className="mb-5">
                                <div className="card-body p-sm-5">
                                    <h2 className="text-center mb-4" style={{fontSize: "24px"}}>Agregar película</h2>
                                    <form method="post">
                                        <div className="mb-3">
                                            <input className="form-control" type="text"
                                                   placeholder="Titulo" id="titulo"
                                                   onChange={setTittleName}/>
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-control" type="text"
                                                   placeholder="Nombre del director"
                                                   onChange={setDirector}/>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select"
                                                    onChange={setCategoryId} onClick={getCategories}>
                                                <option value="hide" style={{display: "none"}}>Género</option>
                                                {allCategories.map((val) => {
                                                    const {nom_genero: nom_genero1, id_genero: id_genero1} = val;
                                                    return(
                                                        <option value={id_genero1}>{nom_genero1}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" id="yearMovie"
                                                    onChange={setYearData}>
                                                <option value="hide" style={{display: "none"}}>Año de la película</option>
                                                <option value="1960">1960</option>
                                                <option value="1961">1961</option>
                                                <option value="1962">1962</option>
                                                <option value="1963">1963</option>
                                                <option value="1964">1964</option>
                                                <option value="1965">1965</option>
                                                <option value="1966">1966</option>
                                                <option value="1967">1967</option>
                                                <option value="1968">1968</option>
                                                <option value="1969">1969</option>
                                                <option value="1970">1970</option>
                                                <option value="1971">1971</option>
                                                <option value="1972">1972</option>
                                                <option value="1973">1973</option>
                                                <option value="1974">1974</option>
                                                <option value="1975">1975</option>
                                                <option value="1976">1976</option>
                                                <option value="1977">1977</option>
                                                <option value="1978">1978</option>
                                                <option value="1979">1979</option>
                                                <option value="1980">1980</option>
                                                <option value="1981">1981</option>
                                                <option value="1982">1982</option>
                                                <option value="1983">1983</option>
                                                <option value="1984">1984</option>
                                                <option value="1985">1985</option>
                                                <option value="1986">1986</option>
                                                <option value="1987">1987</option>
                                                <option value="1988">1988</option>
                                                <option value="1989">1989</option>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1992">1992</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                                <option value="2002">2002</option>
                                                <option value="2003">2003</option>
                                                <option value="2004">2004</option>
                                                <option value="2005">2005</option>
                                                <option value="2006">2006</option>
                                                <option value="2007">2007</option>
                                                <option value="2008">2008</option>
                                                <option value="2009">2009</option>
                                                <option value="2010">2010</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Imagen de la
                                                película</label>
                                            <input id="fileinput" onChange={setimgfile}
                                                   className="form-control" type="file"/>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark d-block w-100"
                                                    type="button" onClick={addMovie}>Agregar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container style={{marginBottom: "11rem"}}>
                <Link to="/">
                    <button className="btn btn-primary" type="button">Volver al incio</button>
                </Link>
            </Container>
            <FooterBasic></FooterBasic>
        </div>
    )
}

export default Create;
