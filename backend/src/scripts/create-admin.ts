import "dotenv/config";

import { prisma } from "../lib/prisma.js";
import { hashAdminPassword } from "../lib/admin-password.js";

const [nameArg, emailArg, passwordArg] =
  process.argv.slice(2);

const name = nameArg?.trim();
const email =
  emailArg?.trim().toLowerCase();
const password = passwordArg;

if (!name || !email || !password) {
  console.error(
    'Uso: pnpm tsx src/scripts/create-admin.ts "Nome" "email@dominio.com" "senha-com-8-ou-mais"',
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error(
    "A senha precisa ter pelo menos 8 caracteres.",
  );
  process.exit(1);
}

const existing =
  await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

if (existing) {
  console.error(
    "Já existe um AdminUser com este e-mail.",
  );
  process.exit(1);
}

const user =
  await prisma.adminUser.create({
    data: {
      name,
      email,
      passwordHash:
        hashAdminPassword(password),
      role: "OWNER",
      isActive: true,
    },
  });

console.log(
  `OWNER criado: ${user.name} <${user.email}>`,
);

await prisma.$disconnect();
