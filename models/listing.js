const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/gray-wooden-house-178j8tJrNlc",
            set: (v) => v === "" ? "https://unsplash.com/photos/gray-wooden-house-178j8tJrNlc" : v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
