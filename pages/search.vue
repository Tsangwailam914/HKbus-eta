<template>
    <NuxtLayout name="default">
        <v-container class="pt-16 pb-14">
            <!-- search bar  -->
            <v-text-field placeholder='Route' hide-details="auto" variant="underlined"
                v-model="searchInput"></v-text-field>
            <!-- bus list  -->
            <v-row align="center" justify="center">
                <v-col cols='12'>
                    <RecycleScroller class="scroller" :items="searchFilter()" :item-size="72" v-slot="{ item }">
                        <v-list lines="two">
                            <v-list-item :to="`${item.route}-${item.bound}-${item.service_type}`">
                                <v-list-item-title>
                                    <span style="font-size: small; margin-right: 4px">{{ $t('dirDest') }}</span>
                                    <span style="font-weight: bold;">{{ $i18n.locale === 'tc' ? item.dest_tc : $i18n.locale === 'en' ? item.dest_en : item.dest_tc }}</span>
                                </v-list-item-title>
                                <v-list-item-subtitle>{{ $i18n.locale === 'tc' ? item.orig_tc : $i18n.locale === 'en' ? item.orig_en : item.orig_tc }}</v-list-item-subtitle>
                                <template v-slot:prepend>
                                    <v-list-item-title class="pr-6">{{ item.route }}</v-list-item-title>
                                </template>
                            </v-list-item>
                        </v-list>
                    </RecycleScroller>
                </v-col>
                <v-col cols="12">
                    <search-keyboard v-model:custom-keyboard="searchInput"></search-keyboard>
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
import { useBusStopStore } from "../store/busStop";
import { storeToRefs } from "pinia";


const store = useBusStopStore();
const { busInfo } = storeToRefs(store);

let searchInput = ref("");

var parseData = JSON.parse(JSON.stringify(busInfo.value.data));
// console.log(busInfo);
// console.log(parseData);


function searchFilter() {
    // assign id for each object 
    parseData.forEach((stops, index) => {
        stops.id = index;
    });
    return parseData.filter((busRoute) =>
        busRoute.route.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    // console.log(parseData.filter((busRoute) =>
    //     busRoute.route.toLowerCase().includes(searchInput.value.toLowerCase())
    // ))
}

</script>

<style>
.v-container {
    background-color: white;
    height: 100%;
}
.scroller {
    height: 40vh;
    overflow-y: auto;
}
</style>