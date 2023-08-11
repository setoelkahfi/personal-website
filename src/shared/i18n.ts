export const defaultLang = "en";

export const supportedLangs = {
  en: "English",
  id: "Indonesian",
};

export function determineUserLang(acceptedLangs: string[]) {

  const acceptedLangCodes = acceptedLangs.map(stripCountry);

  const supportedLangCodes = Object.keys(supportedLangs);

  const matchingLangCode = acceptedLangCodes.find(code =>

    supportedLangCodes.includes(code),

  );

  return matchingLangCode || defaultLang;

}

function stripCountry(lang: string) {
  return lang

    .trim()

    .replace("_", "-")

    .split("-")[0];

}