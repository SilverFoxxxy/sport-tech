<script setup>
import { ref, onMounted } from 'vue';
import Feed from './components/Feed.vue';
import Exercises from './components/Exercises.vue';
import Rating from './components/Rating.vue';
import Map from './components/Map.vue';
import Profile from './components/Profile.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import SportsGround from './components/SportsGround.vue';

var user_info = ref({
  id: -1
});

var exercises_info = ref({});

var result_info = ref([]);

var selected_tab_id = ref('Feed');

async function tryLogin(username, pswd) {
  // let username = "Belkovanya";
  // let pswd = "test";

  console.log(username + " # " + pswd);

  let resp = await request_login(username, pswd);
  if (resp.hasOwnProperty("status") && resp.status == "ok") {
    // alert("Успех");
    user_info.value = resp.info;
    // exercises_info.value = resp.exercises_info;
    // result_info.value = resp.result_info;
    result_info.value = (await request_get_result(user_info.value.username)).info;

    let exercises_array = await request_get_exercises();

    let new_dict = {};

    for (let item of exercises_array.info) {
        new_dict[item.exercise_id] = item.exercise_name;
    }

    exercises_info.value = new_dict;
    console.log(exercises_info.value);
    console.log(result_info.value);
    // {
    //   id: 0,
    //   username: username,
    //   info: resp.info
    // };
    selectTab('Feed');
  } else {
    // alert("Что-то пошло не так");
  }
}

onMounted(() => {
  selectTab('Feed');

  tryLogin("Belkovanya", "test");
})

function selectTab(tab_id) {
  selected_tab_id.value = tab_id;
}

async function register() {
  console.log("register");
  let username = document.getElementById("username_reg").value;
  let pswd = document.getElementById("password_reg").value;
  console.log(username + " # " + pswd);
  
  let resp = await request_register(username, pswd);
  if (resp.hasOwnProperty("status") && resp.status == "ok") {
    alert("Попробуйте залогиниться");
  } else {
    alert("Что-то пошло не так");
  }
}

async function login() {
  let username = document.getElementById("username_login").value;
  let pswd = document.getElementById("password_login").value;

  tryLogin(username, pswd);

  // console.log(username + " # " + pswd);
  
  // let resp = await request_login(username, pswd);
  // if (resp.hasOwnProperty("status") && resp.status == "ok") {
  //   // alert("Успех");
  //   user_info.value = {
  //     id: 0,
  //     username: username
  //   };
  //   selectTab('Feed');
  // } else {
  //   alert("Что-то пошло не так");
  // }
}

async function exit_login() {
  user_info.value = {
    id: -1
  };

  selectTab('Login');
}

async function addVolunteer() {
  let username_volunteer = document.getElementById("username_volunteer").value;
  let username = user_info.value.username;
  let pswd = user_info.value.password;

  let resp = await request_add_volunteer(username, pswd, username_volunteer);

  if (resp.status == "ok") {
    alert("Успешно");
  } else {
    alert("Что-то пошло не так");
  }
}

async function addResult() {
  let username = user_info.value.username;
  let pswd = user_info.value.password;

  let username_result = document.getElementById("username_result").value;
  var e = document.getElementById("select_exercise");
  var value = e.value;
  var text = e.options[e.selectedIndex].text;
  let result = parseInt(document.getElementById("count_result").value);

  let resp = await request_add_result(username, pswd, username_result, text, result);

  if (resp.status == "ok") {
    alert("Успешно");
  } else {
    alert("Что-то пошло не так");
  }
}

//post_title" type="text" placeholder="Заголовок"/><br><br>
//        <textarea style="font-size:1.5rem; width:250px;" id="post_content
async function addPost() {
  let username = user_info.value.username;
  let pswd = user_info.value.password;

  let title = document.getElementById("post_title").value;
  let content = document.getElementById("post_content").value;

  let resp = await request_add_post(username, pswd, title, content);

  if (resp.status == "ok") {
    alert("Успешно");
  } else {
    alert("Что-то пошло не так");
  }
}


</script>

