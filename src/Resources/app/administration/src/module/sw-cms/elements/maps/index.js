import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'maps',
    label: 'sas-maps.elements.mapsElement.label',
    component: 'sw-cms-el-maps',
    configComponent: 'sw-cms-el-config-maps',
    previewComponent: 'sw-cms-el-preview-maps',
    defaultConfig: {
        geoLat: {
            source: 'static',
            value: -0.15833
        },
        geoLong: {
            source: 'static',
            value: 51.52333
        },
        zoom: {
            source: 'static',
            value: 9
        },
        language: {
            source: 'static',
            value: 'en'
        },
        mapboxStyle: {
            source: 'static',
            value: 'mapbox://styles/mapbox/light-v10'
        },
        description: {
            source: 'static',
            value: null
        }
    }
});
