const db = require("../models");
const Product = db.products;

// Create and Save a new Product
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Name required!" });
        return;
    }

    // Create a new Product
    const product= new Product({
        name: req.body.name,
        price: req.body.price,
        available: req.body.available
    });

    // Save Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });

};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(title), $options: "i" } } : {};

    Product.find(condition)
        .select('-_id -__v')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};



// Find a single product with a specified id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .select('-_id -__v')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Product with the specified id does not exist "});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id=" + id });
        });
};

// Update a Product by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. The Product may not exist!`
                });
            } else res.send({ message: "The product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });

};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

   Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete product with id=${id}. The product may not exist!`
                });
            } else {
                res.send({
                    message: "The product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete product with id=" + id
            });
        });

};
