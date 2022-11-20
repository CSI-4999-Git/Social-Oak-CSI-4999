let version                                  = 'v1.0.0'; // version
const appName                                = `CSI4999`;
const fileName                               = `aStart.js`;
let portNum                                  = 80; //port
// let mysql                                    = require('mysql');
// let mariadb                                  = require('mariadb');
let express                                  = require('express');
let socket                                   = require('socket.io');
const os                                     = require("os");
let {exec}                                   = require("child_process");
let Log                                      = require('./err_logging/log_handler'); // collects all error logs from system
let Error                                    = require(`./err_logging/errors`); // error object
const multer                                 = require('multer');
let error                                    = new Error();
let log                                      = new Log(); // new instance of Log Handler...
log.init(appName, '1.0.0'); // log config


const { Pool, Client } = require("pg");
const path = require("path");
const fs = require("fs");

const credentials = {
    user: "csi4999db",
    host: "localhost",
    database: "csi4999db",
    password: "test",
    port: 5432,
};

let profilePhotoFileName;

let personal_io;


// CREATE TABLE users (
//     id serial PRIMARY KEY,
//     email VARCHAR ( 255 ) UNIQUE NOT NULL,
//     school VARCHAR ( 50 ),
//     major VARCHAR ( 90 ),
//     class_standing VARCHAR ( 20 ),
//     first_name VARCHAR ( 30 ),
//     last_name VARCHAR ( 30 ),
//     description VARCHAR ( 250 ),
//     photopath varchar (250),
//     job varchar (50)
// );


//
// async function getAllUsers() {
//     const client = new Client(credentials);
//     await client.connect();
//     const now = await client.query("SELECT * from users");
//     await client.end();
//
//     return now;
// }
// // async function create_user(email, school, major, class_standing, first_name, last_name, description, photopath, job) {
// //     const client = new Client(credentials);
// //     await client.connect();
// //     const now = await client.query("INSERT INTO users (email, school, major, class_standing, first_name, last_name, description, photopath, job) VALUES ()");
// //     await client.end();
// //
// //     return now;
// // }
//
//
// async function create_user(email, school, major, class_standing, first_name, last_name, description, photopath, job) {
//     const client = new Client(credentials);
//     await client.connect();
//     // const now = await client.query("INSERT INTO users (email, school, major, class_standing, first_name, last_name, description, photopath, job) VALUES ()");
//     // await client.end();
//
//
//     var sql = "INSERT INTO customers (name, address) VALUES";
//     var values = [
//         ['John', 'Highway 71'],
//         ['Peter', 'Lowstreet 4'],
//         ['Amy', 'Apple st 652'],
//         ['Hannah', 'Mountain 21'],
//         ['Michael', 'Valley 345'],
//         ['Sandy', 'Ocean blvd 2'],
//         ['Betty', 'Green Grass 1'],
//         ['Richard', 'Sky st 331'],
//         ['Susan', 'One way 98'],
//         ['Vicky', 'Yellow Garden 2'],
//         ['Ben', 'Park Lane 38'],
//         ['William', 'Central st 954'],
//         ['Chuck', 'Main Road 989'],
//         ['Viola', 'Sideway 1633']
//     ];
//     // con.query(sql, [values], function (err, result) {
//     //     if (err) throw err;
//     //     console.log("Number of records inserted: " + result.affectedRows);
//     // });
//
//     const now = await client.query(sql,[values])
//     await client.end();
//
//     return now;
// }
//
//
//
//
// const insertUser = async (userName, userRole) => {
//     try {
//         const client = new Client(credentials);
//         await client.connect();           // gets connection
//         await client.query(
//             `INSERT INTO "users" ("email", "school", "major","class_standing","first_name","last_name","description","photopath","job")
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [email, school, major, class_standing, first_name, last_name, description, photopath, job ]); // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();               // closes connection
//     }
// };
//
// async function getAllChats() {
//     const client = new Client(credentials);
//     await client.connect();
//     const now = await client.query("SHOW * tables");
//     await client.end();
//
//     return now;
// }
//
// (async () => {
//
//
//     const createUser = await create_user();
//     console.log(createUser.rows);
//     console.log('done');
//
//
//
//
// })();

let io;
let server;
let app                                      = express(); // initializing express
let startup                                  = true;
let diagnostic                               = false;
let ipAddress_diagnostic                     = false;

let userFileName;

let fileStorage = multer.diskStorage(
    {
        destination: path.join(__dirname, './public/profile_photos'),
        filename: function ( req, file, cb ) {
            profilePhotoFileName = file.originalname;
            cb( null, file.originalname);
        }
    }
);
const profilePhotoUploadObj = multer( { storage: fileStorage } );


let fileStorage_user = multer.diskStorage(
    {
        destination: path.join(__dirname, './users'),
        filename: function ( req, file, cb ) {
            console.log(file)
            cb( null, userFileName);
        }
    }
);
const userObj = multer( { storage: fileStorage_user } );


