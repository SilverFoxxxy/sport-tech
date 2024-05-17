<script setup>
import { ref, onMounted } from 'vue';

function showSportGround(id) {
    sports_ground_id.value = id;
}

var sports_ground_id = ref(-1);

const sport_items = ref(
    {
        "0": {
            name: 'Компьютер'
        },
        "1": {
            name: 'Турник'
        },
        "2": {
            name: 'Брусья'
        },
        "3": {
            name: 'Скамья'
        }
    }
);

var sports_grounds = ref([
    {
        id: 0,
        coords: [54.720088, 55.936071],
        name: "Спортплощадка",
        text: "Площадка для спортивного программирования!",
        items: [1, 2]
    },
    {
        id: 1,
        coords: [54.727756, 55.932530],
        name: "Спортплощадка",
        text: "Супер-площадка с турниками",
        items: [1, 2, 3]
    }
]);

function initMap() {
    
    var myMap = new ymaps.Map("map", {
            center: [54.720088, 55.936071],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        });

    for (const item of sports_grounds.value) {
        var myPlacemark = new ymaps.Placemark(item.coords, {
                //balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            });

        myPlacemark.events.add('click', function () {
            showSportGround(item.id);
        });

        myMap.geoObjects
            .add(myPlacemark);
    }
    // var myPlacemark = new ymaps.Placemark([54.720088, 55.936071], {
    //         //balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
    //     }, {
    //         preset: 'islands#icon',
    //         iconColor: '#0095b6'
    //     });

    // myPlacemark.events.add('click', function () {
    //     customAlert('О, событие!');
    // });

    // myMap.geoObjects
    //     .add(myPlacemark);
}

onMounted(() => {
    ymaps.ready(initMap);
});

</script>

<template>
    <h1>Карта спортплощадок</h1>

    <div id="map" style="width: 900px; max-width: 90%; height: 400px; margin: auto; border: 1px solid black;"></div>

    <!-- <SportGround.vue/> -->
    <ul>
        <li v-for="item in sports_grounds">
            <div v-show="sports_ground_id  == item.id" class="post">
                <div class="post_title">{{ item.name }}</div>
                <div class="post_test" v-html="item.text"></div>
                <hr>
                <br>
                <div class="item_list_title">Список снарядов</div>
                <div v-show="sports_ground_id  == item.id">
                    <ul>
                        <li v-for="item_id in item.items">
                            <div class="sport_item">
                                {{ sport_items[item_id.toString()].name }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>

</template>

<style>
@import '../assets/styles/app.css';
</style>

<style>
.item_list_title {
    margin-top: 5px;
    font-weight: bold;
}

.sport_item {
    padding: 5px;
    /* border: solid 1px gray;
    width: auto;
    margin: auto; */
}

@media screen and (max-width: 700px) {
  #map {
    width: 80%;
    height: 30%;
  }
}

</style>
