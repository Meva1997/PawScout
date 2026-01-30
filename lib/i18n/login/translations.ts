export function translateBackendError(error: string, lang: string = "en"): string {
  const translations: Record<string, { en: string; "es-mx": string }> = {
    "User not found": {
      en: "User not found",
      "es-mx": "Usuario no encontrado",
    },
    "Invalid email or password": {
      en: "Invalid email or password",
      "es-mx": "Correo o contraseña incorrectos",
    },
    "Email already registered": {
      en: "Email already registered",
      "es-mx": "El correo ya está registrado",
    },
    "Email and password cannot be empty": {
      en: "Email and password cannot be empty",
      "es-mx": "El correo y la contraseña no pueden estar vacíos",
    },
  };

  const translation = translations[error];
  
  if (translation) {
    return translation[lang as "en" | "es-mx"] || translation.en;
  }

  // If no translation found, return the original error
  return error;
}
