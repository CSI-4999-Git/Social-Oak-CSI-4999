
/*
* Error Class, class only has one obj...
* */
class Error{
    e = {
        no_error:                     { code: 200,  message:`No error, may just be info`},
        try_catch_error:              { code: 1000, message:`Error in try_catch block`},
        JSON_parsing_error:           { code: 1001, message:`Error in JSON parse`},
        write_read_error:             { code: 1002, message:`Error reading or writing a file`},
        case_default_error:           { code: 1003, message:`Error @ case statement`},
        var_undefined:                { code: 1004, message:`Error, variable is undefined`},
        mqtt_disconnect:              { code: 1005, message:`Error, disconnect event -- mqtt`},
        kiosk_disconnect:             { code: 1006, message:`Error, disconnect event -- kiosk`},
        io_disconnect:                { code: 1007, message:`Error, disconnect event -- IO`},
        mobile_disconnect:            { code: 1008, message:`Error, disconnect event -- mobile`},
    }

}

module.exports = Error