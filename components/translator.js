const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const americanOnlyArr = Object.entries(americanOnly);
const americanToBritishArr = Object.entries(americanToBritishSpelling);
const americanToBritishTitlesArr = Object.entries(americanToBritishTitles);
const britishOnlyArr = Object.entries(britishOnly);
const span = '<span class="highlight">';
const _span = '</span>';


class Translator {

    americanToBritish(text) {
        let punctuation;
        const replacements = americanOnlyArr.concat(americanToBritishArr).flat();
        const titles = americanToBritishTitlesArr.flat();
        const textArray = text.split(' ');

        if (/[.|?]{1}$/.test(textArray[textArray.length - 1])) {
            let lastWord = textArray.pop();
            let word = lastWord.split('');
            let last = word.pop();
            word = word.join('');
            textArray.push(word);
            punctuation = last;
        };

        for (let i = 0; i < textArray.length; i++) {
            if (/\d{1,2}[:]{1}\d{1,2}/.test(textArray[i])) { textArray[i] = span + textArray[i].split(':').join('.') + _span };
            if (titles.includes(textArray[i].toLowerCase())) {
                let index = titles.findIndex((element) => element === textArray[i].toLowerCase());
                if (index % 2 === 0) { 
                    let newTitle = titles[index + 1].charAt(0).toUpperCase() + titles[index + 1].slice(1);
                    textArray[i] = span + newTitle + _span;
                };
            };
        };

        for (let i = 0; i < textArray.length; i++) {
            let doubleEntry = textArray.slice(i, i + 2).join(' ').toLowerCase();
            let tripleEntry = textArray.slice(i, i + 3).join(' ').toLowerCase();
            if (replacements.includes(textArray[i].toLowerCase())) {
                let index = replacements.findIndex((element) => { return element === textArray[i] });
                if (index % 2 === 0) { textArray[i] = span + replacements[index + 1] + _span };
            };
            if (replacements.includes(doubleEntry)) {
                let index = replacements.findIndex((element) => { return element === doubleEntry });
                if (index % 2 === 0) { textArray.splice(i, 2, span + replacements[index + 1] + _span) };
            }; 
            if (replacements.includes(tripleEntry)) {
                let index = replacements.findIndex((element) => { return element === tripleEntry });
                if (index % 2 === 0) { textArray.splice(i, 3, span + replacements[index + 1] + _span) };
            }; 
        };

        let result = textArray.join(' ');
        if (punctuation) { result = result + punctuation};
        return result;
    };

    britishToAmerican(text) {
        const british = [];
        let punctuation;

        for (let i = 0; i < britishOnlyArr.length; i++) { british.push(britishOnlyArr[i].toReversed()) };

        const titles = americanToBritishTitlesArr.flat();
        const replacements = british.concat(americanToBritishArr, americanToBritishTitlesArr).flat();
        const textArray = text.split(' ');

        if(/[.|?]{1}$/.test(textArray[textArray.length - 1])) {
            let lastWord = textArray.pop();
            let word = lastWord.split('');
            let last = word.pop();
            word = word.join('');
            textArray.push(word);
            punctuation = last;
        };
        

        for (let i = 0; i < textArray.length; i++) {
            if (/\d{1,2}[.]{1}\d{1,2}/.test(textArray[i])) { textArray[i] = span + textArray[i].split('.').join(':') + _span };
            if (titles.includes(textArray[i].toLowerCase())) {
                let index = titles.findIndex((element) => element === textArray[i].toLowerCase());
                if (index % 2 === 1) { 
                    let newTitle = titles[index - 1].charAt(0).toLocaleUpperCase() + titles[index - 1].slice(1);
                    console.log(newTitle);
                    textArray[i] = span + newTitle + _span
                };
            };
        };

        for (let i = 0; i < textArray.length; i++) {
            let doubleEntry = textArray.slice(i, i + 2).join(' ').toLowerCase();
            let tripleEntry = textArray.slice(i, i + 3).join(' ').toLowerCase();
            if (replacements.includes(textArray[i].toLowerCase())) { 
                let index = replacements.findIndex((element) => { return element === textArray[i].toLowerCase()});
                if (index % 2 === 1) { textArray[i] = span + replacements[index - 1] + _span };
            };
            if (replacements.includes(doubleEntry)) {
                let index = replacements.findIndex((element) => { return element === doubleEntry });
                if (index % 2 === 1) { textArray.splice(i, 2, span + replacements[index - 1] + _span) };
            }; 
            if (replacements.includes(tripleEntry)) {
                let index = replacements.findIndex((element) => { return element === tripleEntry });
                if (index % 2 === 1) { textArray.splice(i, 3, span + replacements[index - 1] + _span) };
            }; 
        };

        let result = textArray.join(' ');
        if (punctuation) { result = result + punctuation};
        return result;
    };
};

module.exports = Translator;