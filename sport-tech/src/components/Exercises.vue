<script setup>
import { ref } from 'vue';

const elements = ref([
    {
        id: 0,
        author: 'Silver_Fox',
        name: 'Подтягивания',
        text: 'Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    },
    {
        id: 1,
        author: 'ilya-ivanov',
        name: 'Отжимания от брусьев',
        text: 'Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    },
    {
        id: 2,
        author: 'MrDelrus',
        name: 'Приседания',
        text: '<a> abracadabra </a>Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text Lorem ipsum asdawdqdasdqwe random text'
    }
]);
</script>

<template>
    <h1>
    Упражнения
    </h1>
    <ul>
        <li v-for="element in elements" :key="element.id">
            <div class="post">
                <div class="post_title">{{ element.name }}</div>
                <div class="post_test" v-html="element.text"></div>
                <!-- <div class="post_author">{{ element.author }}</div> -->
                <!-- <button @click="showExercises(element.name)"> {{ element.name }} </button> -->
            </div>
        </li>
    </ul>

</template>

<style>
@import '../assets/styles/app.css';
</style>

<style>
</style>
