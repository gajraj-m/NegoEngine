// const express = require("express");
// const {
//   test,
//   updateUser,
//   deleteUser,
// } = require("../controllers/user.controller.js");
// const { verifyToken } = require("../utils/verifyUser.js");

// router.get("/", test);
// router.post("/update/:id", verifyToken, updateUser);
// router.delete("/delete/:id", verifyToken, deleteUser);

const express = require('express')
const Buyer = require('../models/buyer')
const Seller = require('../models/seller')
const {buyerAuth, sellerAuth} = require('../middleware/auth')
const router = new express.Router()


router.post('/buyers', async (req, res) => {
    const user = new Buyer(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
    
})
router.post('/sellers', async (req, res) => {
    const user = new Seller(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
    
})

router.post('/buyers/login', async (req, res) => {
    try {
        const user = await Buyer.findByCredentials(req.body.email, req.body.password)
        const token = await Buyer.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
router.post('/sellers/login', async (req, res) => {
    try {
        const user = await Seller.findByCredentials(req.body.email, req.body.password)
        const token = await Seller.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/buyers/logout', buyerAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/sellers/logout', sellerAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/buyers/logoutAll', buyerAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/sellers/logoutAll', sellerAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/buyers/me', buyerAuth, async (req, res) => {
    res.send(req.user)
})
router.get('/sellers/me', sellerAuth, async (req, res) => {
    res.send(req.user)
})

router.patch('/buyers/me', buyerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['fullname', 'email', 'password', 'rating', 'noOfUsers', 'profilePicture']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "invalid opertaion!"})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.patch('/sellers/me', sellerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['fullname', 'email', 'password', 'rating', 'noOfSales', 'profilePicture']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "invalid opertaion!"})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/buyers/me', buyerAuth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
router.delete('/sellers/me', sellerAuth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
