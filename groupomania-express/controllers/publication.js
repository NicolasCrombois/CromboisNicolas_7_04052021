const xss = require('xss');
const { v4 : uuidv4 } = require('uuid');

const Publication = require('../models/Publication');
const Comment = require('../models/Comment');
const User = require('../models/User');

Publication.hasMany(Comment, {as: "Comments", foreignKey:"publicationId"});
Comment.belongsTo(Publication, {as: "Publications", foreignKey:"publicationId"});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const errHandler = (err) => {
    console.log("Erreur:", err);
}


exports.publish = (req, res, next) => {
    Publication.create({ 
        id: uuidv4(),
        content: xss(req.body.content), 
        userId: req.body.userId,
    })
    .then(() => res.status(201).json({ message : "Message Posted" }))
    .catch(error => res.status(500).json({ message : error }))
};




exports.publications = (req, res, next) => {
    Publication.findAll({ include: [ { model: Comment, as :"Comments" } ], order: [[ 'updatedAt', 'DESC' ],[ "Comments", 'updatedAt', 'ASC']]})
    .then(publications => { 
        res.status(200).json(publications);
    })
    .catch(error => {
        res.status(500).json({ message: error });
        });
};


exports.delete = (req, res, next) => {
    Publication.findOne({
        where : { id: req.params.id }
    })
    .then(publication => {
        publication.destroy()
    })
    .then(() => {
        Comment.destroy({
            where : { publicationId : req.params.id }
        })
    })
    .then(() => res.status(201).json({ message : " Publication supprimée !" }))
    .catch(error => {
        res.status(500).json({ message: error });
    });
}