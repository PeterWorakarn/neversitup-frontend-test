const tokenName = 'neversitup-token';
export const authTokenHandler = {
 get: (): string | null => {
  return localStorage.getItem(tokenName);
 },
 set: (value: string) => {
  return localStorage.setItem(tokenName, value)
 },
 clear: () => {
  return localStorage.removeItem(tokenName);
 }
};