import { defineStore } from 'pinia'

export const useBusStore = defineStore("busInfo", {
    state: () => ({ busInfo: [] }),
    actions: {
        async getAllBusInfo() {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/route/");
            this.busInfo = await res.json();
            // console.log(this.busInfo)
        }
    }
})

