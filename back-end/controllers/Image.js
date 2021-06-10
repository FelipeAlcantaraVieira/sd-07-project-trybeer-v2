// const getImage = async (req, res) => {
//   try {
//     const { url } = req;
//     const newUrl = url.replace('%20', ' ');
//     res.sendFile(newUrl, { root: '../' });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
// const { OK, NOTFOUND } = require('./HttpCodes');

// const getImage = async (req, res) => {
//   try {
//     const { url } = req;
//     const newUrl = url.replace('%20', ' ');
//     res.status(OK).sendFile(newUrl, { root: './' });
//   } catch (error) {
//     res.status(NOTFOUND).end();
//   }
// };
// >>>>>>> main-group-8

// module.exports = {
//   getImage,
// };

// var re = /(\w+)\s(\w+)/;
// var str = 'John Smith';
// var newstr = str.replace(re, '$2, $1');