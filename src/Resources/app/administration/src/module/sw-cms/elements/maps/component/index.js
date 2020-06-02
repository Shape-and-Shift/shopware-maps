import template from './sw-cms-el-maps.html.twig';
import './sw-cms-el-maps.scss';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-maps', {
    template,

    inject: ['systemConfigApiService'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            apiKey: null,
            isLoading: true,
            isEmpty: false
        };
    },

    created() {
        this.createdComponent();
    },


    methods: {
        createdComponent() {
            this.initElementConfig('maps');
            this.getApiKey().then((config) => {
                if (this.checkIfEmpty(config["SasMaps.config.mapboxApiKey"])) {
                    this.isEmpty = true;
                    this.isLoading = false;
                } else {
                    this.createMap();
                }
            });
        },
        getApiKey() {
            return this.systemConfigApiService.getValues('SasMaps.config');
        },
        checkIfEmpty(obj) {
            return !obj || Object.keys(obj).length === 0;
        },
        createMap() {
            const systemConfigApiService = Shopware.Service('systemConfigApiService');

            return systemConfigApiService.getValues('SasMaps.config')
                .then((response) => {
                    return response['SasMaps.config.mapboxApiKey'];
                })
                .then((token) => {
                    this.isEmpty = false;
                    this.isLoading = false;
                    return token;
                })
                .then((token) => {
                    mapboxgl.accessToken = token;

                    const map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [this.element.config.geoLat.value, this.element.config.geoLong.value],
                        zoom: 13
                    });

                    const marker = new mapboxgl.Marker().setLngLat([this.element.config.geoLat.value, this.element.config.geoLong.value]).addTo(map);

                    const geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl
                    });

                    map.addControl(geocoder, 'top-left');

                    map.on('load', () => {
                        geocoder.on('result', (ev) => {
                            this.element.config.geoLat.value = ev.result.geometry.coordinates[0];
                            this.element.config.geoLong.value = ev.result.geometry.coordinates[1];

                            marker.setLngLat([this.element.config.geoLat.value, this.element.config.geoLong.value]);
                        });
                    });

                    const popup = new mapboxgl.Popup({ closeOnClick: false, offset: 40 })
                        .setLngLat([this.element.config.geoLat.value, this.element.config.geoLong.value])
                        .setHTML(this.element.config.description.value)
                        .addTo(map);
                })
                .catch((error) => {
                    this.isEmpty = true;
                    this.isLoading = false;
                });
        }
    }
});
