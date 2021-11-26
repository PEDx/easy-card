export function getStaticUrl(name: string) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
