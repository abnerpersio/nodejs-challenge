import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const getToken = (data: any): string => {
  return jwt.sign(data, JWT_SECRET as string);
};

export const decodeToken = (token: string) => {
  const isValid = jwt.verify(token, JWT_SECRET as string);

  if (!isValid) {
    throw new Error('invalid token');
  }

  return jwt.decode(token);
};
