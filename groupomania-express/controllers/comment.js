const xss = require('xss');
const { v4 : uuidv4 } = require('uuid');

const Comment = require('../models/Comment');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//Fonction qui permet de publier le commentaire
exports.publish = (req, res, next) => {
    Comment.create({ 
        id: uuidv4(),
        publicationId: xss(req.body.publicationId),
        content: xss(req.body.content), 
        userId: xss(req.body.userId)
    })
    .then(() => res.status(201).json({ message : "Comment Posted" }))
    .catch(error => res.status(500).json({ message : error }))
};

//Fonction qui permet supprimer un commentaire
exports.delete = (req, res, next) => {
    Comment.findOne({
        where : { id: req.params.id }
    })
    .then(comment => {
        comment.destroy()
        .then(() => res.status(201).json({ message : "Commentaire supprimé !" }))
    })
    .catch(error => {
        res.status(500).json({ message: error });
    });
}