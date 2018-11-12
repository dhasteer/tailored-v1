const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const find = require('../find');
const cors = require('./cors');

const Shirts = require('../models/shirts');
const User = require('../models/user');

const shirtRouter = express.Router();

shirtRouter.use(bodyParser.json());

shirtRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Shirts.find({})
    //.populate('comments.author')
    .then((shirts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shirts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Shirts.create(req.body)
    .then((shirt) => {
        console.log('Shirt Created ', shirt);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shirt);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shirts');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Shirts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

shirtRouter.route('/:shirtId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Shirts.findById(req.params.shirtId)
    //.populate('comments.author')
    .then((shirt) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shirt);
        console.log(shirt);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /shirts/'+ req.params.shirtId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Shirts.findByIdAndUpdate(req.params.shirtId, {
        $set: req.body
    }, { new: true })
    .then((shirt) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shirt);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Shirts.findByIdAndRemove(req.params.shirtId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

/*

shirtRouter.route('/:userId')
.get(authenticate.verifyUser, (req,res,next) => {
    if (String(req.user._id) == String(req.params.userId)){
        find.displayClothes
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        var err = new Error ('You are not authorized to see these clothes!');
        err.status = 403;
        return next(err);
    }
});

*/

shirtRouter.route('/:userId/:price')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Shirts.find({})
    .then((shirts) => {
        find.displayClothes(req.params.userId, shirts, next, res, req.params.price);
    }, (err) => next(err))
    .catch((err) => next(err));
});

shirtRouter.route('/email/:userId/:shirtId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, (req, res, next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        find.emailClick(shirt.store, shirt.name, req.params.userId, shirt.email);
    }, (err) => next(err))
    .catch((err) => next(err));
});

/* //verifies user
shirtRouter.route('/:userId/:price')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Shirts.find({})
    .then((shirts) => {
        if (String(req.user._id) == String(req.params.userId)) {
            find.displayClothes(req.params.userId, shirts, next, req.params.price, res);
        }
        else {
            var err = new Error ('You are not authorized to perform this function!');
            err.status = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
*/

shirtRouter.route('/:userId/:shirtId/:pref')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.put(cors.corsWithOptions, (req,res,next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        var shirtarray = shirt.vector;
        if (shirt != null) {
            find.vectorUpdate(req.params.userId, shirtarray, next, req.params.pref, res);
        }
        else if (shirt == null) {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


/*
shirtRouter.route('/:shirtId/comments')
.get((req,res,next) => {
    Shirts.findById(req.params.shirtId)
    .populate('comments.author')
    .then((shirt) => {
        if (shirt != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(shirt.comments);
        }
        else {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        if (shirt != null) {
            req.body.author = req.user._id;
            shirt.comments.push(req.body);
            shirt.save()
            .then((shirt) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shirt);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shirts/'
        + req.params.shirtId + '/comments');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        if (shirt != null) {
            for (var i = (shirt.comments.length -1); i >= 0; i--) {
                shirt.comments.id(shirt.comments[i]._id).remove();
            }
            shirt.save()
            .then((shirt) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shirt);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

shirtRouter.route('/:shirtId/comments/:commentId')
.get((req,res,next) => {
    Shirts.findById(req.params.shirtId)
    .populate('comments.author')
    .then((shirt) => {
        if (shirt != null && shirt.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(shirt.comments.id(req.params.commentId));
        }
        else if (shirt == null) {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /shirts/'+ req.params.shirtId
        + '/comments/' + req.params.commentId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        if (shirt != null && shirt.comments.id(req.params.commentId) != null &&
            String(req.user._id) == String(shirt.comments.id(req.params.commentId).author._id)) {
            if (req.body.rating) {
                shirt.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                shirt.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            shirt.save()
            .then((shirt) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shirt);                
            }, (err) => next(err));
        }
        else if (shirt == null) {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
        else if (shirt.comments.id(req.params.commentId) == null) {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
        else {
            var err = new Error ('You are not authorized to update this comment!');
            err.status = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Shirts.findById(req.params.shirtId)
    .then((shirt) => {
        if (shirt != null && shirt.comments.id(req.params.commentId) != null &&
            String(req.user._id) == String(shirt.comments.id(req.params.commentId).author._id)) {
            shirt.comments.id(req.params.commentId).remove();
            shirt.save()
            .then((shirt) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shirt);                
            }, (err) => next(err));
        }
        else if (shirt == null) {
            err = new Error('Shirt ' + req.params.shirtId + ' not found');
            err.status = 404;
            return next(err);
        }
        else if (shirt.comments.id(req.params.commentId) == null) {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
        else {
            var err = new Error ('You are not authorized to delete this comment!');
            err.status = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
*/

module.exports = shirtRouter;