const express = require('express');
const cors = require('cors');
const { validate, Joi } = require("express-validation");
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

app.get('/download', (req,res) => {
    const url = req.query.url;
  const format= req.query.format
  const quality = req.query.quality
  video = ytdl(url, {
    format: format,
    quality: quality,
  }).pipe(res)
});



app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});