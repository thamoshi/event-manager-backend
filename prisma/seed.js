const { PrismaClient } = require('@prisma/client');
const { localTypes, locals, eventTypes, events } = require('./data');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.localType.createMany({
      data: localTypes,
    });

    await prisma.local.create({
      data: locals,
    });

    await prisma.eventType.createMany({
      data: eventTypes,
    });

    await prisma.event.create({
      data: events,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect;
  }
};

load();
