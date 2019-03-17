const bcryptjs = require('bcryptjs')

module.exports = {
    hash(input) {
        let salt = bcryptjs.genSaltSync(8)
        let hash = bcryptjs.hashSync(input, salt)
        return hash
    },
    compare(input, password) {
        let compare = bcryptjs.compareSync(input, password)
        return compare
    }
}