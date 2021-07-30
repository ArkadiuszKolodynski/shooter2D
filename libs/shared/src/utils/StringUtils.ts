export function capitalize(stringToCapitalize: string): string {
  return `${stringToCapitalize[0].toUpperCase()}${stringToCapitalize.slice(1)}`;
}
