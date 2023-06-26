import compressDAO from "../dao/compressDAO.js";
import { storeDict } from "../algorithm/lzw.js";
import {
  compressLZW,
  decompressLZW,
  decompressNoDict,
} from "../algorithm/lzw.js";

export default class CompressController {
  static async createCompress(req, res, next) {
    try {
      const text = req.body.text;
      const compressed = req.body.compressed;
      const dic = req.body.dic;

      console.log("Hello from create compress", text, compressed, dic);

      const compressResponse = await compressDAO.addCompress(
        text,
        compressed,
        dic
      );
      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        status: e.message,
      });
    }
  }

  static async getCompress(req, res, next) {
    try {
      let text = req.params.textComp || {};
      let compress = await compressDAO.getCompress(text);
      if (!compress) {
        res.status(404).json({
          error: "not found",
        });
        return;
      }
      res.json(compress);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({
        error: e,
      });
    }
  }

  static async getText(req, res, next) {
    try {
      let compressed = req.params.compressedDoc || {};
      let text = await compressDAO.getText(compressed);
      if (!text) {
        res.status(404).json({
          error: "not found",
        });
        return;
      }
      res.json(text);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({
        error: e,
      });
    }
  }

  // static async getCompressedByText(req, res, next) {
  //     Compress.findById(req.params.text)
  //         .then((post) => {
  //             if (post) {
  //                 res.status(200).json(post);
  //             } else {
  //                 res.status(404).json({
  //                     message: "Compress not found!"
  //                 });
  //             }
  //         })
  //         .catch((error) => {
  //             res.status(500).json({
  //                 message: "Fetching Compress failed!",
  //             });
  //         });
  // };

  static async deleteCompress(req, res, next) {
    try {
      const text = req.params.textComp;
      const deleteResponse = await compressDAO.deleteCompress(text);
      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  }

  static async compress(req, res, next) {
    try {
      const text = req.params.textComp;
      let dic = new storeDict();
      const compressed = compressLZW(text, dic);

      console.log(compressed);

      const compressResponse = await compressDAO.addCompress(
        text,
        compressed,
        dic
      );
      res.json(compressed);
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  }

  static async decompressWithDB(req, res, next) {
    try {
      // Query to db
      const compressed = req.params.compressedDoc;
      return this.getText(req, res, next);
    } catch {
      res.status(500).json({
        error: e.message,
      });
    }
  }

  static async decompress(req, res, next) {
    try {
      var compressed = req.params.compressedDoc;
      //   compressed = compressed.split("-");
      //   compressed = compressed.join(" ");
      console.log(compressed);
      var text = decompressNoDict(compressed);
      res.json(text);
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  }
}
