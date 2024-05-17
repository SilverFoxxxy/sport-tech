<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  user_info: Object,
  result_info: Object,
  exercises_info: Object
})

onMounted(() => {
    draw_plot();
    // var trace1 = {
    // x: [1, 2, 3, 4],
    // y: [10, 15, 13, 17],
    // type: 'scatter'
    // };

    
    // recalc_activity_list();
});

watch((props) => {
    draw_plot();
});

// var activity_list = ref([]);
// var exercises = ref({});

// var username = ref("");

// async function recalc_activity_list() {
//     // activity_list.value = (await request_get_result(props.user_info.username)).info;
//     let exercises_array = await request_get_exercises();

//     let new_dict = {};

//     for (let item of exercises_array.info) {
//         new_dict[item.exercise_id] = item.exercise_name;
//     }

//     exercises.value = new_dict;
//     console.log(exercises.value);
//     console.log(activity_list.value);
// }

async function draw_plot() {
    if (props.result_info === undefined || props.exercises_info === undefined) {
        return;
    }
    var pull_id = "-1";
    for (const [key, value] of Object.entries(props.exercises_info)) {
        if (value == 'Подтягивания') {
            pull_id = key;
            break;
        }
    }
    if (pull_id == "-1") {
        return {};
    }
    var x1 = [];
    var y1 = [];        

    for (let item of props.result_info) {
        if (item.exercise_id == pull_id) {
            // x1.push(item.result_dttm.substring(0, 10));
            x1.push(item.result_dttm);
            y1.push(item.result);
        }
    }

    console.log(x1);
    console.log(y1);

    var trace1 = {
        x: x1,
        y: y1,
        marker: {
            color: 'rgb(205,0,0)'
        }
    };

    var data = [trace1];
    // = [trace1, trace2];

    // Plotly.newPlot('history_plot', data);
    // var data1 = [
    // {
    //     x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    //     y: [1, 3, 6],
    //     type: 'scatter'
    // }
    // ];

//     Plotly.newPlot('history_plot', data);
// var data1 = [
//     {
//         x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
//         y: [1, 3, 6],
//         type: 'scatter'
//     }
//     ];

    var layout = {
        autosize: true,
        title: 'Прогресс по подтягиваниям',
        xaxis: {
            title: 'День',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Количество подтягиваний',
            showline: false,
            zeroline: true,
            rangemode: 'tozero'
        }
    };

    Plotly.newPlot('history_plot', data, layout);
}

var activity_list_comp = computed(() => {
    // console.log("HEREHEREHERHER");
    
    draw_plot();
});

</script>

<template>
    <div v-show="user_info" class="wrapper2">
        <div class="profile-info">
            <center>
            <div class="profile-picture">
                <img
                style="object-fit: contain; width: 100%; height: 100%;"
                src="https://flomaster.top/o/uploads/posts/2024-02/1708603821_flomaster-top-p-geroi-mumi-trollei-krasivo-narisovannie-1.jpg"
                alt="Grapefruit slice atop a pile of other slices" />
            </div>

            <!-- <div v-show="props.user_info === undefined" class="username">
                Belkovanya
            </div> -->
            <div class="username">
                {{ props.user_info.username }}
            </div>
            </center>
        </div>

        <div class="user_stats">
            Место в рейтинге: <span class="stat_number"> 1170 </span><br>
            Общая сила: <span class="stat_number"> 57 </span><br>
            Отжимания: <span class="stat_number"> 179 </span><br>
            Подтягивания: <span class="stat_number"> 42 </span><br>
            Превосходит <span class="stat_number"> 65% </span> пользователей<br>
        </div>
    </div>

    <br><br>

    <div style="margin: auto; width:700px; max-width:100%; padding: 10px; border: 1px solid gray; border-radius: 10px;" v-show="props.user_info !== undefined && props.exercises_info !== undefined && props.result_info !== undefined">
        <h3>Активность:</h3>
        <hr>

        <ul style="margin: auto;">
            <li v-for="item in props.result_info">
                <div class="wrapper3">
                    <div class="table_result">
                        {{ props.exercises_info[item.exercise_id]}}
                    </div>
                    <div class="table_result">
                        {{ item.result }}
                    </div>
                    <div class="table_result">
                        {{ item.result_dttm.substring(0, 10) }}
                    </div>
                </div>
                <hr style="color: gray; margin: 0; padding: 0;">
            </li>
        </ul>
    </div>

    <br><br><br>

    <div class="plot" style="padding: 10px; border: 1px solid gray; border-radius: 10px;">
    <img
                style="object-fit: contain; width: 100%; height: 100%;"
                src="../assets/plot_example.jpg"
                alt="Grapefruit slice atop a pile of other slices" />
    </div>

    <br><br><br>

    <div id="history_plot" style="width: 80%; max-width:100%; margin: auto; ">
    </div>

    <br><br><br>

</template>

<style>
.profile-info {
    /* border: 1px solid gray; */
}

.profile-picture {
    width: 200px;
    height: 250px;
    object-fit: contain;
}

.username {
    color: #29afd0;
    font-size: 1.2rem;
    margin: 20px;
}

.user_stats {
    margin: 15px;
    margin-top: 30px;
    line-height: 2;
    font-size: 1.2rem;
}

.stat_number {
    font-size: bold;
    color: #dd0000;
}

.wrapper2 {
    width: 900px;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.wrapper3 {
    width: 700px;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    line-height: 2.5;
}

.plot {
    width: 700px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border: 1px solid #dd0000;
    margin: auto;
}

@media screen and (max-width: 700px) {
  #history_plot {
    display: none;
  }

  .wrapper2 {
    display: block;
  }
}
/* .js-plotly-plot,
.plot-container {
    max-width: 80%;
} */
</style>
