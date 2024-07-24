import { useState } from 'react';

type RegisterInformation = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const [registerInfo, setRegisterInfo] = useState<RegisterInformation>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterInfo({ ...registerInfo, firstName: event.target.value });
};

const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterInfo({ ...registerInfo, lastName: event.target.value });
};

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterInfo({ ...registerInfo, email: event.target.value });
};

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterInfo({ ...registerInfo, password: event.target.value });
};