var fs = require('fs');
var parse = require('csv-parse');
import Product from '../models/Product.model';

var parser = parse({ delimiter: ';', columns: true }, function (err, data) {
  // console.log(data[0])
  data.map(d => {
    Models.Product.findOne({ ref: d.id })
      .then(product => {
        if (!product)
          new Product({
            ref: d.id,
            name: d.title,
            type: d.sleeve,
            imageUrl: `https:${d.photo}`,
            pageUrl: d.url,
          }).save();
      })
      .catch(err => console.log(err))
  });
});

const parseCsv = (filePath) => {
  fs.createReadStream(filePath).pipe(parser);
}

export default parseCsv;