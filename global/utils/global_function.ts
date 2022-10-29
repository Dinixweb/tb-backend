export function generateToken() {
  return crypto.randomUUID().toString();
}
