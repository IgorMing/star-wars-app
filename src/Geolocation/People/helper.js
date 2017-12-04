const KNOWN_JEDI_NAMES = [
  'Skywalker',
  'Qui-Gon Jinn',
  'Ayla Secura',
  'Mace Windu'
];

export function isJedi(name) {
  return Boolean(
    KNOWN_JEDI_NAMES.find(
      (jediName) => name.toLowerCase().contains(jediName.toLowerCase())
    )
  );
}
