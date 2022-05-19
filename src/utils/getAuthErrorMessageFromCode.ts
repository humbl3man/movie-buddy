import { AuthErrorCodes } from '@firebase/auth';

const getAuthErrorMessageFromCode = (code: string) => {
  switch (code) {
    case AuthErrorCodes.USER_DELETED:
      return 'Authentication Error: User Not Found.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Authentication Error: Wrong Password.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Authentication Error: Email Already Exists.';
    default:
      return 'Authentication Error: Unknown';
  }
};

export default getAuthErrorMessageFromCode;
