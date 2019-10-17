const { Router } = require('express');
//const passport = require('passport');
const ListTable = require('../list/table');

const router = Router();

router.post('/add', (req, res, next) => {
	ListTable.storeList(req.body)
		.then(resp => res.json(resp))
		.catch(err => next(err));
		//console.error('error', err));
});

router.get('/shoppingLists', (req, res, next) => {
	ListTable.getListsByType({ listType: 'shopping' })
		.then(lists => res.json(lists))
		.catch(err => next(err));
		//console.error('error', err));
});

router.get('/templateLists', (req, res, next) => {
	ListTable.getListsByType({ listType: 'template' })
		.then(lists => res.json(lists))
		.catch(err => next(err));
		//console.error('error', err));
});

router.get('/listDetail', (req, res, next) => {
	ListTable.getListDetailById(req.body)
		.then(list => res.json(list))
		.catch(err => next(err));
		//console.error('error', err));
});



// router.post('/random',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res, next) => {
// 	QuestionTable.getRandomQuestionsByCategoryCounts(req.body)
// 		.then(testLists => res.json(testLists))
// 		.catch(err => console.error('error', err))
// })

module.exports = router;