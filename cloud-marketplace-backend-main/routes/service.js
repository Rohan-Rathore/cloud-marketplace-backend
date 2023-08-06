const express = require("express");
const router = express.Router();

const {
  createService, getCSPServices, removeService, getAllServices,
} = require("../controllers/service");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { FindBestCSP } = require("../controllers/algo");

//params
router.param("userId", getUserById);
// router.param("categoryId", getCategoryById);

//actual routers

//create
router.post(
  "/service/create/",
  isSignedIn,
  createService
);

//read
router.post(
  "/csp/services/", 
  isSignedIn,
  getCSPServices
);
// router.get("/categories", getAllCategory);

// //update
// router.put(
//   "/category/:categoryId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateCategory
// );

// //delete

router.delete(
  "/service/remove/:serviceId",
  isSignedIn,
  removeService
);

router.get(
  "/services/",
  getAllServices
);

router.post(
  "/find-best-service/",
  isSignedIn,
  FindBestCSP
);

module.exports = router;