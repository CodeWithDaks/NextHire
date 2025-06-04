// Data URI ek aisa format hai jisme file ka data (jaise image, pdf, etc.) ko base64 encoding
// ke form mein ek string mein convert kar diya jata hai — jisse aap usse URL ke tarah 
// directly use kar sako bina kisi server ke.

import  DataUriParser from"datauri/parser.js";
import path from "path";

const getDataUri =(file)=>{
    const parser =new DataUriParser();
    const extName =path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}

export default getDataUri;