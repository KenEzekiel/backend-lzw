import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let compresses;

export default class compressDAO {
  static async injectDB(conn) {
    if (compresses) {
      return;
    }
    try {
      compresses = await conn.db("LZW").collection("LZW Compression");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in compressDAO: ${e}`
      );
    }
  }

  static async addCompress(text, compressed, dic) {
    try {
      const compDoc = {
        text: text,
        compressed: compressed,
        dic: dic.dictionary,
      };
      let temp = await compresses.findOne({
        text: text,
      });
      console.log(temp);
      if (!temp) {
        console.log("creating new compression");
        console.log(compDoc);
        return await compresses.insertOne(compDoc);
      }
    } catch (e) {
      console.error(`Unable to post compress: ${e}`);
      return { error: e };
    }
  }

  static async getCompress(textComp) {
    try {
      console.log("Halo get Compress");
      console.log(textComp);
      return await compresses.findOne({
        text: textComp,
      });
      // return await findDocumentByAttribute(compresses, text, textComp)
    } catch (e) {
      console.log(`Unable to get compress: ${e}`);
      return { error: e };
    }
  }

  static async getText(compressedDoc) {
    try {
      console.log("Halo get Text");
      console.log(compressedDoc);
      return await compresses.findOne({
        compressed: compressedDoc,
      });
      // return await findDocumentByAttribute(compresses, compressed, compressedDoc)
    } catch (e) {
      console.log(`Unable to get text: ${e}`);
      return { error: e };
    }
  }

  static async deleteCompress(textComp) {
    try {
      const deleteResponse = await compresses.deleteOne({
        _id: ObjectId(text),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete compress: ${e}`);
      return { error: e };
    }
  }
}
