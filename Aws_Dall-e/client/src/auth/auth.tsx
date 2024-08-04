import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: '',
        userPoolId: '',
      }
    }
  });
