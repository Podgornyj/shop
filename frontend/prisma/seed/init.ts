/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

/* Core */
// import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

/* Instruments */
import { users } from './seed-data';

const prisma = new PrismaClient();

async function seed () {
    try {
        await seedUsers();
        console.log('✅ Seed succseeded.');
    } catch (error) {
        console.log(error);
    }
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        console.info('🏁 Prisma disconnected.');

        process.exit(1);
    });

/* Helpers */
async function seedUsers () {
    const userList = await Promise.all(users.map(async (user) => {
            return {
                ...user,
                // password: await bcrypt.hash(user.password, 10),
            };
        }));

    await prisma.user.createMany({ data: userList });
}
