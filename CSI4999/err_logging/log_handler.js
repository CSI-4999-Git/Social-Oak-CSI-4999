/**
 *  @file log_handler
 *  @date 04.06.2022
 *  @description This module assembles and appends a log file accordingly
 *  @author Lawrence F Jasper III @ Made Systems, LLC.
 *  @version 1.0.1
 *  @revisions
 *      0.1.0   Initial Design
 *      1.0.0   Updates by MS Include the following:
 *                  -Added JS-Doc Comments
 *                  -Added init method
 *                  -Added dynamic applicationName and
 *                   version that are within the log
 *                   file name
 *                  -Removed Unnecessary module
 *                   dependencies
 *                  -Allowed for recording of user
 *                   defined property within the log.
 *                   The recording of the property can
 *                   ber turned on or off with the
 *                   recordOther boolean
 *      1.0.1   Patched some small issues, mainly ordering of parameters for logging function
 *
 */

/**
 * @link https://github.com/winstonjs/winston
 * @link https://github.com/winstonjs/winston-daily-rotate-file
 */
let winston                                                                         = require('winston');
const { createLogger, format, transports }                                          = require('winston');
const  winston_logger                                                               = require('winston-daily-rotate-file');
const { combine, timestamp, label, prettyPrint }                                    = format;

/**
 * Creates a new Log.
 * @class
 */
class Log {

    /**
     * @method init
     * @param {string} applicationName - Level corresponding to log ex. 'error' or 'info'
     * @param {string} version - The line number from which the log was issued ex. '238'
     */
    init(applicationName, version){

        if(typeof applicationName === "string" && applicationName.length !== 0 && typeof version === "string" && version.length !== 0){

            /**
             * Start by creating a logger using winston.createLogger
             * @property {object} levels Levels (and colors) representing log priorities
             * @property format Formatting for info messages see https://github.com/winstonjs/winston#formats
             * @property {array} transports Set of logging targets for info messages
             * @property {boolean} exitOnError If false, handled exceptions will not cause process.exit
             * @property {boolean} silent If true, all logs are suppressed
             */
            this.logger = winston.createLogger({
                levels: {
                    error: 0,
                    info: 1
                },

                format: combine(
                    timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                    prettyPrint()
                ),

                transports: [
                    /**
                     * Initiate Daily Log Rotate using new winston.transports.DailyRotateFile({})
                     * @link https://github.com/winstonjs/winston-daily-rotate-file
                     * @property {string} filename Used as formatting for the log file. Include '%DATE%'  as a placeholder for the formatted datePattern ex. 'winston-%DATE%.log'
                     * @property {string} datePattern A string representing the moment.js date format used for rotating
                     * @property {boolean} zippedArchive A boolean to define whether to gzip archived log files
                     * @property {string} dirname The directory name to save log files to
                     * @property {string} maxSize Maximum size of the file after which will rotate formatted with number and unit as a single string ex. '10m'  is 10 mb
                     * @property {string} maxFiles Maximum number of logs to keep. If unset, all logs will remain. Input is either number of days ex '10d' or number of files '10'
                     */
                    new winston.transports.DailyRotateFile({
                        filename: `${applicationName}-${version}-%DATE%.log`,
                        datePattern: 'YYYY-MM-DD-HH',
                        zippedArchive: false,
                        dirname: 'logFiles',
                        maxSize: '10m',
                        maxFiles: '60d'
                    })
                ],
                exitOnError: false,
                silent: false
            });
        }else{
            throw new Error('Error configuring the log_handler module... Refer to documentation for configuration options.');
        }
    }

    /**
     * @method log
     * @param {string} log_level - Level corresponding to log ex. 'error' or 'info'
     * @param {string} err_code - The error code for the log that was issued ex. '1001'
     * @param {string} file_name - The file name from which the log was issued ex. 'app-test.js'
     * @param {string} log_message - This is the message which will be displayed in the log file ex. 'User provided an invalid password X number of times'
     * @param {boolean} recordOther - This boolean tells the log method whether to record the other parameter in the log, or to leave it out
     * @param {*} other - This property allows the user to pass in a custom value  ex. new Error().stack
     */
    log(log_level, err_code, file_name, log_message, recordOther, other){
        if(recordOther === true){
            this.logger.log({
                level: log_level,
                err_code: err_code,
                message: log_message,
                fileName: file_name,
                other: other
            });
        }else if(recordOther === false){
            this.logger.log({
                level: log_level,
                err_code: err_code,
                message: log_message,
                fileName: file_name,
            });
        }
    }
}

/**
 * @module ./log_handler
 * @type {Log}
 */
module.exports = Log;