const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dbConection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log('DB online')

    } catch (error) {

        console.log(error)
        throw new Error('Error a la hora de inicializar DB')

    }
}


module.exports = {
    dbConection
}