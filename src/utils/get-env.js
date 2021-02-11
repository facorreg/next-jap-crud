import dotenv from 'dotenv';

dotenv.config();

const getEnv = (envName, defaultValue = '') =>
  process?.env?.[envName] || process?.env?.[`NEXT_PUBLIC_${envName}`] || defaultValue;

export default getEnv;
