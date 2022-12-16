import app from './src/app';
import connectToDatabase from './src/models/connection';


const { PORT } = process.env;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
    })
    .catch((error) => {
        console.log('Connection with database generated an error:\r\n');
        console.error(error);
        console.log('\r\nServer initialization cancelled');
        process.exit(0);
    });