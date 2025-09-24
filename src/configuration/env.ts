export default () => ({
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    autoLoadEntities:
      process.env.DATABASE_AUTOLOADENTITIES === 'true' ||
      process.env.DATABASE_AUTOLOADENTITIES === '1',
    synchronize:
      process.env.DATABASE_SYNCHRONIZE === 'true' || 
      process.env.DATABASE_SYNCHRONIZE === '1',
  },
});
