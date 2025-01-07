const Client = require('../models/clientModel');

// Connexion d'un utilisateur
const loginAccount = (req, res) => {
    const { email, password } = req.body;
    console.log('[LOGIN] Tentative de connexion avec l\'email :', email);

    if (!email || !password) {
        console.log('[LOGIN][ERREUR] Champs requis manquants : email ou mot de passe non fourni.');
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    Client.getAll((err, clients) => {
        if (err) {
            console.error('[LOGIN][ERREUR] Erreur serveur lors de la récupération des clients :', err);
            return res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
        }

        console.log('[LOGIN] Liste des clients récupérée avec succès.');

        const user = clients.find(client => client.email === email);
        if (!user) {
            console.warn('[LOGIN][ERREUR] Aucun utilisateur trouvé avec cet email :', email);
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        console.log('[LOGIN] Utilisateur trouvé, vérification du mot de passe en cours.');

        if (user.password !== password) {
            console.warn('[LOGIN][ERREUR] Mot de passe incorrect pour l\'email :', email);
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        console.log('[LOGIN] Connexion réussie pour l\'utilisateur ID:', user.idClient);
        res.json({
            message: 'Connexion réussie',
            id: user.idClient,
            first_name: user.firstName,
            last_name: user.lastName
        });
    });
};

// Inscription d'un nouvel utilisateur
const registerAccount = (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, extraNapkins, frequentRefill } = req.body;
    console.log('[REGISTER] Tentative de création de compte pour l\'email :', email);

    if (!firstName || !lastName || !email || !password) {
        console.warn('[REGISTER][ERREUR] Champs requis manquants.');
        return res.status(400).json({ error: 'Tous les champs requis (sauf extraNapkins et frequentRefill)' });
    }

    const newClient = {
        firstName,
        lastName,
        email,
        password, // ⚠️ Stockage en clair (à améliorer avec un hashage sécurisé)
        dateOfBirth,
        extraNapkins,
        frequentRefill,
    };

    console.log('[REGISTER] Données du nouvel utilisateur :', newClient);

    Client.create(newClient, (err, result) => {
        if (err) {
            console.error('[REGISTER][ERREUR] Erreur lors de la création du compte :', err);
            return res.status(500).json({ error: 'Erreur lors de la création du compte' });
        }

        console.log('[REGISTER] Compte créé avec succès, ID du client :', result.id);
        res.status(201).json({ message: 'Compte créé avec succès', client_id: result.id });
    });
};

module.exports = {
    loginAccount,
    registerAccount,
};
