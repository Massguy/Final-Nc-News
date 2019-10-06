const {
  changeComment, deleteComment,
} = require('../model/commentModel');


exports.updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  let { inc_votes = 0 } = req.body;
  if (typeof inc_votes !== 'number') inc_votes = 0;
  changeComment(comment_id, inc_votes)
    .then(([comment]) => {
      if (!comment) res.status(404).send({ status: 404, msg: 'Route not found' });
      else res.status(200).send({ comment });
    })
    .catch(err => next(err));
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  // eslint-disable-next-line consistent-return
  deleteComment(comment_id).then((itemsRemoved) => {
    if (itemsRemoved) res.sendStatus(204);
    else return res.status(404).send({ status: 404, msg: 'Route not found' });
  })
    .catch(next);
};
