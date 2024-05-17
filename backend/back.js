
process.title = "my_node";
// pidof my_node

// {
//     let md5 = require('md5');
// }

const Pool = require('pg').Pool;

const pool = new Pool({
    user:       'postgres',
    host:       'localhost',
    database:   'sport-tech',
    password:   'postgres',
    port:       5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

async function register(username, password) {
    try {
        // TODO check if there user with given username
        let query = "INSERT INTO sport_app.user(username, password) VALUES($1, $2)";

        let resp = await pool.query(query, [username, password]);

        if (resp.rowCount < 1) {
            return { status: "failed", error: "username exists" };
        }
        return { status: "ok" };

        // TODO add user
        // let query2 = "";

        // let resp = await pool.query(query2, [username, password, role]);
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        return { status: "failed", error: "?" };
    }
}

async function login(username, password) {
    try {
        let query = "SELECT * FROM sport_app.user WHERE username = $1 AND password = $2";

        let resp = await pool.query(query, [username, password]);

        if (resp.rowCount < 1) {
            return false;
        } else {
            // console.log(resp.rows[0]);
            return resp.rows[0];
        }
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        return false;
        //return { status: "failed", error: "?" };
    }
}

async function is_volunteer(username, password) {
    try {
        let query = "SELECT * FROM sport_app.user WHERE username = $1 AND password = $2 AND role = 'volunteer'";

        let resp = await pool.query(query, [username, password]);

        if (resp.rowCount < 1) {
            return false;
        } else {
            // console.log(resp.rows[0]);
            return true;
        }
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        return false;
        //return { status: "failed", error: "?" };
    }
}

async function is_admin(username, password) {
    try {
        let query = "SELECT * FROM sport_app.user WHERE username = $1 AND password = $2 AND role = 'admin'";

        let resp = await pool.query(query, [username, password]);

        if (resp.rowCount < 1) {
            return false;
        } else {
            // console.log(resp.rows[0]);
            return true;
        }
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        return false;
        //return { status: "failed", error: "?" };
    }
}

async function add_volunteer(username, password, volunteer) {
    try {
        let is_admin_flag = await is_admin(username, password);
        if (!is_admin_flag) {
            return { status: "failed", error: "?" };
        }

        let query = "UPDATE sport_app.user SET role='volunteer' WHERE username = $1 AND role='user'";

        let resp = await pool.query(query, [volunteer]);

        if (resp.rowCount < 1) {
            return { status: "failed", error: "no such user (or is volunteer / admin already)" };
        }
        return { status: "ok" };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

async function get_id_by_username(username) {
    let query = "SELECT user_id FROM sport_app.user WHERE username = $1;";

    let resp = await pool.query(query, [username]);

    return resp.rows[0].user_id;
}

async function get_id_by_exercise(exercise) {
    let query = "SELECT exercise_id FROM sport_app.exercise WHERE exercise_name = $1;";

    let resp = await pool.query(query, [exercise]);

    return resp.rows[0].exercise_id;
}

async function add_result(username, password, username_result, exercise, result) {
    try {
        let is_admin_flag = await is_admin(username, password);
        let is_volunteer_flag = await is_volunteer(username, password);
        if (!is_admin_flag && !is_volunteer_flag) {
            return { status: "failed", error: "?" };
        }

        let volunteer_id = await get_id_by_username(username);
        let user_id = await get_id_by_username(username_result);
        let exercise_id = await get_id_by_exercise(exercise);

        let query = "INSERT INTO sport_app.result(user_id, volunteer_id, exercise_id, result, comment)"
                    + "VALUES($1, $2, $3, $4, $5);";
        let resp = await pool.query(query, [user_id, volunteer_id, exercise_id, result, ""]);

        // user_id INTEGER NOT NULL,
        // volunteer_id INTEGER,
        // exercise_id INTEGER,
        // result DECIMAL,
        // comment TEXT

        // let resp = await pool.query(query, [volunteer]);

        if (resp.rowCount < 1) {
            return { status: "failed", error: "?" };
        }
        return { status: "ok" };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

async function get_exercises() {
    try {
        let query = "SELECT * FROM sport_app.exercise";
        let resp = await pool.query(query);

        return { status: "ok", info: resp.rows };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

async function get_result(username) {
    try {
        let user_id = await get_id_by_username(username);

        let query = "SELECT * FROM sport_app.result WHERE user_id = $1";
        let resp = await pool.query(query, [user_id]);

        return { status: "ok", info: resp.rows };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

async function get_rating() {
    try {
        let query = "SELECT t1.user_id, username, exercise_id, result\n" +
                    "FROM sport_app.USER AS t1\n" +
                    "INNER JOIN\n" +
                    "(SELECT distinct on (user_id, exercise_id) user_id, exercise_id, result\n" +
                    "FROM sport_app.RESULT\n" +
                    "ORDER BY user_id, exercise_id, result_dttm DESC) AS t2\n" +
                    "ON t1.user_id = t2.user_id;";

        let resp = await pool.query(query);

        return {status: "ok", info: resp.rows };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

// async function get_feed() {
//     try {
//         let query = "";

//         let resp = await pool.query(query);

//         return {status: "ok", info: resp.rows };
//     } catch (err) {
//         console.log(err.message);
//         console.log(err.stack);
//         // return false;
//         return { status: "failed", error: "?" };
//     }
// }

async function add_feed(username, password, title, content) {
    try {
        let is_user = await login(username, password);
        if (is_user == false) {
            return { status: "failed", error: "?" };
        }

        let user_id = await get_id_by_username(username);

        let query = "INSERT INTO sport_app.post(user_id, title, content) VALUES($1, $2, $3)";

        let resp = await pool.query(query, [user_id, title, content]);

        return { status: "ok" };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

// SELECT post_id, title, t1.content, t2.username, t1.user_id
// FROM sport_app.post AS t1
// INNER JOIN
// sport_app.USER AS t2
// ON t1.user_id = t2.user_id;
async function get_feed() {
    try {
        let query = "SELECT post_id, title, t1.content, t2.username, t1.user_id\n" +
                    "FROM sport_app.post AS t1\n" +
                    "INNER JOIN\n" +
                    "sport_app.USER AS t2\n" +
                    "ON t1.user_id = t2.user_id;";

        let resp = await pool.query(query);

        return {status: "ok", info: resp.rows };
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        // return false;
        return { status: "failed", error: "?" };
    }
}

async function query(req_json) {
    if (req_json["type"] == "register") {

        let username = req_json["username"];
        let password = req_json["password"];
        // let role = req_json["role"];

        let resp = await register(username, password);

        return resp;
    }

    if (req_json["type"] == "login") {
        let username = req_json["username"];
        let password = req_json["password"];

        let resp = await login(username, password);

        if (resp == false) {
            return { status: "failed", error: "?" };
        } else {
            return { status: "ok", info: resp };
        }

        return { status: "failed", error: "?" };
    }

    if (req_json["type"] == "add_volunteer") {
        let username = req_json["username"];
        let password = req_json["password"];
        let volunteer = req_json["volunteer"];

        let resp = await add_volunteer(username, password, volunteer);

        // let resp = await login(username, password);

        // if (resp == false) {
        //     return { status: "failed", error: "?" };
        // } else {
        //     return { status: "ok", info: resp };
        // }

        return resp;
    }

    if (req_json["type"] == "add_result") {
        let username = req_json["username"];
        let password = req_json["password"];
        let username_result = req_json["username_result"];
        let exercise = req_json["exercise"];
        let result = req_json["result"];

        let resp = await add_result(username, password, username_result, exercise, result);
        return { status: "ok" };
    }

    if (req_json["type"] == "get_result") {
        let username = req_json["username"];
        let resp = await get_result(username);
        return resp;
    }

    if (req_json["type"] == "get_exercises") {
        let resp = await get_exercises();
        return resp;
    }

    if (req_json["type"] == "get_rating") {
        let resp = await get_rating();
        return resp;
    }

    if (req_json["type"] == "add_feed") {
        let username = req_json["username"];
        let password = req_json["password"];
        let title = req_json["title"];
        let text = req_json["content"];

        let resp = add_feed(username, password, title, text);
        return resp;
    }

    if (req_json["type"] == "get_feed") {
        let resp = await get_feed();
        return resp;
    }

    // if (req_json["type"] == "add_result") {
    //     let username = req_json["username"];
    //     let password = req_json["password"];
    //     let participant = req_json["participant"];
    //     let

    //     let resp
    // }

    return {status: "failed", error: "type"};
}

/// start
var http = require('http');
var server = http.createServer();
server.on('request', async function(req, res) {
    try {
        // console.log ( req.method, req.url );
        if (req.method == "OPTIONS") {
            // Access-Control-Allow-Origin: *
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
            res.writeHead(200, {'Content-Type': 'text/plain'});
            // res.write('Hello World!\n' + data);
            res.end();
        }
        if (req.method == "GET") {
            // Access-Control-Allow-Origin: *
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Hello World! Ready to read?\n');
            res.end();
        }
        if (req.method == "POST") {
            console.log ( req.method, req.url );
            // console.log(req.body);
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async() => {
                try {
                    // console.log("data: " + data + "#\n"); // JSON.parse(data).todo 'Buy the milk'
                    let nowjson = await JSON.parse(data);
                    console.log(nowjson);
                    let res_json = await query(nowjson).then((res_json_) => {
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Credentials", "true");
                        res.setHeader("Access-Control-Max-Age", "1800");
                        res.setHeader("Access-Control-Allow-Headers", "content-type");
                        res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
                        res.writeHead(200, {'Content-Type': 'text/plain'});

                        console.log(res_json_);
                        res.write(JSON.stringify(res_json_));
                        res.end();
                    }).catch(err => {
                        console.log("res_error: " + err);
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Credentials", "true");
                        res.setHeader("Access-Control-Max-Age", "1800");
                        res.setHeader("Access-Control-Allow-Headers", "content-type");
                        res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.write(JSON.stringify({status: "failed"}));
                        res.end();
                    });
                } catch(err) {
                    console.log("I CATCHED: " + err);
                    res.end();
                }
            })
        }
    } catch(err) {
        console.log(err.message);
        console.log(err.stack);
        res.end();
    }
});

server.listen(8080, '0.0.0.0');

process.on('uncaughtException', (err, origin) => {
    console.log(err);
    console.log(err.message);
    console.log(err.stack);
});

// const server = http.createServer((req, res) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk;
//   })
//   req.on('end', () => {
//     console.log(JSON.parse(data).todo); // 'Buy the milk'
//     res.end();
//   })
// })

// test of symbol link
