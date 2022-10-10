const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("Solo imagenes son aceptadas"))
    }
}

const fileUpload = multer({
    storage: diskstorage,
    fileFilter: isImage
}).single('image')

const fileUpdate = multer({
    storage: diskstorage,
    fileFilter: isImage
}).single('newImg')


// create
router.post("/addMovie", fileUpload, urlencodedParser, (req,res)=>{
    const title = req.body.movieTitle;
    const director = req.body.director;
    const category = parseInt(req.body.category);
    const movieYear = parseInt(req.body.movieYear);
    const name = "http://localhost:9000/" + req.file.originalname

    try {
        conn.query('INSERT INTO peliculas (nom_pelicula, nom_director, year_movie, id_genero, img_pelicula) VALUES (?,?,?,?,?)',
            [title, director, movieYear, category, name],
            (err,result)=>{
                if(err){
                    console.log("error")
                    console.log(err)
                }else{
                    console.log("Se añadio la pelicula")
                    res.status(201).json({status:201,data:result})
                }
            })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

// get user data
router.get("/readAll", (req, res) => {

    conn.query("SELECT id_pelicula, nom_pelicula, year_movie, img_pelicula, nom_director, g.nom_genero FROM db_crud.peliculas as p inner join generos as g on p.id_genero = g.id_genero",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

router.get("/readOneMovie/:id", (req, res) => {
    const id = req.params.id;
    conn.query("SELECT id_pelicula, nom_pelicula, year_movie, img_pelicula, nom_director, g.nom_genero, g.id_genero FROM db_crud.peliculas as p inner join generos as g on p.id_genero = g.id_genero where id_pelicula = ?"
    ,[id],(err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

router.post("/update/:id", fileUpdate, urlencodedParser, (req, res) => {
    console.log("entro en update")
    const title = req.body.newTitle;
    const director = req.body.newDiector;
    const category = parseInt(req.body.newCategory);
    const movieYear = parseInt(req.body.newYear);
    const name = "http://localhost:9000/" + req.file.originalname
    const id = req.params.id;

    try {
        conn.query(
            "UPDATE peliculas SET nom_pelicula = ?, year_movie = ?, img_pelicula = ?, nom_director = ?, id_genero = ? WHERE id_pelicula = ?",
            [title, movieYear, name, director, category, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(201).json({status:201,data:result})
                    console.log("Se edito la pelicula")
                }
            }
        );
    }catch (error){
        res.status(422).json({status:422,error})
    }
});

// delete user
router.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;
    try {
        conn.query(`DELETE FROM peliculas WHERE id_pelicula = ?`, [id],
            (err,result)=>{
            if(err){
                console.log(err)
                console.log("error")
            }else{
                console.log("Pelicula eliminada")
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
})


router.get("/getCategories", (req, res) => {
    conn.query("SELECT * FROM generos",
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})


module.exports = router;