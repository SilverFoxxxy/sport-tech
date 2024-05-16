<script setup>
import { ref } from 'vue';

const elements = ref([
  { id: 0, name: 'Турник' },
  { id: 1, name: 'Брусья' },
  { id: 2, name: 'Лестница' }
]);
</script>

<template>
  <div>
    Площадка А
  </div>

  Спорт снаряды:
    <ul>
        <li v-for="element in elements" :key="element.id">
            {{ element.name }}
            <!-- <button @click="showExercises(element.name)"> {{ element.name }} </button> -->
        </li>
    </ul>

</template>
