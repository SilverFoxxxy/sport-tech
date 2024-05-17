// const server = 'https://belkovanya.site/lr/';
const server = 'http://127.0.0.1:8080';

async function send_req(req_json) {
    console.log(JSON.stringify(req_json));

    var url = server;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req_json)
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let res_json = await response.json();
      console.log(res_json);
      return res_json;
      // var data = JSON.stringify(json);
      // console.log(json);
      // document.getElementById('res').innerHTML = data;
    } else {
        return {status: "failed", error: "connection"};
        // return {"error": "1"};
        // alert("Ошибка HTTP: " + response.status);
        console.log("Ошибка HTTP: " + response.status);
        // alert("Ошибка при подключении к серверу");
    }
}

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

async function calc_hash(str) {
    /*jshint bitwise:false */
    let n = str.length;
    let salt = "my_magic_salt_4_great_soup";
    return await digestMessage(str + salt);
}

async function request_register(username, password) {
    let req_json = {
        type: 'register',
        username: username,
        password: await calc_hash(password)
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_login(username, password) {
    let req_json = {
        type: 'login',
        username: username,
        password: await calc_hash(password)
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_add_volunteer(username, pswd_hash, username_volunteer) {
    let req_json = {
        type: 'add_volunteer',
        username: username,
        password: pswd_hash,
        volunteer: username_volunteer
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_add_result(username, pswd_hash, username_result, text, result) {
    let req_json = {
        type: 'add_result',
        username: username,
        password: pswd_hash,
        username_result: username_result,
        exercise: text,
        result: result
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_get_exercises() {
    let req_json = {
        type: 'get_exercises'
    };
    let req_res = send_req(req_json);
    return req_res;
}

async function request_get_result(username) {
    let req_json = {
        type: 'get_result',
        username: username
    };
    let req_res = send_req(req_json);
    return req_res;
}

async function request_get_rating() {
    let req_json = {
        type: 'get_rating'
    };
    let req_res = send_req(req_json);
    return req_res;
}

async function request_get_feed() {
    let req_json = {
        type: 'get_feed'
    };
    let req_res = send_req(req_json);
    return req_res;
}

async function request_add_post(username, pswd_hash, title, content) {
    let req_json = {
        type: 'add_feed',
        username: username,
        password: pswd_hash,
        title: title,
        content: content
    };
    let req_res = send_req(req_json);
    return req_res;
}

async function request_posts_by_tags(tag, posts_count) {
    let req_json = {
        type: 'posts_by_tags',
        tag: tag,
        posts_count: posts_count
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_top_rating_for_exercise(exercise_name) {
    let req_json = {
        type: 'top_rating_for_exercise',
        exercise_name: exercise_name
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_user_information(username) {
    let req_json = {
        type: 'user_information',
        username: username
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_exercises_list() {
    let req_json = {
        type: 'exercises_list'
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_sport_equipment_on_sports_ground(sports_ground_id) {
    let req_json = {
        type: 'sport_equipment_on_sports_ground',
        sports_ground_id: sports_ground_id
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_sports_grounds_list() {
    let req_json = {
        type: 'sports_grounds_list'
    }
    let req_res = send_req(req_json);
    return req_res;
}

async function request_exercises_by_sport_equipment(sport_equipment_name) {
    let req_json = {
        type: 'exercises_by_sport_equipment',
        sport_equipment_name: sport_equipment_name
    }
    let req_res = send_req(req_json);
    return req_res;
}
