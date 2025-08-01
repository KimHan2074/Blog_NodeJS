class newsController {
    /*[GET] /news */
    index(req, res) {
        return res.render('news');
    }

    /*[GET] /news/:slug*/
    show(req, res) {
        return res.send('News Detail');
    }
}

module.exports = new newsController();
