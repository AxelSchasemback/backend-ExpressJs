export function loguedApi(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ status: 'error', message: 'usuario no logueado' })
    }
    next()
}

export function loguedWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/login')
    }
    next()
}