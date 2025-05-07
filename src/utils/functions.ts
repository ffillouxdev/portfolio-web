export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')                     // enlève les accents
      .replace(/[\u0300-\u036f]/g, '')     // supprime les marques diacritiques
      .replace(/[^a-z0-9 ]/g, '')          // enlève tout sauf lettres, chiffres et espaces
      .replace(/\s+/g, '-')                // remplace les espaces par des tirets
      .replace(/-+/g, '-')                 // évite les tirets multiples
      .replace(/^-+|-+$/g, '');            // supprime les tirets en début/fin
  }
  