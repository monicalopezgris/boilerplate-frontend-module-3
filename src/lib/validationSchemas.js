import { string, number, object, array } from 'yup';

export const billSchema = {
  name: string()
    .required()
    .min(2, 'Too short'),
  cif: string()
    .required()
    .length(9, 'Must be 9 digits long')
    .uppercase()
    .matches(/^[A-Z][0-9]*$/, 'CIF aformat doesn\'t match'),
  street: string()
    .required()
    .min(2, 'Too short'),
  streetNum: number()
    // .required()
    .positive()
    .integer(),
  postalCode: number()
    .required()
    .positive()
    .integer(),
  country: string()
    .required()
    .min(2, 'Too short'),
  items: array()
    .compact()
    .of(
      object()
        .shape({
          items: string()
            .matches(/^[A-Za-z0-9]$/)
            .min(2, 'Too short')
            .max(255),
          units: number()
            .positive('Positive number'),
          priceUnit: number(),
        }),
    ),
};

export const loginSchema = object({
  username: string()
    .required()
    .min(2, 'Too short'),
  password: string()
    .required(),
});

export const signupSchema = object({
  username: string()
    .required()
    .min(2, 'Too short'),
  password: string()
    .required()
    .length(8, 'Must be 8 digits long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&@!#%^$*]).{8,}$/,
      'Must have an uppercase letter, a lowercase letter, a number and a special symbol'
    ),
});
