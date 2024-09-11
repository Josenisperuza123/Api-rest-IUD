const mongoose = require('mongoose');

const getConection = async() =>{
    try {
     await mongoose.connect('mongodb://Admin123_mongoDb-IUD:Admin12345@cluster0-shard-00-00.ot3x6.mongodb.net:27017,cluster0-shard-00-01.ot3x6.mongodb.net:27017,cluster0-shard-00-02.ot3x6.mongodb.net:27017/bd_NewsMovies?ssl=true&replicaSet=atlas-gvce1o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
        console.log('conexion exitosa');
    
    } catch (error) {
        console.log('error');
    }
}

module.exports ={
    getConection
}



