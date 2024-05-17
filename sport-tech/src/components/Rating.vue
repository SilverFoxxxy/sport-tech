<script setup>
import { ref, onMounted } from 'vue';

var rating = ref(
    [
        {
            username: "ilya-ivanov",
            res0: 100,
            res1: 100,
            res2: 50,
        },
        {
            username: "sinus-cosinus",
            res0: 95,
            res1: 95,
            res2: 40,
        },
        {
            username: "MrDelrus",
            res0: 87,
            res1: 56,
            res2: 35,
        },
        {
            username: "Abra",
            res0: 77,
            res1: 67,
            res2: 27,
        }
    ]
);

onMounted(async() => {
    var rating_info = await request_get_rating();
    let exercises_array = await request_get_exercises();
    let exercises_dict = {};

    for (let item of exercises_array.info) {
        exercises_dict[item.exercise_id] = item.exercise_name;
    }

    var user_dict = {};

    for (var item of rating_info.info) {
        if (!user_dict.hasOwnProperty(item.username)) {
            user_dict[item.username] = {};
        }

        if (exercises_dict[item.exercise_id] == "Отжимания") {
            user_dict[item.username].res0 = parseInt(item.result);
        }

        if (exercises_dict[item.exercise_id] == "Подтягивания") {
            user_dict[item.username].res1 = parseInt(item.result);
        }

        // if (exercises_dict[item.exercise_id] == "Подтягивания") {
        //     user_dict[item.username].res0 = item.result;
        // }
    }

    let cur_rating = [];
    for (const [key, value] of Object.entries(user_dict)) {
        cur_rating.push({
            username: key,
            res0: value.res1 * 2 + value.res0,
            res1: value.res0,
            res2: value.res1
        });
    }

    cur_rating.sort(function (a, b) {
        return b.res0 - a.res0;
    });

    rating.value = cur_rating;
    
    // for (const [key, value] of Object.entries(props.exercises_info)) {
    //     if (value == 'Подтягивания') {
    //         pull_id = key;
    //         break;
    //     }
    // }
});

</script>

<template>
    <h1>
    Рейтинг
    </h1>

    <div style="padding: 10px; border: 1px solid gray; border-radius: 10px;">
    
    <ul>
        <div class="wrapper4">
            <div>
                Имя
            </div>
            <div>
                Общая сила
            </div>
            <div>
                Отжимания
            </div>
            <div>
                Подтягивания
            </div>
        </div>
        <hr>
        <li v-for="item in rating">
            <div class="wrapper4">
                <div class="table_username">
                    {{ item.username }}
                </div>
                <div class="table_result">
                    {{ item.res0 }}
                </div>
                <div class="table_result">
                    {{ item.res1 }}
                </div>
                <div class="table_result">
                    {{ item.res2 }}
                </div>
            </div>
            <hr style="color: gray; margin: 0; padding: 0;">
            <!-- <div class="post">
                <div class="post_title">{{ element.name }}</div>
                <div class="post_text" v-html="element.text"></div>
                <div class="post_author">{{ element.author }}</div>
            </div> -->
        </li>
    </ul>

    </div>

</template>

<style>
@import '../assets/styles/app.css';
</style>

<style>
.wrapper4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 10px;
}

.table_username {
    color: #29afd0;
}

.table_result {
    color: #dd0000;
}
</style>