<template>
  <!-- <div>
    <center>
      <h1>Sport.Tech</h1>
    </center>
  </div> -->

  <!-- Статьи
  Упражнения
  Рейтинг
  Карта
  Профиль -->
  <!-- Tab links -->
  <div class="tab" style="max-width: 100%;">
    <button v-bind:style= "[(selected_tab_id == 'Feed') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Feed')">Статьи</button>
    <button v-bind:style= "[(selected_tab_id == 'Exercises') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Exercises')">Упражнения</button>
    <button v-bind:style= "[(selected_tab_id == 'Rating') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Rating')">Рейтинг</button>
    <button v-bind:style= "[(selected_tab_id == 'Map') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Map')">Карта</button>
    
    <button v-show="user_info.id == -1" v-bind:style= "[(selected_tab_id == 'Login') ? {'background-color': '#fff'} : {}]" class="tablinks call-to-action" @click="selectTab('Login')">Войти</button>
    <button v-show="user_info.id == -1" v-bind:style= "[(selected_tab_id == 'Register') ? {'background-color': '#fff'} : {}]" class="tablinks call-to-action" @click="selectTab('Register')">Зарегистрироваться</button>
    <button v-show="user_info.id != -1" v-bind:style= "[(selected_tab_id == 'Profile') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Profile')">Профиль</button>
  
    <button v-show="user_info.id != -1" class="tablinks tab_username">{{user_info.username}}</button>
    <button v-show="user_info.id != -1" class="tablinks" @click="exit_login()">Выйти</button>
  </div>

  <!-- Tab content -->

  <div id="Feed" v-show="selected_tab_id == 'Feed'" class="tabcontent">
    <Feed/>
  </div>

  <div id="Exercises" v-show="selected_tab_id == 'Exercises'" class="tabcontent">
    <Exercises/>
  </div>

  <div id="Rating" v-show="selected_tab_id == 'Rating'" class="tabcontent">
    <Rating/>
  </div>

  <div id="Map" v-show="selected_tab_id == 'Map'" class="tabcontent">
    <Map/>
  </div>

  <div id="Login" v-show="selected_tab_id == 'Login'" class="tabcontent">
    <br><br>
    <center>
      <div style="font-size:1.5rem;">
        <input style="font-size:1.5rem; width:250px;" id="username_login" placeholder="логин"/><br><br>
        <input style="font-size:1.5rem; width:250px;" id="password_login" type="password" placeholder="пароль"/><br><br>
        <button style="font-size:1.5rem; width:250px;" @click="login()">Войти</button>
      </div>
    </center>
    <br><br>
  </div>

  <div id="Register" v-show="selected_tab_id == 'Register'" class="tabcontent">
    <br><br>
    <center>
      <div style="font-size:1.5rem;">
        <input style="font-size:1.5rem; width:250px;" id="username_reg" placeholder="логин"/><br><br>
        <input style="font-size:1.5rem; width:250px;" id="password_reg" type="password" placeholder="пароль"/><br><br>
        <button style="font-size:1.5rem; width:250px;" @click="register">Зарегистрироваться</button>
      </div>
    </center>
    <br><br>
  </div>

  <div id="Profile" v-show="selected_tab_id == 'Profile'" class="tabcontent">
    <Profile :user_info="user_info" :result_info="result_info" :exercises_info="exercises_info"/>

    <br><br>

    <br><br>
    <center>
    <div id="AddResult">
      <h2>Добавить статью</h2>

      <div style="font-size:1.5rem;">
        <input style="font-size:1.5rem; width:250px;" id="post_title" type="text" placeholder="Заголовок"/><br><br>
        <textarea style="font-size:1.5rem; width:250px;" id="post_content" cols="40" rows="5"></textarea><br>
        <button style="font-size:1.5rem; width:250px;" @click="addPost">Добавить статью</button>
      </div>
    </div>

    <br><br><br>

    <div id="AddResult" v-show="user_info.role=='admin' || user_info.role=='volunteer'">
      <h2>Добавить результат</h2>

      <div style="font-size:1.5rem;">
        <input style="font-size:1.5rem; width:250px;" id="username_result" placeholder="логин"/><br><br>
        <select id="select_exercise" style="font-size:1.2rem; width:250px;"> 
          <option>Выберите упражнение</option> 
          <option>Подтягивания</option> 
          <option>Отжимания</option> 
          <option>Пресс</option> 
          <option>Приседания</option> 
        </select><br><br>
        <!-- <input style="font-size:1.5rem; width:250px;" id="exercise_result" placeholder="упражнение"/><br><br> -->
        <input style="font-size:1.5rem; width:250px;" id="count_result" type="number" placeholder="результат"/><br><br>
        <button style="font-size:1.5rem; width:250px;" @click="addResult">Добавить результат</button>
      </div>
    </div>

    <br><br><br>

    <div id="AddVolunteer" v-show="user_info.role=='admin'" style="margin:30px;">
      <h2>Добавить волонтёра</h2>
      <div style="font-size:1.5rem;">
        <input style="font-size:1.5rem; width:250px;" id="username_volunteer" placeholder="логин"/><br><br>
        <button style="font-size:1.5rem; width:250px;" @click="addVolunteer">Добавить волонтёра</button>
      </div>
    </div>

    <br><br><br><br>
    </center>
  </div>

</template>

<style>
  @import './assets/styles/app.css';
</style>

<style>
@media screen and (max-width: 700px) {
  body {
    font-size: 0.7rem;
  }
}

.tab_username {
  /* padding: 15px; */
  color: #29afd0;
  /* font-size: 1.2rem; */
  /* margin: 20px; */
}
</style>
