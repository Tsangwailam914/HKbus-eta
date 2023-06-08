<template>
    <v-app>
        <!-- top navigation  -->
        <v-app-bar flat>
            <v-app-bar-title>{{ route.path === "/" ? $t('home') : route.name.startsWith("search") ? $t('search') : route.name.startsWith("route-bound-serviceType") ? route.params.route : "-" }}</v-app-bar-title>
            <!-- <v-btn icon>
                <v-icon icon="mdi-magnify"></v-icon>
            </v-btn> -->
            <v-btn @click="langSwitch">
                <span class="lang-switch">{{ $t('langSwitch') }}</span>
            </v-btn>
            <v-btn icon>
                <v-icon icon="mdi-dots-vertical"></v-icon>
            </v-btn>
        </v-app-bar>

        <!-- content  -->
        <slot />

        <!-- bottom navigation  -->
        <v-bottom-navigation flat>
            <v-btn to="/">
                <v-icon icon="mdi-home"></v-icon>
                {{ $t('home') }}
            </v-btn>
            <v-btn to="/search">
                <v-icon icon="mdi-magnify"></v-icon>
                {{ $t('search') }}
            </v-btn>
            <v-btn>
                <v-icon icon="mdi-timer"></v-icon>

            </v-btn>
            <v-btn>
                <v-icon icon="mdi-map-marker"></v-icon>
                {{ $t('map') }}
            </v-btn>
            <v-btn>
                <v-icon icon="mdi-cog"></v-icon>
                {{ $t('footerSettings') }}
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale, setLocale } = useI18n()

// change lang function 
function langSwitch() {
    if (locale.value === 'tc') {
        setLocale('en')
    } else if (locale.value === 'en') {
        setLocale('tc')
    }
}

var route = useRoute();
// 
</script>

<style>
.v-application {
    background: #118597;
}
.v-toolbar,
.v-bottom-navigation {
    max-width: 500px;
    left: 50% !important;
    transform: translateX(-50%) !important;
}
.lang-switch,
.v-app-bar-title {
    font-weight: bold;
}
</style>