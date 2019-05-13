import dotenv from 'dotenv';

dotenv.config();

const checkName = new RegExp(process.env.REGEXP_NAME);
const checkEmail = new RegExp(process.env.REGEXP_EMAIL);

export const validUser = async ({
  firstName,
  lastName,
  email,
  organizationName,
}) => {
  const validFirstName = checkName.test(firstName);
  const validLastName = checkName.test(lastName);
  const validEmail = checkEmail.test(email);
  const validOrganizationName = checkName.test(organizationName);

  const itemsName = [
    { label: 'Имя', valid: validFirstName },
    { label: 'Фаимлия', valid: validLastName },
    { label: 'email', valid: validEmail },
    { label: 'Имя организации', valid: validOrganizationName },
  ];

  if (itemsName.every(item => item.valid)) {
    return {
      success: true,
      message: 'OK',
    };
  } else {
    const message =
      'Данные неверны: ' +
      itemsName
        .filter(item => !item.valid)
        .map(item => item.label)
        .join(', ');
    return {
      success: false,
      message,
    };
  }
};
