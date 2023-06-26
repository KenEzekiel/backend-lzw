# backend-lzw

Backend for the LZW Compression Algorithm

## API Route

```
/api/compress/
```

## Program Explanation

There are several APIs provided by the backend server, which are:

- Create a new text-compressed object to be stored in database in route `/new`
- Get and Delete text-compressed object from text stored in database in route `/:textComp`
- Get text-compressed object from compressed in database in route `/getcomp/:compressedDoc`
- Compress and get the compressed output in route `/comp/:textComp`
- Decompress and get the text output in route `/decomp/:compressedDoc`
- Decompress and get the text output from database in route `/decompdb/:compressedDoc`
