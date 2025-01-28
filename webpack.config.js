const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './video.js',  // Entry point for your JavaScript
  output: {
    filename: 'bundle.js',  // Output file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  // Webpack Dev Server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve files from 'dist' folder
    },
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem')),
      },
    },
    compress: true, // Enable gzip compression
    port: 9000, // Port to run the dev server
    open: true, // Automatically open the browser when the server starts
  },
  // Optional: Set up source maps to aid debugging in development
  devtool: 'inline-source-map',
  mode: 'development',  // Mode for Webpack (development/production)
};
