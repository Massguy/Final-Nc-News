/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  describe('/api', () => {
    beforeEach(() => connection.seed.run());

    after(() => connection.destroy());
    describe('/topics', () => {
      it('INVALID METHOD:405', () => request
        .patch('/api/topics')
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal('Method Not Allowed!');
        }));
      it('GET STATUS :200 responds with an array of topic objects with slug and description properties', () => request
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0]).to.contain.keys(
            'slug',
            'description',
          );
          expect(res.body.topics).to.have.lengthOf(2);
        }));
      it('ERR STATUS:404 if incorrect path used', () => request
        .get('/api/topic')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Route not found');
        }));
      it('ERR STATUS:404 if incorrect path used', () => request
        .get('/api/topics/tech')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Route not found');
        }));
      it('POST STATUS:201 accepts an object containing slug and description properties', () => request.post('/api/topics')
        .send({ description: '100 pushups,100 situps,10km run', slug: 'saitama' })
        .expect(201)
        .then((res) => {
          expect(res.body).to.eql({
            topic:
              { description: '100 pushups,100 situps,10km run', slug: 'saitama' },
          });
        }));
      it('ERR STATUS:400 if topic doesnt have slug', () => request
        .post('/api/topics')
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Please fill all required fields with correct data');
        }));
      it('ERR STATUS:422 if topic slug exists', () => {
        const input = {
          slug: 'cats',
          description: 'Mr.Tiddles',
        };
        return request
          .post('/api/topics')
          .send(input)
          .expect(422)
          .then((res) => {
            expect(res.body.msg).to.equal('Input Incorrect');
          });
      });
    });
    describe('/articles', () => {
      it('GET STATUS :200 responds with an array of articles limited to 10 (DEFAULT)', () => request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
        }));
      it('GET STATUS :200 responds with an array of articles limited to 5, (QUERY)', () => request
        .get('/api/articles?limit=5')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles).to.have.length(5);
        }));
      it('GET STATUS :200 responds with an array of articles sorted by title (DEFAULT_CASE)', () => request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].topic).to.equal('mitch');
        }));
      it('GET STATUS :200 responds with an array of articles sorted by date (created_at) (QUERY)', () => request
        .get('/api/articles?sort_by=created_at')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].created_at).to.equal(
            '2018-11-15T12:21:54.171Z',
          );
        }));
      it('GET STATUS :200 responds with an array of articles sorted by order (DEFAULT CASE = DESC)', () => request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].title).to.equal(
            'Living in the shadow of a great man',
          );
        }));
      it('GET STATUS :200 responds with an array of articles sorted by order (QUERY = ASC)', () => request
        .get('/api/articles?order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].title).to.equal('Moustache');
        }));
      it('GET STATUS :200 responds with an array of articles by author', () => request
        .get('/api/articles?author=icellusedkars')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].topic).to.equal('mitch');
        }));
      it('GET STATUS :200 responds with an array of articles by topic', () => request
        .get('/api/articles?topic=cats')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('rogersop');
        }));
      it('GET STATUS :200 responds with an array of articles by topic and author', () => request
        .get('/api/articles?topic=mitch&author=icellusedkars')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('icellusedkars');
          expect(res.body.articles[0].topic).to.equal('mitch');
        }));
      it('GET STATUS :200 responds with an array of articles by topic and author', () => request
        .get('/api/articles?topic=cats&author=rogersop')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('rogersop');
          expect(res.body.articles[0].topic).to.equal('cats');
        }));
      it('GET STATUS :200 responds with an array of articles on page 2 (QUERY = 2)', () => request
        .get('/api/articles?p=2')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('icellusedkars');
        }));
      it('POST STATUS:201 returns inserted obj with title, body, topic, author', () => {
        const article = {
          title: 'a',
          body: 'a',
          topic: 'cats',
          author: 'rogersop',
        };
        return request
          .post('/api/articles')
          .send(article)
          .expect(201)
          .then((res) => {
            expect(res.body.article).to.have.all.keys(
              'title', 'body', 'author', 'topic', 'article_id', 'votes', 'created_at',
            );
          });
      });
      describe('/:article_id', () => {
        it('GET STATUS:200responds with an array of article objects with author,username,title,body,article_id,topic,created_at,votes,comment_count properties', () => request
          .get('/api/articles/11')
          .expect(200)
          .then((res) => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article).to.eql({
              article_id: 11,
              title: 'Am I a cat?',
              body:
                'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
              votes: 0,
              topic: 'mitch',
              author: 'icellusedkars',
              created_at: '1978-11-25T12:21:54.171Z',
            });
          }));
        it('ERR STATUS:404 if article id doesnt exist', () => request
          .get('/api/articles/100')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Route not found');
          }));
        it('ERR STATUS:400 if article id isnt integer', () => request
          .get('/api/articles/a')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Please fill all required fields with correct data');
          }));
        it('PATCH STATUS:200 returns unchanged article if passed inc votes with no body', () => request
          .patch('/api/articles/1')
          .send({})
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).to.equal(100);
          }));
        it('PATCH STATUS :202 responds with article vote updated and incremented by 1', () => request
          .patch('/api/articles/11')
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            expect(res.body.article).to.eql({
              article_id: 11,
              title: 'Am I a cat?',
              body:
                'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
              votes: 1,
              topic: 'mitch',
              author: 'icellusedkars',
              created_at: '1978-11-25T12:21:54.171Z',
            });
          }));
        it('PATCH STATUS:200 updates negative votes using obj with inc_votes key if votes go below 0', () => {
          const updateVotes = { inc_votes: -101 };
          return request
            .patch('/api/articles/1')
            .send(updateVotes)
            .expect(200)
            .then((res) => {
              expect(res.body.article.votes).to.equal(-1);
            });
        });
        it('PATCH STATUS:200 returns unchanged article if inc votes is not valid', () => {
          const updateVotes = { inc_votes: 'a' };
          return request
            .patch('/api/articles/1')
            .send(updateVotes)
            .expect(200)
            .then((res) => {
              expect(res.body.article.votes).to.equal(100);
            });
        });
        it('DELETE STATUS :204 removes the article by its id', () => request
          .delete('/api/articles/11')
          .expect(204));
        it('ERR STATUS:404', () => request
          .delete('/api/articles/69')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Sorry, article not found...');
          }));
        it('ERR STATUS:400', () => request
          .delete('/api/articles/hsdga')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Please fill all required fields with correct data');
          }));
        describe('/comments', () => {
          it('GET STATUS :200 an array of comments for the given `article_id` of which each comment will have comment_id,votes,created_at,author,body properties', () => request
            .get('/api/articles/1/comments')
            .expect(200)
            .then((res) => {
              expect(res.body.comments).to.be.an('array');
              expect(res.body.comments[0]).to.contain.keys(
                'comment_id',
                'votes',
                'created_at',
                'author',
                'body',
              );
            }));
          it('ERR STATUS:404 if article id does not exist', () => request
            .get('/api/articles/100/comments')
            .expect(404)
            .then((res) => {
              expect(res.body.msg).to.equal('Route not found');
            }));
          it('ERR STATUS:400 if article id is invalid', () => request
            .get('/api/articles/kjbkjb/comments')
            .expect(400)
            .then((res) => {
              expect(res.body.msg).to.equal('Please fill all required fields with correct data');
            }));
          it('POST STATUS :201 an object with the username and body properties', () => request.post('/api/articles/2/comments')
            .send({ body: '100 pushups,100 situps,10km run', username: 'icellusedkars' })
            // .expect(201)
            .then((res) => {
              expect(res.body.comment).to.contain.keys(
                'body',
                'author',
                'article_id',
                'created_at',
                'comment_id',
                'votes',
              );
            }));
          it('ERR STATUS:400 if not given correct fields', () => request
            .post('/api/articles/1/comments')
            .send({ author: 'rogersop' })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).to.equal('Please fill all required fields with correct data');
            }));
        });
      });
    });
    describe('/comments', () => {
      it('PATCH STATUS :202 responds with comment vote updated and incremented by 1', () => request
        .patch('/api/comments/1')
        .send({ inc_votes: 1 })
        .expect(200)
        .then((res) => {
          expect(res.body.comment).to.eql({
            article_id: 9,
            comment_id: 1,
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 17,
            author: 'butter_bridge',
            created_at: '2017-11-22T12:36:03.389Z',
          });
        }));
      it('PATCH STATUS:200 returns comment if inc votes has no body', () => request
        .patch('/api/comments/1')
        .send({})
        .expect(200)
        .then((res) => {
          expect(res.body.comment.votes).to.equal(16);
        }));
      it('ERR STATUS:404 if comment id doesnt exist', () => request
        .patch('/api/comments/232')
        .send({ inc_votes: 1 })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Route not found');
        }));
      it('ERR STATUS:400 if comment is invalid', () => {
        const input = ({ inc_votes: 1 });
        return request
          .patch('/api/comments/a')
          .send(input)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Please fill all required fields with correct data');
          });
      });
      it('ERR STATUS:400 if votes is invalid', () => {
        const input = ({ inc_votes: 'a' });
        return request
          .patch('/api/comments/a')
          .send(input)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Please fill all required fields with correct data');
          });
      });
      it('DELETE STATUS:204', () => request
        .delete('/api/comments/1')
        .expect(204));
      it('ERR STATUS:404 if comment id doesnt exist', () => request
        .delete('/api/comments/100')
        .expect(404)
        .then(res => expect(res.body.msg).to.equal('Route not found')));
    });
    describe('/users', () => {
      it('GET STATUS:200 responds with an array of user objects with username,avatar_url and name properties', () => request
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0]).to.contain.keys(
            'username',
            'avatar_url',
          );
        }));
      it('POST STATUS:201 accepts an object containing username,avatar_url and name properties', () => request.post('/api/users')
        .send({ name: '100 pushups,100 situps,10km run', username: 'saitama', avatar_url: 'onepunch' })
        .expect(201)
        .then((res) => {
          expect(res.body).to.eql({
            users:
              { name: '100 pushups,100 situps,10km run', username: 'saitama', avatar_url: 'onepunch' },
          });
        }));
      it('ERR STATUS:400 if not all fields are given', () => {
        const input = { avatar_url: 'test', name: 'a' };
        return request
          .post('/api/users')
          .send(input)
          .expect(400)
          .then(res => expect(res.body.msg).to.equal('Please fill all required fields with correct data'));
      });
      describe('/:username', () => {
        it('GET STATUS:200 responds with an object  with name,username,avatar_url properties', () => request
          .get('/api/users/butter_bridge')
          .expect(200)
          .then((res) => {
            expect(res.body.user).to.be.an('object');
            expect(res.body.user).to.eql({
              username: 'butter_bridge',
              name: 'jonny',
              avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            });
          }));
        it('ERR STATUS:404 if username does not exist', () => request
          .get('/api/users/a')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Sorry, User Not Found');
          }));
      });
    });
  });
});
