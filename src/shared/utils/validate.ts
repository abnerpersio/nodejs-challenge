import ResponseError from '../errors/ResponseError';

export const validate = (data: any, validations: string[], param: string | null = null) => {
  validations.forEach((item) => {
    if (!data) {
      throw new ResponseError(`Invalid value "${data}" for ${param ?? 'data'}`, 400);
    }

    if (!data[item]) {
      throw new ResponseError(
        `Invalid value "${data[item]}" for "${item}" field at "${param ?? 'data'}"`,
        400,
      );
    }
  });
};

export const filterDataWithKeys = (data: any, fields: string[]) => {
  let result: { [key: string]: any } = {};

  Object.keys(data)
    .filter((field) => fields.includes(field))
    .forEach((field) => (result[field] = data[field]));

  return result;
};
