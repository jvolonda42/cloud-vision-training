# Prerequisites
* node.js latest
* mongodb latest

# Init project
```
npm install
npm run build
node dist/scripts/importFromCsv.js YOUR.CSV
GOOGLE_APPLICATION_CREDENTIALS="PATH/TO/YOUR/GOOGLE_CREDENTIALS.json" node dist/scripts/getColorsWithVision.js
npm run serve
```

## Routes availables
```localhost:8080/products``` list all products \
```localhost:8080/products/:productId/relevant``` list 10 most relevant products based on product's dominant color

Navigate to localhost:8080 to see products - click on a product to see the 10 most relevant products based on most dominant color.
