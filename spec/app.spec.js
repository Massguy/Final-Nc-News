process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

// describe('/', () => {
//   beforeEach(() => connection.seed.run());

//   after(() => connection.destroy());
//   describe('/bad-route', () => {
//     it('status 404', () => {
//       return request.get('/bad-route')
//       .expect(404)
//       .then({body}) => {
//         it('405', () => {
//           return request.patch('/api/articles')
//             .expect(405)
//             .then({ body }) => {
//       }
//     });
//   });
// });

describe('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET status:200 responds with an array of topic objects with slug and description properties', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics[0]).to.contain.keys(
          'slug',
          'description',
        );
      }));
    it('POST status:201 accepts an object containing slug and description properties', () => request.post('/api/topics')
      .send({ description: '100 pushups,100 situps,10km run', slug: 'saitama' })
      .expect(201)
      .then((res) => {
        expect(res.body).to.eql({
          topic:
            { description: '100 pushups,100 situps,10km run', slug: 'saitama' },
        });
      }));
  });
  describe('/articles', () => {
    it('GET status:200 responds with an array of article objects with author,username,title,article_id,topic,created_at,votes,comment_count properties', () => request
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('accepts author query', () => request
      .get('/api/articles?author=butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].author).to.equal('butter_bridge');
      }));
    it('accepts topic query', () => request
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].topic).to.equal('mitch');
      }));
    it('accepts sort_by query', () => request
      .get('/api/articles?sort_by=article_id')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[1].article_id).to.equal(11);
      }));
    it('accepts order query', () => request
      .get('/api/articles?article_id/order=desc')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(12);
      }));
  });
});
