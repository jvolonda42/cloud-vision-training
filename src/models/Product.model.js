import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String },
});

ProductSchema.virtual('serialize').get(function () {
  return {
    id: this._id,
    name: this.name
  };
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
