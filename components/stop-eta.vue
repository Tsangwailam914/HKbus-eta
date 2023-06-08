<template>
    <div v-for="eta in (stopEta.data || '').slice(0, 3)">
        <span style="font-weight: bold; margin-right: 4px;">{{ Math.round((new Date(eta.eta) - new Date(eta.data_timestamp)) / 60000) > 0 ? Math.round((new Date(eta.eta) - new Date(eta.data_timestamp)) / 60000) : Math.round((new Date(eta.eta) - new Date(eta.data_timestamp)) / 60000) <= 0 ? $t('arrive') : "-" }}</span>
        <span>{{ Math.round((new Date(eta.eta) - new Date(eta.data_timestamp)) / 60000) > 0 ? $t('minutes') : '' }}</span>
    </div>
</template>

<script>
export default {
    props: ['stop_id', 'bus_route', 'bus_service_type'],
    data() {
        return {
            stopEta: [],
            interval: null
        }
    },
    methods: {
        // fetch eta 
        async getEta() {
            const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${this.stop_id}/${this.bus_route}/${this.bus_service_type}`);
            this.stopEta = await res.json();
        }
    },
    created() {
        this.getEta();
        // refresh data every 15s
        this.interval = setInterval(() => {
            this.getEta()
        }, 15000)
    },
    destroyed(){
    clearInterval(this.interval)
  }

}


</script>