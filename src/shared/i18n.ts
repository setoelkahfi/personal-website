export const defaultLang = "en";

interface Lang {
  code: string;
  name: string;
}

export const supportedLangs: Lang[] = [
  { code: "en", name: "🇺🇸 English" },
  { code: "id", name: "🇮🇩 Indonesian" },
  { code: "se", name: "🇸🇪 Swedish" },
  { code: "de", name: "🇩🇪 German" },
  { code: "fr", name: "🇫🇷 French" },
  { code: "zh", name: "🇨🇳 Chinese" },
  { code: "es", name: "🇪🇸 Spanish" },
  { code: "ja", name: "🇯🇵 Japanese" },
];

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