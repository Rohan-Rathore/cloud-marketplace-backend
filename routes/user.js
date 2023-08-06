const express = require ("express");
const router = express.Router();

const {getUserById, getUser, updateUser, userPurchaseList, completeCSPProfile} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.post(
  "/csp/complete-profile/", 
  isSignedIn,
  completeCSPProfile
);

module.exports = router;