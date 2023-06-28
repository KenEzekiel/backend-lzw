import express from "express";
import CompressController from "../controllers/compress.js";
const router = express.Router();
// const CompressController = require("../controllers/compress.js");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.route("/new").post(CompressController.createCompress);

router
  .route("/:textComp")
  .get(CompressController.getCompress)
  .delete(CompressController.deleteCompress);

router.route("/getcomp/:compressedDoc").get(CompressController.getText);

router.route("/comp/:textComp").get(CompressController.compress);

router.route("/decomp/:compressedDoc").get(CompressController.decompress);

router
  .route("/decompdb/:compressedDoc")
  .get(CompressController.decompressWithDB);

router.route("/comp/RLE/:textComp").get(CompressController.compressRLECtrl);
router
  .route("/decomp/RLE/:compressedDoc")
  .get(CompressController.decompressRLECtrl);

export default router;