server = app.listen(portNum, function () {

    if(startup){console.log(`${appName} Version: ${version}, Port: ${portNum}, IP Address: ${getIpAddress()}`)}

    app.use(express.static('public'));

    io = socket(server);

    io.on('connection', (socket) => {

        personal_io = socket;

        personal_io.emit('html', JSON.stringify({type:'version', version:version}))// triggers event on webpage side...

        if(diagnostic){console.log('Socket connected..')}

        log.log('info', error.e.no_error.code, fileName, `Socket.io connected`, false, new Error().stack);

        // socket.on('js', function (data) {
        //
        //     let msg = JSON.parse(data);
        //
        //     switch (msg.type) {
        //
        //         case 'authCheck':
        //             (async () => {
        //
        //                 console.log(msg);
        //
        //                 const allUsers = await getAllUsers();
        //                 console.log(allUsers.rows); // adjust for all profiles....
        //
        //                 allUsers.rows.forEach(user=>{
        //                     if(user.email === msg.data.username){
        //                         console.log('Successful login!');
        //                         personal_io.emit('html', JSON.stringify({type:'profile', data:user}));
        //
        //
        //                     }else{
        //                         //do nothing....
        //                     }
        //                 })
        //
        //
        //
        //                 // setTimeout(()=>{
        //                 //     personal_io.emit('html', JSON.stringify({type:'profile', data:allUsersArray.rows[0]}))
        //                 //     console.log('emitted...')
        //                 // },5000)
        //
        //                 // personal_io.emit('html', JSON.stringify({type:'profile', data:allUsersArray.rows[0]}))
        //
        //                 console.log('done');
        //
        //
        //
        //
        //             })();
        //             break;
        //         case 'createUser':
        //             (async () => {
        //
        //
        //                 console.log(msg);
        //
        //                 let res = await create_user(msg.data.email, msg.data.uni, msg.data.major, msg.data.cls, msg.data.fname, msg.data.lname, msg.data.desc, msg.data.photoPath, msg.data.job);
        //                 console.log(res.rows); // new profile...
        //
        //
        //                 console.log('done');
        //
        //
        //
        //
        //             })();
        //             break;
        //         case 'getPhotoName':
        //             if(profilePhotoFileName !== undefined){
        //                 personal_io.emit('photoRes', JSON.stringify(profilePhotoFileName))
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        // })
        socket.on('js', function (data) {

            let msg = JSON.parse(data);

            switch (msg.type) {

                case 'authCheck':
                    let exists = false;

                    try{

                        let users_array = fs.readdirSync(`./users`);

                        console.log(users_array)

                        users_array.forEach(user_file=>{

                            let nameCH = user_file.replace('.user','');

                            if(msg.data.username === nameCH){ // if username is one of the user files.....

                                let user = fs.readFileSync(`./users/${user_file}`);
                                user = JSON.parse(user);

                                if(msg.data.password === user.password ){
                                    console.log(`user found...`);
                                    exists = true;
                                    console.log(user);

                                    personal_io.emit('html', JSON.stringify({type:'populate_profile', data:user})) // sends data to be populated to profile

                                }
                            }
                        })

                        if(exists === false){
                            personal_io.emit('alert', 'Account cannot be found....')
                        }

                    }catch (e) {
                        console.log(e.message);
                    }
                    break;
                case 'createUser':

                    break;
                case 'getPhotoName':
                    if(profilePhotoFileName !== undefined){
                        personal_io.emit('photoRes', JSON.stringify(profilePhotoFileName))
                    }
                    break;
                case 'setUserFileName':
                   userFileName = msg.data;
                    break;
                default:
                    break;
            }
        })
    })
    io.on('disconnect', (e) => {
        if(diagnostic){console.log('Socket disconnected.. (Socket.io)')}
        log.log('error', error.e.io_disconnect.code, fileName, error.e.io_disconnect.message, false, new Error().stack);

    })
})


app.post(`/public/profile_photos/`, profilePhotoUploadObj.single('file'), function(req, res) {
    const file = req.file;

    if(diagnostic){console.log(file)}

    res.sendStatus(200);

});
app.post(`/users/`, userObj.single('file'), function(req, res) {
    const file = req.file;

    if(diagnostic){console.log(file)}

    res.sendStatus(200);

});



function getIpAddress() {
    log.log('info', error.e.no_error.code, fileName, `getIpAddress function started...`, false, new Error().stack);
    let ip_objs = os.networkInterfaces(); // ip object
    let found_IP = ''; // global
    if(ipAddress_diagnostic){console.log(`Searching for local IPv4 ip address....`)}
    for (let item in ip_objs) { // for each property in the ip object...
        if(ipAddress_diagnostic){console.log(`Searching for ${item} === eth0`)}
        if(item === `eth0`){
            if(ipAddress_diagnostic){console.log(`Found eth0`)}
            ip_objs[item].forEach(obj=>{
                if(ipAddress_diagnostic){console.log(`Searching for ${obj.family} === IPv4 || 4`)}
                if(obj.family !== undefined){
                    if(obj.family === 4 || obj.family === `IPv4`){ // IPv4
                        if(ipAddress_diagnostic){console.log(`Found local IPv4 ip: ${obj.address}`)}
                        found_IP = obj.address;
                    }
                }
            })
        }
    }
    return found_IP;
}