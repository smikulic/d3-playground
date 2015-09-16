var request = require('request'),    
    cheerio = require('cheerio'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000'
    topicsApi = 'http://localhost:25000/api/topics';
 
describe('App', function () {
    it('should load properly', function (done) {
        request(baseUrl, function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);
 
            var $ = cheerio.load(body);
            var app = $('div#app').html();
            expect(app).to.be.equal('');
            done();
        });
    });
    it('should load topics API service properly', function (done) {
        request(topicsApi, function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);
 
            done();
        });
    });
});