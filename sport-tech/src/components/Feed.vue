<script setup>
import { ref } from 'vue';

const elements = ref([
    {
        id: 0,
        author: 'Silver_Fox',
        name: 'Стоит ли есть перед тренировкой',
        text: 'Да, стоит поесть перед тренировкой, так как это обеспечивает организм энергией для физической активности. Однако не стоит переедать, приём пищи должен быть сбалансированным и лёгким.'
    },
    {
        id: 1,
        author: 'ilya-ivanov',
        name: 'Соревнование по подтягиваниям, Уфа, 15 июня',
        text: 'В Уфе можно провести соревнование по подтягиванию «Стальной хват». Участники будут соревноваться в трёх возрастных категориях: мужчины и женщины от 18 до 39 лет, мужчины и женщины от 40 до 59 лет и мужчины и женщины старше 60 лет. Соревнования могут проходить в разных форматах: подтягивания на максимальное количество раз, подтягивания на время или подтягивания с дополнительным весом.'
    },
    {
        id: 2,
        author: 'MrDelrus',
        name: 'Комплекс упражнений на все группы мышц',
        text: 'Вот комплекс упражнений на все группы мышц:\n1. Приседания: укрепляют мышцы ног и ягодиц.\n2. Планка: укрепляет мышцы живота, рук и ног.\n3. Укрепление мышц спины: лёжа на животе, прикоснитесь к ушам кончиками пальцев рук и поднимите верхнюю часть корпуса, удерживая ноги на полу.\n4. Выпады назад: развивает координацию и равновесие.\n5. Тяга Кинга: развивает мышцы ног и ягодиц.\n6. Мост: укрепляет ягодицы.\n7. Супермен: укрепляет мышцы живота, ягодиц и спины.'
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
    background-color: #ffffff;
    border: 1px solid rgb(231, 149, 149);
    border-radius: 10px;
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
