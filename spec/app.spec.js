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
        expect(res.body.article).to.be.an('array');
        expect(res.body.article[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
  });
});
