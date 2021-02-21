import app from './app';
import 'reflect-metadata';
import './database';

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line
    console.log(`Server started on port ${process.env.PORT}...`);
});
