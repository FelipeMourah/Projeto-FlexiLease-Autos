import { generateToken } from '../../jwtUtils';
const userId = 'FelipeSantos';

const token = generateToken({ userId });

console.log(token);
