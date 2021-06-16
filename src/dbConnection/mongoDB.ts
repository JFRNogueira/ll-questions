import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config()

export function getDbUrl(env: string): string {

  let DB_NAME = process.env.DB_NAME_DEV
  let DB_CLUSTER = process.env.DB_CLUSTER_DEV

  const DB_USER = process.env.DB_USER
  const DB_PASS = process.env.DB_PASS
  const prefix = 'mongodb+srv://' + DB_USER + ':' + DB_PASS + '@';
  const suffix = '?retryWrites=true&w=majority';

  let content;
  switch (env) {
    case 'prod':
      DB_CLUSTER = process.env.DB_CLUSTER_PROD;
      DB_NAME = process.env.DB_NAME_PROD;
      break;
    case 'homolog':
      DB_CLUSTER = process.env.DB_CLUSTER_HOMOLOG;
      DB_NAME = process.env.DB_NAME_HOMOLOG;
      break;
    default:
      DB_CLUSTER = process.env.DB_CLUSTER_DEV;
      DB_NAME = process.env.DB_NAME_DEV;
      break;
  }
  content = DB_CLUSTER + '-cjwzx.gcp.mongodb.net/' + DB_NAME;
  const result = prefix + content + suffix;
  return result;
}

const mongoOptions: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
};

export default async function connectMongodb(): Promise<typeof mongoose | null> {
  const { readyState } = mongoose.connection;
  const ENV = process.env.ENVIRONMENT;
  const mongoUrl = getDbUrl(String(ENV))
  if (readyState === 0 || readyState === 3) {
    return await mongoose.connect(mongoUrl, mongoOptions);
  }
  console.log(`❌ Failure on connectMongodb(). readyState = ${readyState}`)
  return null;
}
