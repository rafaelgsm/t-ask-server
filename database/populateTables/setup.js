//....

process.env.DEBUG = true

//....

const { populateLanguages } = require('./languages.js');
const { populateTimeSpans } = require('./timeSpan.js');
const { populateLanguagesTimeSpan } = require('./languagesTimeSpan.js');


const DELETE_ALL = (callback) => {
    const { connectionPool } = require('../connection.js');
    let sql = ` DELETE FROM LanguagesTimeSpan; DELETE FROM Languages; DELETE FROM TimeSpan;`

    connectionPool.query(sql, (error, result) => {
        if (error) {
            console.log(error);

        } else {
            console.log(result)
            callback()
        }
    })
}


DELETE_ALL(() => {
    

    populateLanguages()
        .then(populateTimeSpans)
        .then(populateLanguagesTimeSpan)

        .then(result => {
            console.log(`ALL DONE`);
        })


})

