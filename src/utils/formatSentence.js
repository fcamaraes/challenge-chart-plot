export default function formatSentence(sentence) {
  const wordArray = sentence.replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return wordArray;
}
