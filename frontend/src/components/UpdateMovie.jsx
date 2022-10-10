import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {Link, useNavigate, useParams} from "react-router-dom";
import NavBar from "./NavBar";
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import axios from "axios";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import FooterBasic from "./Footer";

function Update(){
    const [allCategories, setAllCategories] = useState([]);
    useEffect(()=>{
        getNowMovie()
    });

    const [newTittle, setNewTittle] = useState("");
    const [newYearMovie, setNewYearMovie] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newDirectorName, setNewDirectorName] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [nowMovie, setNowMovie] = useState([]);

    const navigate = useNavigate();

    const setNewTittleName = (e)=>{
        setNewTittle(e.target.value);
    }

    const setNewDirector = (e) => {
        setNewDirectorName(e.target.value);
    }

    const setNewCategoryId = (e) => {
        setNewCategory(e.target.value);
    }

    const setNewYearData = (e) => {
        setNewYearMovie(e.target.value);
    }

    const setNewImgFile = (e)=> {
        setNewImg(e.target.files[0])
    }

    const id_peliculaUpdate = useParams()
    const id_pel = id_peliculaUpdate.id

    const getNowMovie = (id) => {
        id = id_pel;
        axios.get(`http://localhost:9000/readOneMovie/${id}`)
        .then((res) => {
            setNowMovie(res.data);
        });
    };

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

    const updateMovie = async (id) => {
        if(!newImg){
            fileError()
            return
        }
        console.log(newTittle);
        if(!newTittle || !newDirectorName || !newYearMovie || !newCategory){
            inputError()
            return
        }

        const formdata = new FormData()
        formdata.append('newImg', newImg);
        formdata.append('newTitle', newTittle);
        formdata.append('newDiector', newDirectorName);
        formdata.append('newYear', newYearMovie);
        formdata.append('newCategory', newCategory);

        await fetch(`http://localhost:9000/update/${id}`,
            {
                method: 'POST',
                body: formdata,
            })
            .then((res) => {
                if((res.status === 201)){
                    navigate('/')
                }else{
                    navigate('/error')
                }}
        );
    };

    const getCategories = async () => {
        axios.get("http://localhost:9000/getCategories").then((response) => {
            setAllCategories(response.data);
        });
    };

    return(
        <div className="updatePage">
            <NavBar/>
            <section className="position-relative py-4 py-xl-5">
                <Container className="position-relative">
                    <Row className="d-flex justify-content-center">
                        <Col className="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style={{width: "50%"}}>
                            <p>Se esta editando esta pagina</p>
                            <Card className="mb-5">
                                <Card.Body className="p-sm-5">
                                    <p style={{textAlign: "justify"}}>Nota: Para actualizar tienes que editar todos los campos. Si no desea editar ninguno
                                    y solo quiere cambiar la imagen debera de editar todos de los datos y luego dejarlos de nuevo como estaban</p>
                                    <h2 className="text-center mb-4" style={{fontSize: "24px"}}>Editar película</h2>
                                    {nowMovie.map(({ id_pelicula, id_genero, img_pelicula, nom_director, nom_genero, nom_pelicula, year_movie}) => {
                                        return(
                                             <form method="post">
                                                 <div className="mb-3">
                                                     <input className="form-control" type="text" defaultValue={nom_pelicula}
                                                            placeholder="Titulo" onChange={setNewTittleName} id="movieName"/>
                                                 </div>
                                                 <div className="mb-3">
                                                     <input className="form-control" type="text" defaultValue={nom_director}
                                                            placeholder="Nombre del director" id="newDirectorName"
                                                            onChange={setNewDirector}/>
                                                 </div>
                                                 <div className="mb-3">
                                                     <select className="form-select" defaultValue={id_genero} id="movieCategory"
                                                             onChange={setNewCategoryId} onClick={getCategories}>
                                                         <option value={id_genero}>{nom_genero}</option>
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
                                                             onChange={setNewYearData} defaultValue={year_movie}>
                                                         <option value={year_movie}>{year_movie}</option>
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
                                                         película actual</label>
                                                     <img className="card-img-top w-100 d-block fit-cover" style={{height: "280px"}}
                                                          src={img_pelicula} alt="imageMovie" id="newImgMovie"/>
                                                     <br/>
                                                     <input id="fileinput" onChange={setNewImgFile}
                                                            className="form-control" type="file"/>
                                                 </div>
                                                 <div>
                                                     <button className="btn btn-dark d-block w-100"
                                                             type="button" onClick={() => {
                                                         updateMovie(id_pelicula)
                                                     }}>Guardar
                                                     </button>
                                                 </div>
                                             </form>
                                         )})
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container style={{marginBottom: "5rem"}}>
                <Link to="/">
                    <button className="btn btn-primary" type="button">Volver al incio</button>
                </Link>
                <br/>
            </Container>
            <FooterBasic/>
        </div>
    )
}

export default Update;