import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';


export default class Maps extends Plugin {

    init() {
        this._generateMap();
    }

    _generateMap() {
        const geoLat = DomAccess.getDataAttribute(this.el, 'lat');
        const geoLong = DomAccess.getDataAttribute(this.el, 'long');
        const description = DomAccess.getDataAttribute(this.el, 'description');
        const mapboxStyle = DomAccess.getDataAttribute(this.el, 'mapbox');
        const zoom = DomAccess.getDataAttribute(this.el, 'zoom');
        const language = DomAccess.getDataAttribute(this.el, 'language');
        const apiKey = DomAccess.getDataAttribute(this.el, 'token');

        mapboxgl.accessToken = apiKey;

        const map = new mapboxgl.Map({
            container: this.el,
            style: mapboxStyle,
            center: [geoLat, geoLong],
            zoom: zoom,
            attributionControl: false
        });

	map.addControl(new MapboxLanguage({
		defaultLanguage: language
		}));

        new mapboxgl.Marker().setLngLat([geoLat, geoLong]).addTo(map);

	if (description){
        new mapboxgl.Popup({ closeOnClick: false, offset: 40 })
            .setLngLat([geoLat, geoLong])
            .setHTML(description)
            .addTo(map);
	};


    }
}
