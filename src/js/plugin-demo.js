import { Wallet } from "@swtc/wallet";

let secret = "";

export const test_sign = async (data) => {
  const wallet = new Wallet(secret);
  return wallet.sign(data);
};

export const test_getPK = async () => {
  const wallet = new Wallet(secret);
  return wallet.getPublicKey();
};

export const test_verify = async (data, signature) => {
  const wallet = new Wallet(secret);
  return wallet.verify(data, signature);
};
