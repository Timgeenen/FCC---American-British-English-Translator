'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      let translation;

      if (text === undefined) {return res.send({ error: 'Required field(s) missing' } )};
      if (text === '') {return res.send({ error: 'No text to translate' } )};
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {return res.send({  error: 'Invalid value for locale field' } )};

      if (locale === 'american-to-british') { translation = translator.americanToBritish(text) }
      else if (locale === 'british-to-american') { translation = translator.britishToAmerican(text);};

      if(text === translation) { translation = "Everything looks good to me!" };
      res.send({ text: text, translation: translation });
    });
};
