exports.saveCatError = {
    error: {
        message: 'Failed to save category',
        type: 'create',
        from: 'db'
    }
}

exports.catDuplicateError = {
    error: {
        message: 'Category already exists',
        type: 'client',
        from: 'db'
    }
}

exports.saveCatInfo = {
    info: {
        message: 'Succesfully created category',
        type: 'create',
        from: 'db'
    }
}



exports.getCatsError = {
    error: {
        message: 'Failed to get categories',
        type: 'get',
        from: 'db'
    }
}
