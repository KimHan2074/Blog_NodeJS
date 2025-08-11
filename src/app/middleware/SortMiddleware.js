module.exports = function SortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (Object.hasOwn(req.query, '_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = req.query.column;
        // res.locals._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        }); /*Hàm assign dùng để hợp nhất đối tượng bên phải vào đối tượng bên trái trong dấu ngoặc, trùng key nó sẽ thực hiện ghi đè lên */
    }

    next();
};
