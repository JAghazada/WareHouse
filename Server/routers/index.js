const express = require("express")
const router = express.Router();
const auth = require("./auth.routes");
const admin = require("./admin.routes");
const page = require("./page.routes");
const product = require("./product.routes");

// router.post("/uploadProduct", async function (req, res) {
//   console.log("body: ",JSON.parse(JSON.stringify(req.body)))
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError)
//       throw new APIError("Something went wrong when image upload", 400);
//     else if (err)
//      console.log(err)
//     else
//       return new Response(req.savedImages, "upload is successful").success(res);
//   });
// });

router.use(product);
router.use(page);
router.use(admin);
router.use(auth);

module.exports = router;
