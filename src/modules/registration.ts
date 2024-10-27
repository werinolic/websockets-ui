

interface RegistrationData {
  name: string;
  password: string;
}

const isRegData = (x: any): x is  RegistrationData=> {
  return (
    typeof x.name  === 'string' &&
    typeof x.password === 'string'
  );

}

export const registration = (stringData: string) => {
  const data: any = JSON.parse(stringData);

  if(isRegData(data)) {
    return {
      name: 'test',
      index: 1,
      error: false,
      errorText: '',
    }
  }
}