import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

const KEY_LENGTH = 64;

export function hashAdminPassword(
  password: string,
) {
  const salt = randomBytes(16).toString(
    "hex",
  );

  const hash = scryptSync(
    password,
    salt,
    KEY_LENGTH,
  ).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyAdminPassword(
  password: string,
  storedHash: string,
) {
  const [salt, hash] =
    storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const hashBuffer =
    Buffer.from(hash, "hex");

  const suppliedHash =
    scryptSync(
      password,
      salt,
      KEY_LENGTH,
    );

  if (
    hashBuffer.length !==
    suppliedHash.length
  ) {
    return false;
  }

  return timingSafeEqual(
    hashBuffer,
    suppliedHash,
  );
}
