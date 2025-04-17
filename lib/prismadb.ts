import { PrismaClient} from '@prisma/client';

declare global {
    // allow global `prisma` to be replaced in test environments
    var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
// Singleton pattern for Prisma Client

