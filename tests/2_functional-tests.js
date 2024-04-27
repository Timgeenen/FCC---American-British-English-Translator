const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translate = new Translator();

suite('Functional Tests', () => {

    suite('Integration tests with chai-http', () => {

        test('Translation with text and locale fields: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: 'Ms. scuttlebutt had to make a pre-authorized payment to rappel down the rowhouse.',
                    locale: 'american-to-british'
                })
                .end((err, res) => {

                    assert.equal(res.status, 200);
                    assert.equal(res.body.text, 'Ms. scuttlebutt had to make a pre-authorized payment to rappel down the rowhouse.');
                    assert.equal(res.body.translation, '<span class="highlight">Ms</span> <span class="highlight">rumour</span> had to make a <span class="highlight">direct debit</span> to <span class="highlight">abseil</span> down the <span class="highlight">terraced house</span>.')
                    done();
                });
        });

        test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: 'Ms. scuttlebutt had to make a pre-authorized payment to rappel down the rowhouse.',
                    locale: 'Invalid'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });

        test('Translation with missing text field: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ locale: 'british-to-american' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Translation with missing locale field: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: 'Ms. scuttlebutt had to make a pre-authorized payment to rappel down the rowhouse.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field')
                    done();
                });
        });

        test('Translation with empty text: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                });
        });

        test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({
                    text: 'Ms. scuttlebutt had to make a pre-authorized payment to rappel down the rowhouse.',
                    locale: 'british-to-american'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, 'Everything looks good to me!')
                    done();
                });
        });

    });

});
