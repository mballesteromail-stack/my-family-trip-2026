// Emails de la familia con permiso para entrar a la app.
// Agregá acá el Gmail de cada integrante que va a usarla.
export const ALLOWED_EMAILS: string[] = [
  "mballestero.mail@gmail.com",
  "soledadcalvo.13@gmail.com",
  "mirandaballestero21@gmail.com",
];

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ALLOWED_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}
