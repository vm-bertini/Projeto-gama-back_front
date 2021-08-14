module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.USER_BASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
