export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D+/g, ''); // Remove tudo que não é dígito

  if (cpf.length !== 11) return false; // Verifica se o CPF tem 11 caracteres

  let sum = 0;
  let weight = 10;

  // Calcula o primeiro dígito verificador
  for (let n = 0; n < 9; n++) {
    sum += parseInt(cpf.charAt(n)) * weight;
    weight--;
  }

  let verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (parseInt(cpf.charAt(9)) !== verifyingDigit) return false;

  // Calcula o segundo dígito verificador
  sum = 0;
  weight = 11;
  for (let n = 0; n < 10; n++) {
    sum += parseInt(cpf.charAt(n)) * weight;
    weight--;
  }

  verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (parseInt(cpf.charAt(10)) !== verifyingDigit) return false;

  return true;
}
