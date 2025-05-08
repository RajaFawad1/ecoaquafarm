const { Client } = require("../models");

exports.getClients = async (req, res) => {
    const clients = await Client.findAll();
    res.json(clients);
};

exports.createClient = async (req, res) => {
    const client = await Client.create(req.body);
    res.json(client);
};
