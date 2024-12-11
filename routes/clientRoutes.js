const express = require('express');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

const router = express.Router();

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Récupère tous les clients
 *     responses:
 *       200:
 *         description: Liste de tous les clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idClient:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                   extraNapkins:
 *                     type: boolean
 *                   frequentRefill:
 *                     type: boolean
 */
router.get('/', getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Récupère un client par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du client trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idClient:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 extraNapkins:
 *                   type: boolean
 *                 frequentRefill:
 *                   type: boolean
 *       404:
 *         description: Client non trouvé
 */
router.get('/:id', getClientById);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crée un nouveau client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - dateOfBirth
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               extraNapkins:
 *                 type: boolean
 *               frequentRefill:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idClient:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 extraNapkins:
 *                   type: boolean
 *                 frequentRefill:
 *                   type: boolean
 */
router.post('/', createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Met à jour les informations d'un client existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du client à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               extraNapkins:
 *                 type: boolean
 *               frequentRefill:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Client mis à jour avec succès
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Client non trouvé
 */
router.put('/:id', updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Supprime un client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du client à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client supprimé avec succès
 *       404:
 *         description: Client non trouvé
 */
router.delete('/:id', deleteClient);

module.exports = router;
