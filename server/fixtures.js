// Cleanup collections
Word.remove({});
Phrase.remove({});

// Insert words
Word.insert({ type: 'object', romaji: 'ringo', kana: ['りんご'] });

Word.insert({ type: 'place', romaji: 'table', kana: ['テーブル'] });

Word.insert({ type: 'pointer', romaji: 'this', kana: ['これ'] });
Word.insert({ type: 'pointer', romaji: 'that', kana: ['それ', 'あれ'] });

Word.insert({ type: 'pointer-object', romaji: 'this', kana: ['この'] });
Word.insert({ type: 'pointer-object', romaji: 'that', kana: ['その', 'あの'] });

// Insert phrases
Phrase.insert({
  romaji: '{{pointer-object}}{{object}}, please.',
  kana: '{{pointer-object}}{{object}}、ください。'
});

Phrase.insert({
  romaji: '{{pointer}} wa {{object}}　desu.',
  kana: '{{pointer}}は{{object}}です.'
});