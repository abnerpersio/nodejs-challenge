import crypto from 'crypto';

const { HASH_SECRET } = process.env;

export const hash = (pass: string): string => {
  return crypto
    .createHmac('SHA256', HASH_SECRET as string)
    .update(pass)
    .digest('base64');
};

export const verifyHash = (pass: string, hashed: string): boolean => {
  return hash(pass) === hashed;
};
