const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

// router.post("/", (req, res) => {
// //   res.render("home");
//   const collect = req.collect;
//   if (
//     collect.name != null &&
//     collect.email != null &&
//     collect.message != null
//   ) {
//     console.log("collect");
//   } else {
//     res.redirect("home");
//   }
// });

module.exports = router;
