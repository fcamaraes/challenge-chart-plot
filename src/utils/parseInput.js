const isJSON = (str) => {
  try {
    return (JSON.parse(str));
  } catch (e) {
    return false;
  }
};

export default function parseInput(input) {
  if (!input) {
    return false;
  }
  const regexForDoubleQuotingKeys = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;
  const regexInsideCurlyBrackets = /[^{\}]+(?=})/gi;
  const newQuotedKeysString = input.replace(regexForDoubleQuotingKeys, '$1"$2":');
  const formattedInput = newQuotedKeysString.replace(/'/g, '"');
  const extractParams = formattedInput.match(regexInsideCurlyBrackets);

  if (!extractParams) {
    return false;
  }
  const sanitized = extractParams.map((param) => `{${param}}`);
  const itemsArray = sanitized.map((element) => isJSON(element));

  return itemsArray;
}
