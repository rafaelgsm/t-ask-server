// Run this once to populate Time Span table
// node timeSpan.js

const { connectionPool } = require('../connection.js');

let start =
    process.env.DEBUG ? [`2012-01-01`, `2013-01-01`] :
        [
            `2012-01-01`,
            `2013-01-01`,
            `2014-01-01`,
            `2015-01-01`,
            `2016-01-01`,
            `2017-01-01`,
            `2018-01-01`,
            `2019-01-01`,
            `2012-07-01`,
            `2013-07-01`,
            `2014-07-01`,
            `2015-07-01`,
            `2016-07-01`,
            `2017-07-01`,
            `2018-07-01`,
            `2019-07-01`
        ]

let end = process.env.DEBUG ? [`2012-06-30`, `2013-06-30`] :
    [
        `2012-06-30`,
        `2013-06-30`,
        `2014-06-30`,
        `2015-06-30`,
        `2016-06-30`,
        `2017-06-30`,
        `2018-06-30`,
        `2019-06-30`,
        `2012-12-31`,
        `2013-12-31`,
        `2014-12-31`,
        `2015-12-31`,
        `2016-12-31`,
        `2017-12-31`,
        `2018-12-31`,
        `2019-12-31`
    ]

let xxx = 0

const addTimeSpan = (start, end) => {

    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO TimeSpan (start, end) VALUES ('${start}', '${end}');`

        connectionPool.query(sql, (error, result) => {
            if (error) {
                reject(error)
            } else { resolve(result) }
        })
    })
}

const populateTimeSpans = () => {

    return new Promise((resolve, reject) => {

        console.log('populateTimeSpans');

        if (xxx < start.length) {

            addTimeSpan(start[xxx], end[xxx])
                .then(() => {
                    xxx++
                    resolve(populateTimeSpans())
                })

        } else {
            resolve()
        }
    })
}


exports.populateTimeSpans = populateTimeSpans
