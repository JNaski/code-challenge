# Caesar cipher and language detection

This is a small "project" made for a coding challenge by Solidabis
* https://koodihaaste.solidabis.com

If you read this after 2019 the page might not contain same information as during the challenge

> npm install
>
> npm start

to install and start the program


This project is only frontend code to keep it simple.
Usually the api call to fetch the sentences and language profile calculations would be done in the backend.
And because we don't have a backend we need to use https://cors-anywhere.herokuapp.com to get around
the cors errors we would otherwise have when fetching the data from the API.

The code first gets sentences from an API and those sentences are encrypted using Caesar cipher.
Then the code starts to decode the sentences by going through all the keys and it stops when it detects that
the decoded sentence is Finnish.

The language of the sentence is checked by calculating ngrams from the sentence and comparing it to the
base material found in profile.json file. This profile is constructed with the same method, using random
Finnish sentences.