// Emails de la familia con permiso para entrar a la app.
// Agregá acá el Gmail de cada integrante que va a usarla.
export const ALLOWED_EMAILS: string[] = [
  "mballestero.mail@gmail.com",
  "soledadcalvo.13@gmail.com",
  "mirandaballestero21@gmail.com",
];

// Emails que pueden editar (tildar, anotar, modificar textos y cargar
// gastos). El resto de ALLOWED_EMAILS entra pero solo puede mirar.
export const ADMIN_EMAILS: string[] = [
  "mballestero.mail@gmail.com",
  "soledadcalvo.13@gmail.com",
];

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ALLOWED_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}
