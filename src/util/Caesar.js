import { generateNgramProfile } from '../util/Ngram';
import languageProfile from '../resource/profile.json';

const alphabet = ['a', 'b', 'c', 'd', 'e',
                  'f', 'g', 'h', 'i', 'j',
                  'k', 'l', 'm', 'n', 'o',
                  'p', 'q', 'r', 's', 't',
                  'u', 'v', 'w', 'x', 'y',
                  'z', 'å', 'ä', 'ö'];
const NOT_FOUND = 5000;
var scores = [];

const handleSentence = (sentence, key) => {
  let str = sentence.toLowerCase();
  let resp = '';
  for(let i = 0; i < str.length; i++) {
    let id = alphabet.indexOf(str[i]);
    if(id >= 0) {
      let shift = id-key;
      if(shift < 0) {
        shift = 29 + shift;
      }
      resp += alphabet[shift];
    } else {
      resp += ' ';
    }
  }

  if(isFinnish(resp)) {
    return resp;
  } else {
    if(key <= 27){
      return handleSentence(sentence, key+1);
    } else {
      return '';
    }
  }
}

const isFinnish = (str) => {
  let prof = generateNgramProfile(str);
  let count = 0;
  prof.forEach(function(documentNgram){
      var documentIndex = documentNgram.id;
      var languages = Object.keys(languageProfile);

      languages.forEach(function(language){
        var languageProf = languageProfile[language];
        var languageNgram = languageProf.filter(function(languageNgram){
          return languageNgram.ngram === documentNgram.ngram;
        });
        if (languageNgram.length === 1){
          // We found the ngram so we compute the out of place measure to the score.
          count += Math.abs(languageNgram[0].id - documentIndex);
        } else {
          // We did not find the ngram add the not found score.
          count += NOT_FOUND;
        }
        scores[language] = count;
      });
  });
  // The value here is configured with few tests and outputs of scores
  if(scores['fin'] < 90000) {
    return true;
  } else {
    return false;
  }
}

export const caesarDecode = (input) => {
  let resp = handleSentence(input, 1);
  return resp;
}