export function compressRLE(data) {
  // data is a string
  // data : array of number ex: [65, 66, 256, 258, 258]
  // output : [[65, 1], [66, 1], [256, 1], [258, 2]]
  data = data.split(" ");
  var output = [];
  var n = data[0];
  output.push([n, 1]);
  var idx = 0;

  for (let i = 1; i < data.length; i++) {
    var m = data[i];
    if (m == n) {
      output[idx][1] += 1;
    } else {
      n = m;
      idx += 1;
      output.push([m, 1]);
    }
  }

  for (let i = 0; i < output.length; i++) {
    output[i] = output[i].join(":");
  }
  output = output.join(" ");
  console.log(output);
  return output;
}

export function decompressRLE(data) {
  // data is a string
  // data : [[65, 1], [66, 1], [256, 1], [258,2]]

  data = data.split(" ");
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(":");
  }
  var output = "";

  for (let i = 0; i < data.length; i++) {
    var count = parseInt(data[i][1]);
    var str = data[i][0];
    console.log(count, str);
    for (let j = 0; j < count; j++) {
      output += str;
      output += " ";
    }
  }

  console.log(output);
  return output;
}

const compressed = compressRLE("65 66 256 256");
const decompressed = decompressRLE(compressed);
