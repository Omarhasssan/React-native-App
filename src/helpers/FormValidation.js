import { DBHelpers } from '../helpers';
/*eslint-disable */

export function validateSignUpForm(user) {
  const { name, password, mobilenumber } = user;

  return new Promise((resolve, reject) => {
    return DBHelpers.findByName(name)
      .then(() => reject('user exists before'))
      .catch(() => {
        if (password.length < 2) return reject('password should be at least 4 digits digits');
        if (mobilenumber.length < 2 || isNaN(mobilenumber)) {
          return reject('mobile number should be 12 digits');
        }
        return resolve('valid');
      });
  });
}
