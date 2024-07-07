export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D+/g, '');
  if (cpf.length !== 11) return false;

  let sum = 0;
  let weight = 10;

  for (let n = 0; n < 9; n++) {
    sum = sum + parseInt(cpf.charAt(n)) * weight;
    weight = weight - 1;
  }

  let verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (parseInt(cpf.charAt(9)) != verifyingDigit) return false;

  sum = 0;
  weight = 11;
  for (let n = 0; n < 10; n++) {
    sum = sum + parseInt(cpf.charAt(n)) * weight;
    weight = weight - 1;
  }

  verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (parseInt(cpf.charAt(10)) != verifyingDigit) return false;

  return true;
}
