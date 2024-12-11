const Client = require('../models/clientModel');

exports.getAllClients = (req, res) => {
  Client.getAll((err, clients) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(clients);
    }
  });
};

exports.getClientById = (req, res) => {
  const id = req.params.id;
  Client.getById(id, (err, client) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!client) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json(client);
    }
  });
};

exports.createClient = (req, res) => {
  const newClient = req.body;
  Client.create(newClient, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.id });
    }
  });
};

exports.updateClient = (req, res) => {
  const id = req.params.id;
  const updatedClient = req.body;
  Client.update(id, updatedClient, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json({ message: 'Client updated successfully' });
    }
  });
};

exports.deleteClient = (req, res) => {
  const id = req.params.id;
  Client.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json({ message: 'Client deleted successfully' });
    }
  });
};
