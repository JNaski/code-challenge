
function ngramSort(ngrams) {
  return Object.keys(ngrams).map(function(key) {
    return {'ngram': key, 'freq': ngrams[key]};
  }).sort(function(first, second) {
    return second['freq'] - first['freq'];
  }).map(function(ngram, id) {
    ngram['id'] = id;
    return ngram;
  });
}

function merge(obj1, obj2) {
  var obj3 = {};
  for(var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for(var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
  return obj3;
}

function getNgrams(str, n) {
  var ngrams = {};
  var text = str
    //Replace . and any amount of whitespaces after it
    .replace(/\.\s*/g, '')
    // Remove numbers.
    .replace(/[0-9]/g, "")
    //Remove special characters.
    .replace(/[&/\\#,+\-()$€~%.":*!?<>{}]/g,'')
    // Remove spaces.
    .replace(/\s*/g, '')
    .toLowerCase();
    for(var i = 0; i < text.length - (n-1); i++){
      var token = text.substring(i, i + n);
      if (token in ngrams) {
        ngrams[token] += 1;
      } else {
        ngrams[token] = 1;
      }
    }
    return ngrams;
}

export const generateNgramProfile = (text, topN) => {
	var biGrams = getNgrams(text, 2);
	var triGrams = getNgrams(text, 3);
	var ngrams = merge(biGrams, triGrams);
	var sortedNgrams = ngramSort(ngrams);
	return sortedNgrams.slice(0, topN);
}