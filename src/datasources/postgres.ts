import { env } from "../config/index";
import { Sequelize } from "sequelize";

const postgresClient = new Sequelize(
  env.DATABASE as string,
  env.USER as string,
  env.PASSWORD as string,
  {
    host: env.HOSTNAME || "localhost",
    dialect: "postgres",
    port: parseInt(env.PORT as string),
    logging: false,
    pool: {
      max: 2,
      min: 0,
      acquire: 3000,
      idle: 0,
    },
  }
);

postgresClient
  .sync({ alter: true })
  .then(() => console.log("Postgres connected successfully!"))
  .catch((err) => console.log(err));

export default postgresClient;

// import { env } from "../config/index";
// import { Sequelize } from "sequelize";

// let postgresClient;

// if (env.NODE_ENV === "production") {
//   // Production configuration  URL
//   postgresClient = new Sequelize(env.HOST, {
//     logging: false,
//     pool: {
//       max: 2,
//       min: 0,
//       acquire: 3000,
//       idle: 0,
//     },
//   });
// } else {
//   // Development configuration with localhost
//   postgresClient = new Sequelize(
//     env.DATABASE as string,
//     env.USER as string,
//     env.PASSWORD as string,
//     {
//       host: "localhost",
//       dialect: "postgres",
//       port: parseInt(env.PORT as string),
//       logging: false,
//       pool: {
//         max: 2,
//         min: 0,
//         acquire: 3000,
//         idle: 0,
//       },
//     }
//   );
// }

// postgresClient
//   .sync({ alter: true })
//   .then(() => console.log("Postgres connected successfully!"))
//   .catch((err) => console.log(err));

// export default postgresClient;
