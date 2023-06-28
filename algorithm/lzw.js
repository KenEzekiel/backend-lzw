export class storeDict {
  constructor() {
    this.dictionary = {};
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function compressLZW(data, dictObj) {
  var output = [];
  var currentPhrase = "";

  for (var i = 0; i < 256; i++) {
    if (String.fromCharCode(i) == "\x00") {
      continue;
    }
    dictObj.dictionary[String.fromCharCode(i)] = i;
  }

  for (var j = 0; j < data.length; j++) {
    var symbol = data[j];
    var phrasePlusSymbol = currentPhrase + symbol;

    // if wk exists in the dict.dictionary
    if (phrasePlusSymbol in dictObj.dictionary) {
      currentPhrase = phrasePlusSymbol;
    } else {
      dictObj.dictionary[phrasePlusSymbol] =
        Object.keys(dictObj.dictionary).length + 1;
      output.push(dictObj.dictionary[currentPhrase]);
      currentPhrase = symbol;
    }
  }

  if (currentPhrase !== "") {
    output.push(dictObj.dictionary[currentPhrase]);
  }

  return output.join(" ");
}

export function decompressLZW(data, dictObj) {
  data = data.split(" ");
  var output = "";

  for (var i = 0; i < data.length; i++) {
    output += getKeyByValue(dictObj.dictionary, parseInt(data[i]));
  }

  return output;
}

export function decompressNoDict(data) {
  data = data.split(" ");
  if (data[data.length - 1] == "") {
    let temp = data.pop();
  }
  console.log("data length ", data.length);
  var dictionary = {};
  dictionary[0] = "NULL";
  // Initializing the dictionary
  for (var i = 1; i < 256; i++) {
    dictionary[i] = String.fromCharCode(i);
  }
  var output = "";
  var old = data[0];
  var code;
  var s = dictionary[old];
  var c = "";
  c += s[0];
  output += s;
  console.log("temp ", output);
  var count = 256;

  // console.log(dictionary);

  for (var i = 1; i < data.length; i++) {
    code = data[i];
    // console.log(code);

    if (code in dictionary) {
      s = dictionary[code];

      // console.log("has value ", s);
    } else {
      s = dictionary[old];
      s = s + c;

      // console.log(s);
    }
    output += s;
    console.log("temp ", output);

    c = "";
    c += s[0];
    // console.log("c", c);

    dictionary[count] = dictionary[old] + c;
    count += 1;
    old = code;
  }
  // console.log(dictionary);
  console.log("final ", output);

  return output;
}

// Example usage:
// let dictObj = new storeDict();
// var originalData = "ABABABAABABA";
// var compressedData = compressLZW(originalData, dictObj);
// console.log("Compressed data:", compressedData);
// console.log("Dictionary: ", dictObj.dictionary);
// var decompressedData = decompressNoDict(compressedData);
// // var decompressedData = decompressNoDict("66 65 256 257 65 260");
// console.log("Decompressed data:", decompressedData);

// Compressed data: [ 65, 66, 256, 258, 258, 257 ]
// A B AB ABA ABA BA
