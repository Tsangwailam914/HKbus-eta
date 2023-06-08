<template>
    <NuxtLayout name="default">
        <v-expansion-panels variant="accordion" class="pt-16 pb-14">
            <v-expansion-panel v-for="stop in routeInfoDetails" :key="stop.stop">
                <v-expansion-panel-title>
                    <v-list line="two" class="pa-0 bg-transparent">
                        <v-list-item class="pa-0">
                            <v-list-item-title>
                                {{ stop.seq }}.
                                {{ $i18n.locale === "tc" ? stop.info.name_tc : $i18n.locale === "en" ? stop.info.name_en : stop.info.name_tc }}
                            </v-list-item-title>
                            <!-- <v-list-item-subtitle>車費: $14.2</v-list-item-subtitle> -->
                            <template v-slot:append>
                            <v-btn icon flat variant="plain"
                            :href="`https://maps.google.com/maps?q=`+stop.info.lat+`,`+stop.info.long"
                            target="_blank">
                                <v-icon icon="mdi-navigation-variant-outline"></v-icon>
                            </v-btn>
                        </template>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <stop-eta :stop_id="stop.stop" :bus_route="stop.route" :bus_service_type="stop.service_type"></stop-eta>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </NuxtLayout>
</template>


<script setup>
import { useBusStopStore } from '../store/busStop';
import { storeToRefs } from "pinia";

const store = useBusStopStore();
// store.$reset();
// const { busStops } = storeToRefs(store);
// const { routeBusStops } = storeToRefs(store);

const { getRouteBusStop } = store;
const { routeInfoDetails } = storeToRefs(store);


onMounted(() => {
    store.routeInfoDetails = [];
    getRouteBusStop(busRoute, bound, serviceType);
})

var route = useRoute();

// get route direction from param
var bound = route.params.bound;
// convert direction value
if (bound === 'I') {
    bound = 'inbound';
} else if (bound === 'O') {
    bound = 'outbound';
}

// get bus route from route
const busRoute = route.params.route;

// get bus service type from route
const serviceType = route.params.serviceType;

</script>

<style>
.v-expansion-panels {
    max-width: 500px;
    margin: auto;
}
</style>