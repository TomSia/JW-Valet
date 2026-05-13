import { prisma } from "@/src/lib/prisma";

const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" }
  },
})