<h1>Backend NC-Knews</h1>

This back-end project is the API for the North Coders NC-news sprint. The database used for this project was PSQL and knex was used to interact with it. It has articles comments and users.


<h3>Things You Need To Install</h3>


<ul>
<li>chai: 4.2 npm i chai</li>
<li>express: 4.16 npm i express</li>
<li>knex: 0.19 npm i knex pg</li>
<li>mocha: 6.0 npm i mocha</li>
<li>pg: 7.6</li>
<li>supertest: 3.4 npm i supertest</li>
<li>eslint: 5.9 npm i eslint</li>
<li>husky: 1.1 npm i huskf</li>
</ul>

<h3>How To Run Tests </h3>

<h5>npm test</h5>to see all the tests in the spec file.
<h5> npm seed</h5> to run the knex file

<h4>What npm test returns </h4>

<h5>Topics </h5>

<ul><li> GET STATUS :200 responds with an array of topic objects with slug and description properties </li>
<li>ERR STATUS:404 if incorrect path used</li>
<li>POST STATUS:201 accepts an object containing slug and description properties
  </li></ul>