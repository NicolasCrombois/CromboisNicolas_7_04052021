const xss = require('xss');
const { v4 : uuidv4 } = require('uuid');

const Comment = require('../models/Comment');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}



exports.publish = (req, res, next) => {
    console.log(req.body)
    Comment.create({ 
        id: uuidv4(),
        publicationId: xss(req.body.publicationId),
        content: xss(req.body.content), 
        userId: xss(req.body.userId)
    })
    .then(() => res.status(200).json({ message : "Comment Posted" }))
    .catch(error => res.status(500).json({ message : error }))
};
