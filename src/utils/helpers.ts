import jwt from "jsonwebtoken";
import { env } from "../config/index";

// export const getToken = (user) => {
//   return jwt.sign(
//     {
//       id: user.id,
//     },
//     cookiesSecretKey,

//     { expiresIn: "24h" }
//   );
// };

// export const getToken = (user: { id: number }): string => {
//   const cookiesSecretKey: string = env.SECRETKEY; // Replace with your actual secret key
//   return jwt.sign(
//     {
//       id: user.id.toString(), // Convert the number to a string if needed
//     },
//     cookiesSecretKey,
//     { expiresIn: "24h" }
//   );
// };

export const getToken = (user: { id?: number }, exceptions: any): string => {
  const cookiesSecretKey: string = env.SECRETKEY; // Replace with your actual secret key
  if (user.id !== undefined) {
    return jwt.sign(
      {
        id: user.id.toString(), // Convert the number to a string if needed
      },
      cookiesSecretKey,
      { expiresIn: "24h" }
    );
  } else {
    // Handle the case where user.id is not defined (optional)
    return exceptions.UnauthorizedError("Password incorrect");
  }
};
