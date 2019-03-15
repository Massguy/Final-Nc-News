const {
  changeComment,
} = require('../model/commentModel');


exports.updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  // eslint-disable-next-line consistent-return
  changeComment(comment_id, inc_votes).then(([comment]) => {
    if (comment) res.status(202).send({ comment });
    else return Promise.reject({ status: 404, msg: 'server error' });
  })
    .catch(err => next(err));
};
