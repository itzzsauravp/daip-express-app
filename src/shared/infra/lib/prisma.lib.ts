import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../configs/envs';
import { PrismaClient } from 'src/generated/prisma/client';

const connectionString = `${env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;
