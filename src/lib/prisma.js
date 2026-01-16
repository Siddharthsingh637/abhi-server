import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  // Always create a new PrismaClient in production
  prisma = new PrismaClient();
} else {
  // In development, reuse PrismaClient to avoid hot-reload issues
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
