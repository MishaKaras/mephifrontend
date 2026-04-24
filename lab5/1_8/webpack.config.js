const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    const environment = env.environment || 'local';
    
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
        },
        plugins: [
        new Dotenv({
            path: `./.env.${environment}`, 
        }),
        ],
    };
};