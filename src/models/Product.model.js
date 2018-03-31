import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String },
  ref: { type: String },
  type: { type: String },
  pageUrl: { type: String },
  imageUrl: { type: String },
  dominantColors: [{type: String}]
});

ProductSchema.virtual('serialize').get(function () {
  return {
    id: this._id,
    ref: this.ref,
    type: this.type,
    name: this.name,
    pageUrl: this.pageUrl,
    imageUrl: this.imageUrl,
    dominantColors: this.dominantColors,
  };
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
