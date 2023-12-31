# backend-lzw

Backend for the LZW Compression Algorithm

## API Route

```
/api/compress/
```

## API Explanation

There are several APIs provided by the backend server, which are:

- Create a new text-compressed object to be stored in database in route `/new`
- Get and Delete text-compressed object from text stored in database in route `/:textComp`
- Get text-compressed object from compressed in database in route `/getcomp/:compressedDoc`
- Compress and get the compressed output in route `/comp/:textComp`
- Decompress and get the text output in route `/decomp/:compressedDoc`
- Decompress and get the text output from database in route `/decompdb/:compressedDoc`
- Double Compression using LZW then RLE in route `/comp/RLE/:textComp`
- Double Decompression using RLE then LZW in route `/decomp/RLE/:compressedDoc`

## Program Explanation

The flow of the data will be:

1. Router `route/compress,js`
2. Controller `controllers/compress.js`
3. Algorithm `algorithm/lzw.js`
4. For search, will use the `dao/compressDAO.js`

### Compression

1. From Front-end, access `/comp/:textComp` with `:textComp` filled with the text being compressed
2. The response will return a json filled with the compressed output

For double compression, additional step before LZW Compression is compression using RLE

### Decompression

1. From Front-end, access `decomp/:compressedDoc` with `:compressedDoc` filled with the text being decompressed
2. The response will return a json filled with the actual text

For double decompression, additional step before LZW decompression is decompression using RLE

## Database access

For accessing the database, this project uses the DAO (Data Access Object) Design Pattern, as an intermediary for the Controller to the database

## Libraries Used

- MongoDB
- Express.JS
- Cors

## Author

This project is made by Kenneth Ezekiel (13521089) for the purpose of fulfilling the task of IRK Lab Selection
