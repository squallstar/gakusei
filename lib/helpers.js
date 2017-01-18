// Removes html tags, parenthesis and their content (e.g. furigana)
// and returns all to lowercase
cleanupSentence = function (str) {
  return str.replace(/(\([^(]+\))|(<([^>]+)>)|[\.,。]/ig, '').toLowerCase();
}