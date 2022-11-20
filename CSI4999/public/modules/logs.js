const fs = require('fs')
let moment = require('moment')
//module dependencies//
let logSocket   = require('./service-Connection-Library')

logSocket.configure('logService', 1, ['add_to_log'], 'destination')







let path
let log_dir                                  = 'logFiles'
//global vars//

function add_To_Log(errorPhrase, errorObj){ // adding error to log // EX: add_To_Log(errors.error_missing_Sequence.message, errors.error_missing_Sequence)

    path = `${process.cwd()}/${log_dir}/log--${moment().format('MM-D-YYYY-ss')}.csv`

    let timestamp = moment().format("MMM DD YYYY_~_hh:mm:ss:SSS");

    let csv_Write = `${timestamp}, ${errorObj.code}, ${errorPhrase}\r\n`
console.log('logs_boy')
    logSocket.send('prefixApp', JSON.stringify({type:'logs', data: csv_Write, object:{timestamp:timestamp, errCode:errorObj.code, errorPhrase:errorPhrase}}))
    fs.appendFile(path, csv_Write, err => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Log file written`)
    })
}

module.exports = {add_To_Log}