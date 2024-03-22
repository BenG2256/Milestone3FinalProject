const router = require('express').Router()
const db = require("../models")

const { Reviews } = db

router.get('/:location_id')