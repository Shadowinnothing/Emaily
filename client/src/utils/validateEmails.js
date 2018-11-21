// regex to test for valid emails
// the regex i got online throws 2 warnings for unnecessary escape characters
// i have no idea what '\' chars are unnecessary so i disabled the warning below
// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// recieves string of emails
// need to be seperated by ','
export default (emails) => {
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  .filter(email => !emailRegex.test(email)); // <- returns invalid emails

  if(invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`;
  }

  return; // works just like return null
};
