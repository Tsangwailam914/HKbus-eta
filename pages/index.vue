<template>
    <NuxtLayout name="default">
        <v-container class="pt-16 pb-14">
            <v-row align="center" justify="center">
                <v-col>
                    <!-- <v-toolbar title="Application"></v-toolbar> -->

                    <!-- bus arrival time list  -->
                    <v-list lines="two">
                        <v-list-item border="b" v-for="bus in busInfo.data" :key="bus.route"
                            :to="`${bus.route}-${bus.bound}-${bus.service_type}`">
                            <v-list-item-title>
                                <span style="font-size: small; margin-right: 4px">{{ $t('dirDest') }}</span>
                                <span style="font-weight: bold;"> {{ $i18n.locale === 'tc' ? bus.dest_tc : $i18n.locale ===
                                    'en' ? bus.dest_en : bus.dest_tc }} </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>{{ $i18n.locale === 'tc' ? bus.orig_tc : $i18n.locale === 'en' ?
                                bus.orig_en : bus.orig_tc }}</v-list-item-subtitle>
                            <template v-slot:prepend>
                                <v-list-item-title class="pr-6">{{ bus.route }}</v-list-item-title>
                            </template>
                            <!-- <template v-slot:append>
                                <v-list-item class="pa-0" min-height="0" v-for="time in times" :key="time.first"
                                    :title="time.first" :subtitle="time.second">

                                </v-list-item>
                            </template> -->
                        </v-list-item>
                    </v-list>

                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>

<script setup>

import { useBusStopStore } from "../store/busStop";
import { storeToRefs } from "pinia";

const store = useBusStopStore();
const { busInfo } = storeToRefs(store);
const { userLocation } = storeToRefs(store);
const { getAllBusInfo } = store;
const { getAllBusStops } = store;
const { getUserNearStops } = store;
const { getAllRoutesStops } = store;

const { nearStops } = storeToRefs(store);

onMounted(() => {
    getAllBusInfo();
    getAllBusStops();
    getUserNearStops();
    getAllRoutesStops()
});

console.log( nearStops)

</script>

<style>
.v-container {
    max-width: 500px;
}
</style>