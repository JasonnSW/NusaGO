/* eslint-disable */
import path from "path";
import fs from "fs";

type PrivateKey = Record<string, any>;

export const getPrivateKey = (): PrivateKey => {
  const privateKeyPath = path.resolve(
    process.cwd(),
    process.env.SERVICE_ACCOUNT_KEY_PATH || ""
  );
  console.log("privateKeyPath", privateKeyPath);

  if (!privateKeyPath) {
    throw new Error("SERVICE_ACCOUNT_KEY_PATH is not defined in .env");
  }

  if (!fs.existsSync(privateKeyPath)) {
    throw new Error(`Private key file not found at path: ${privateKeyPath}`);
  }

  const privateKey: PrivateKey = JSON.parse(
    fs.readFileSync(privateKeyPath, "utf8")
  );

  return privateKey;
};
