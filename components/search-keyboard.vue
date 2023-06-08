<template>
    <!-- keyboard wrapper  -->
    <div class="custom-keyboard">
        <!-- numbers input  -->
        <div class="numbers-input">
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                :value="1" 
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                >1</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)" 
                :value="2">2</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="3">3</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="4">4</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="5">5</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="6">6</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="7">7</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="8">8</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="9">9</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn icon block rounded="0" variant="flat" disabled>
                    <v-icon icon="mdi-cancel"></v-icon>
                </v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)"
                :value="0">0</v-btn>
            </div>
            <div class="btn-wrapper">
                <v-btn icon block rounded="0" variant="flat" disabled>
                    <v-icon icon="mdi-backspace-outline"></v-icon>
                </v-btn>
            </div>
        </div>
        <!-- letters input  -->
        <div class="letters-input">
            <div v-for="letter in routeAlphabets" class="btn-wrapper">
                <v-btn :value="letter" block rounded="0" variant="flat"
                @click="$emit('update:customKeyboard', customKeyboard + $event.target.innerText)">{{ letter }}</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBusStopStore } from "../store/busStop";
import { storeToRefs } from "pinia";

const store = useBusStopStore();
const { routeAlphabets } = storeToRefs(store);


defineProps({
    customKeyboard: String
})

defineEmits(['update:customKeyboard'])


</script>

<style>
.custom-keyboard {
    display: flex;
    height: 30vh;
    overflow: hidden;
}
.letters-input {
    overflow: auto;
    width: 30%;
}
.btn-wrapper {
    display: flex;
    align-items: center;
}
.custom-keyboard button{
    font-weight: bold;
    font-size: 20px;
}
.numbers-input {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 70%;
}
</style>