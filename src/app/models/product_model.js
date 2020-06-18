module.exports = mongoose => {
    const Product = mongoose.model(
        "product",
        mongoose.Schema(
            {
                name : {
                    type:String,
                    default:""
                },
                price : {
                    type:Number,
                    default:0
                },
                available: {
                    type:Boolean,
                    default:false
                },
                dateCreated:{
                    type: Date,
                    default : Date.now
                }
            }

        )
    );

    return Product;
};