const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
require('dotenv').config()

const documentoSchema = new Schema({
    oficio:{
        type: String,
        required:true,
        unique:true,
    },
    fecha:{
        type:String,
        required:true,
    },
    asunto:{
        type:String,
        required:true,
    },
     img:{
        type:String,
        required:true,
    },

    nombreDocs:String,
    
    // usuario:{
    //     //required:true,
    //     type: Schema.Types.ObjectId,
    //     ref: "usuario",
    // }

},{
    timestamps: true,
    versionKey: false,
}
)

documentoSchema.methods.setimgUrl = function setimgUrl(filename) {
    const url = "http://localhost:4000/";
    this.img = url + 'public/' + filename;
    this.nombreDocs = filename;
}

documentoSchema.plugin(mongoosePaginate);
module.exports = model('Documento', documentoSchema)