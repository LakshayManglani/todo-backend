# Todo Backend

Welcome to Todo Backend! This backend allows you to build APIs.

<!-- ## Live Demo

Check out the live demo of Todo on Netlify: [Todo Live Demo](https://your-link) -->

<!-- ## Frontend Repository

Check out the frontend repository for this project on Github: [Todo Reopsitory](https://github.com/your-link) -->

## Required OS dependencies

- Mysql Database Service

## Getting Started

1. Clone this repository to your local machine.
2. Open the terminal in the repository directory.
3. Run "npm install" to install all dependencies.
4. Setup environment variables in .env file accordingly.
5. To start project in development run "npm run dev" in terminal.
6. To start project in production run "npm run start" and before starting compile it using "npm run tsc"
7. Before commit run "npm run lint" to beautify the code formatting.

## Information for Developer

- The project insures that the server only starts after database is connected and working properly.

- Project uses typescript for es6 and type safety but in package.json and tsconfig.json files "type"(package.json) and "module"(tsconfig.json) properties are set to "commonjs" so that project can use some packages that can only be used with "commonjs".

## Technologies Used

- Express for building APIs.
- CORS to allow multiple origins
- Dotenv to hide sensitive information.
- TypeScript for type safety.
- Nodemon for restarting server in development mode.
- Sequelize as an ORM for working with databases.
- Git for version control and collaborative development.

## Contributions

Contributions are welcome! If you have any improvements, or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to us using the following email addresses:
[wadhwanichirag94@gmail.com](mailto:wadhwanichirag94@gmail.com)
[lakshaymanglani2212@gmail.com](mailto:lakshaymanglani2212@gmail.com)
