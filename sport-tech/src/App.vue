<script setup>
import { ref, onMounted } from 'vue';
import Feed from './components/Feed.vue';
import Exercises from './components/Exercises.vue';
import Map from './components/Map.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import SportsGround from './components/SportsGround.vue';

var selected_tab_id = ref('Feed');

onMounted(() => {
  selectTab('Feed');
})

function selectTab(tab_id) {
  selected_tab_id.value = tab_id;
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
  <div class="tab">
    <button v-bind:style= "[(selected_tab_id == 'Feed') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Feed')">Статьи</button>
    <button v-bind:style= "[(selected_tab_id == 'Exercises') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Exercises')">Упражнения</button>
    <button v-bind:style= "[(selected_tab_id == 'Rating') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Rating')">Рейтинг</button>
    <button v-bind:style= "[(selected_tab_id == 'Map') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Map')">Карта</button>
    <button v-bind:style= "[(selected_tab_id == 'Profile') ? {'background-color': '#fff'} : {}]" class="tablinks" @click="selectTab('Profile')">Профиль</button>
  </div>

  <!-- Tab content -->

  <div id="Feed" v-show="selected_tab_id == 'Feed'" class="tabcontent">
    <Feed/>
  </div>

  <div id="Exercises" v-show="selected_tab_id == 'Exercises'" class="tabcontent">
    <Exercises/>
  </div>

  <div id="Rating" v-show="selected_tab_id == 'Rating'" class="tabcontent">
    <h3>Рейтинг!!</h3>
    <p>London is the capital city of England.</p>
  </div>

  <div id="Map" v-show="selected_tab_id == 'Map'" class="tabcontent">
    <Map/>
  </div>

  <div id="Profile" v-show="selected_tab_id == 'Profile'" class="tabcontent">
    <h3>Рейтинг!!</h3>
    <p>London is the capital city of England.</p>
  </div>

  <!-- <div id="Feed" v-show="selected_tab_id = 'Feed'" class="tabcontent">
    <h3>Лента новостей!!</h3>
    <p>London is the capital city of England.</p>
  </div>

  <div id="Feed" v-show="selected_tab_id = 'Feed'" class="tabcontent">
    <h3>Лента новостей!!</h3>
    <p>London is the capital city of England.</p>
  </div>

  <div id="Feed" v-show="selected_tab_id = 'Feed'" class="tabcontent">
    <h3>Лента новостей!!</h3>
    <p>London is the capital city of England.</p>
  </div> -->

  <!-- <SportsGround/> -->

  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>

<style>
  @import './assets/styles/app.css';
</style>
