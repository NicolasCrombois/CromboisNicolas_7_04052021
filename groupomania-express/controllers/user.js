const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const xss = require('xss');
const { v4 : uuidv4 } = require('uuid');

const User = require('../models/User');
const Publication = require('../models/Publication');
const Comment = require('../models/Comment');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const errHandler = (err) => {
    console.log("Erreur:", err);
}


exports.signup = (req, res, next) => {
    User.findOne({ where: {mail: req.body.email}})
    .then(user => {
        if (user != null){
            return res.status(400).json({ 
                message : "Email already use" 
            })
        }else{
            bcrypt.hash(xss(req.body.password),10)
            .then(hash => {
                console.log(xss(req.body.email),  hash, xss(req.body.name), xss(req.body.firstname))
                User.create({ 
                    id: uuidv4(),
                    mail: xss(req.body.email), 
                    password: hash,
                    name: xss(req.body.name), 
                    firstname: xss(req.body.firstname),
                })
                .then(() => res.status(200).json({ message : "User created" }))
                .catch(errHandler);
            })
            .catch(error => res.status(400).json({ message : error }));
        }
    })
    .catch(error => res.status(500).json({ message : error }))
};




exports.login = (req, res, next) => {
    User.findOne({ where: {mail: req.body.email}})
    .then(user => {
        if(!user){
            res.status(401).json({ message: "Les identifiants saisies ne sont pas corrects" });
            next();
        }
        else{
            bcrypt.compare(xss(req.body.password), user.password)
            .then( validation => {
                if(!validation){
                    res.status(401).json({ message: "Les identifiants saisies ne sont pas corrects" });
                    next();
                }else{
                    res.status(200).json({
                        userId: user.id,
                        token: jsonwebtoken.sign(
                            { userId : user.id },
                            't0Ken_Generator-K3y_',
                            { expiresIn: '24h' }
                        ),
                        userStatus: user.status,
                        userName: user.name,
                        userFirstname: user.firstname,
                    });
                }
            })
            .catch(error => res.status(500).json({ message: error }));
        }
    })
    .catch(error => res.status(500).json({ message: error }));
};


exports.profile = (req, res, next) => {
    User.findOne({ where: {id: req.params.id}})
    .then(user => {
        userInfo = {
            name: user.name,
            firstname: user.firstname,
            status: user.status,
        }
        res.status(200).json( userInfo );
    })
    .catch(error => res.status(500).json({ message: error }));
};


exports.delete = (req, res, next) => {
    User.findOne({
        where : { id: req.params.id }
    })
    .then(user => {
        user.destroy()
    })
    .then(() => {
        Publication.findAll({
            where : { userId : req.params.id }
        })
        .then(publications =>{
             publications.forEach(publication => {
                Comment.destroy({
                    where : { publicationId : publication.id }
                })
                publication.destroy();
            });
            res.status(200).json("Publication supprimée !");
        })
        .catch(error => {
            res.status(401).json({ message: error });
        })
    })
    .catch(error => {
        res.status(500).json({ message: error });
    });
}