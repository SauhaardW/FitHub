
const getDirName = (dir_name) => {
    return dir_name.substring(dir_name.search("backend"))
}

module.exports = {
    getDirName
}