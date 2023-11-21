<div align="center">
    <img src="./public/todo-logo-circle.png"
    width="200">
    <h1 align="center">Todo Backend</h1>
</div>
Welcome to Todo Backend! This backend allows you to build APIs.

<!-- ## Live Demo

Check out the live demo of Todo on Netlify: [Todo Live Demo](https://your-link) -->

## Frontend Repository

Check out the frontend repository for this project on Github: [Todo Frontend](https://github.com/ChiragWadhwani05/todo-frontend)

## Required OS dependencies

- Mysql Database Service

## Getting Started

1. Clone this repository to your local machine.
2. Open the terminal in the repository directory.
3. Install the packages:

```bash
npm install
```

4. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
5. To start project in development run

```bash
npm run dev
```

6. To start project in production run

```bash
# To comiple ts
npm run tsc
# To run app using nodejs
npm run start
```

7. Before commit run

```bash
# To beautify the code formatting
npm run lint
```

## Information for Developer

- The project insures that the server only starts after database is connected and working properly.

- Project uses typescript for es6 and type safety but in `package.json` and `tsconfig.json` files `"type"(package.json)` and `"module"(tsconfig.json)` properties are set to "commonjs" so that project can use some packages that can only be used with `"commonjs"`.

## Technologies Used

- Express for building APIs.
- CORS to allow multiple origins
- Dotenv to hide sensitive information.
- TypeScript for type safety.
- ts-node-dev for restarting server in development mode.
- Sequelize as an ORM for working with databases.
- Git for version control and collaborative development.

## Contributions

Contributions are welcome! If you have any improvements, or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to us using the following email addresses:

[@ChiragWadhwani05](https://github.com/ChiragWadhwani05):
**[wadhwanichirag94@gmail.com](mailto:wadhwanichirag94@gmail.com)**

[@LakshayManglani](https://github.com/LakshayManglani):
**[lakshaymanglani2212@gmail.com](mailto:lakshaymanglani2212@gmail.com)**
