<script setup>
import { ref } from 'vue';

const elements = ref([
    {
        id: 0,
        author: 'Silver_Fox',
        name: 'Стоит ли есть перед тренировкой',
        text: 'Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    },
    {
        id: 1,
        author: 'ilya-ivanov',
        name: 'Соревнование по подтягиваниям, Уфа, 15 июня',
        text: 'Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    },
    {
        id: 2,
        author: 'MrDelrus',
        name: 'Комплекс упражнений на все группы мышц',
        text: '<a> abracadabra </a>Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    }
]);
</script>

<template>
    <h1>
    Лента новостей
    </h1>
    <ul>
        <li v-for="element in elements" :key="element.id">
            <div class="post">
                <div class="post_title">{{ element.name }}</div>
                <div class="post_text" v-html="element.text"></div>
                <div class="post_author">{{ element.author }}</div>
                <!-- <button @click="showExercises(element.name)"> {{ element.name }} </button> -->
            </div>
        </li>
    </ul>

</template>

<style>
@import '../assets/styles/app.css';
</style>

<style>
.post {
    background-color: #edfefb;
    border: 1px solid rgb(231, 149, 149);
    margin: 10px;
    padding: 10px;
}

.post_author {
    text-align: right;
    color: #29afd0;
}

.post_title {
    font-weight: bold;
    color: #b90000;
    /* text-decoration: underline; */
    padding-bottom: 5px;
}

.post_text {

}

</style>
