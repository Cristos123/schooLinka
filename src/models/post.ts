import { DataTypes } from "sequelize";
import db from "../datasources/postgres";
import user from "./user";

const post = db.define(
  "post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

post.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE", // This ensures posts are deleted when the associated user is deleted
});

export default post;
