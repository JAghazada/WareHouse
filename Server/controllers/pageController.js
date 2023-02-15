const getIndexPage = (req, res) => {
    res.render("index")
}
const getAboutPage = (req, res) => {
    res.render("about")
}
const getAdminPage = (req, res) => {
    res.render("admin")
}

module.exports = {
    getAboutPage,
    getIndexPage,
    getAdminPage
}