var fs = require('fs');
var parse = require('csv-parse');
import Models from '../models';

var parser = parse({ delimiter: ';', columns: true }, function (err, data) {
  // console.log(data[0])
  data.map(d => {
    Models.Product.findOne({ ref: d.id })
      .then(product => {
        if (!product)
          new Models.Product({
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

export default fs.createReadStream(__dirname + '/../../products.csv').pipe(parser);