import { AuthErrorCodes } from '@firebase/auth';

const getAuthErrorMessageFromCode = (code: string) => {
  console.log('auth error: ', code);
  const preText = 'Error: ';
  switch (code) {
    case AuthErrorCodes.USER_DELETED:
      return preText + 'User Not Found.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return preText + 'Wrong Password.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return preText + 'Email Already Exists.';
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return preText + 'Too Many Requests. Please Try Again Later.';
    default:
      return preText + ' Unknown error';
  }
};

export default getAuthErrorMessageFromCode;
