import { defineStore } from 'pinia'

export const useBusStopStore = defineStore('busStopInfo', {
    state: () => ({
        busInfo: [],
        busStops: [],
        routesStops: [],
        routeBusStops: [],
        routeInfoDetails: [],
        routeAlphabets: [],
        userLocation: [],
        nearStops: [],
    }),
    actions: {
        // fetch all bus info
        async getAllBusInfo() {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/route/");
            this.busInfo = await res.json();
            this.filterAlphabet();
        },
        // fetch all bus stops
        async getAllBusStops() {
            const allBusStopsRes = await fetch('https://data.etabus.gov.hk/v1/transport/kmb/stop');
            this.busStops = await allBusStopsRes.json();
            // this.getUserLocation();  
            this.getUserNearStops();        
        },
        // fetch all route stops
        async getAllRoutesStops() {
            const allRoutesStops = await fetch('https://data.etabus.gov.hk/v1/transport/kmb/route-stop');
            this.routesStops = await allRoutesStops.json();
        },
        // fetch this bus route stops
        async getRouteBusStop(route: any, bound: any, serviceType: any) {
            const routeBusStopRes = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${bound}/${serviceType}`);
            this.routeBusStops = await routeBusStopRes.json();
            this.filterStopsId();
        },
        // filter stop details from busStops[]
        async filterStopsId() {
            var stateRouteBusStops = await JSON.parse(JSON.stringify((this.routeBusStops as any).data));
            var stateBusStops = await JSON.parse(JSON.stringify((this.busStops as any).data));

            stateRouteBusStops.forEach((routeStop: any) => {
                var stop = routeStop.stop;
                (stateBusStops as any).filter((busStop: any) => {
                    if (busStop.stop === stop) {
                        routeStop.info = busStop;
                        (this.routeInfoDetails as any).push(routeStop);
                    }
                })
            })
        },
        // filter letter in bus route 
        async filterAlphabet() {
            var stateBusInfo = await JSON.parse(JSON.stringify((this.busInfo as any).data))
            stateBusInfo.forEach((stops: any) => {
                if (stops.route.match(/[a-zA-Z]/) && !(this.routeAlphabets as any).includes(stops.route.match(/[a-zA-Z]/)[0])) {
                    (this.routeAlphabets as any).push(stops.route.match(/[a-zA-Z]/)[0]);
                }
            });
            this.routeAlphabets.sort();
        },
        // Get user location 
        getUserLocation() {
            // var userLocation: any = [];
            const success = (pos: any) => {
                const crd = pos.coords;
                (this.userLocation as any) = {lat: crd.latitude, long: crd.longitude};
            }
            function error(err: any) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error);

        },
        async getUserNearStops() {
            this.getUserLocation();
            function calDist(userLat: any, userLong: any, stopLat: any, stopLong: any, unit: any) {
                var radlat1 = Math.PI * userLat/180
                var radlat2 = Math.PI * stopLat/180
                var theta = userLong-stopLong
                var radtheta = Math.PI * theta/180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                  dist = 1;
                }
                dist = Math.acos(dist)
                dist = dist * 180/Math.PI
                dist = dist * 60 * 1.1515
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return dist
            }
            var stateBusStops = await JSON.parse(JSON.stringify((this.busStops as any).data));
            // console.log(this.busStops)
            // console.log(stateBusStops)
            var stateUserLocation: any = await JSON.parse(JSON.stringify(this.userLocation));
            // console.log(JSON.parse(JSON.stringify(this.userLocation)));
            var stateRoutesStops = await JSON.parse(JSON.stringify((this.routesStops as any).data))
            // console.log(JSON.stringify((this.routesStops as any).data));
            

            // for (var i = 0; i < stateBusStops.length; i++) {
            //     if (calDist(stateUserLocation.lat, stateUserLocation.long, stateBusStops[i].lat, stateBusStops[i].long, "K") <= 0.5) {
            //         // console.log(stateBusStops[i].stop);
            //         (stateRoutesStops as any).filter((stop: any) => {
            //             if(stateBusStops[i].stop === stop.stop && !(this.nearStops as any).includes(stop.route)) {
            //                 (this.nearStops as any).push(stop.route);
            //             } else {
            //                 console.log("error");
                            
            //             }
            //         })
            //      }
            // }
        }
    },
})