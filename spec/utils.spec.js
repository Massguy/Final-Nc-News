const { expect } = require('chai');
const {
  formattingArticleDateTimeStamp,
  formattingComments,
  createRef,
} = require('../db/utils/index.js');

describe('createRef', () => {
  it('returns object', () => {
    expect(createRef([{}])).to.be.an('object');
  });
  it('returns object with key of article title', () => {
    const insert = [{ title: 'text', article_id: 1 }];
    expect(createRef(insert)).to.eql({ text: 1 });
  });
  it('returns object with key of article title and value of article_id', () => {
    const insert = [{ title: 'text', article_id: 1 }, { title: 'word', article_id: 2 }];
    expect(createRef(insert)).to.eql({ text: 1, word: 2 });
  });
});

describe('formatArticles', () => {
  it('returns an array', () => {
    expect(formattingArticleDateTimeStamp([])).to.be.an('array');
  });
  it('returns object with keys title, topic, author, body, created_at, votes, article_id', () => {
    const insert = [{
      title: '1', topic: '2', author: '2', body: '4', created_at: 'e', votes: 'f', article_id: 1,
    }];
    expect(formattingArticleDateTimeStamp(insert)[0]).to.have.all.keys('title', 'topic', 'author', 'body', 'created_at', 'votes', 'article_id');
  });
  it('created_at value is an instance of date/time', () => {
    const insert = [{
      title: 'a', topic: 'b', author: 'c', body: 'd', created_at: 1542284514171, votes: 'e', article_id: 1,
    }];
    expect(formattingArticleDateTimeStamp(insert)[0].created_at).to.be.instanceOf(Date);
  });
});

describe('formatComments', () => {
  it('GET:200 returns array', () => {
    expect(formattingComments([], [])).to.be.an('array');
  });
  it('GET:200 returns array with keys comment_id, author, article_id, votes, created_at, body', () => {
    const insert = [{
      comment_id: 1, author: 2, article_id: 3, votes: 4, created_at: 5, body: 6, belong_to: 1,
    }];
    const nextInsert = [{ 1: 'a' }];
    expect(formattingComments(insert, nextInsert)).to.be.an('array');
    expect(formattingComments(insert, nextInsert)[0]).to.have.all.keys(
      'comment_id',
      'author',
      'article_id',
      'votes',
      'created_at',
      'body',
    );
    expect(formattingComments(insert, nextInsert)[0].created_at).to.be.an.instanceOf(Date);
  });
});
