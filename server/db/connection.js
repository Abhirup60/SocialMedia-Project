const mongoose = require('mongoose');

const db = "mongodb+srv://abhirupbasu680:abhirup%402004@cluster0.7k576.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected successfully')
}).catch((e)=>{
    console.log(e,"error");
})