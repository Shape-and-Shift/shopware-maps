import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'sas-maps',
    label: 'sas-maps.blocks.maps.label',
    category: 'sas',
    component: 'sas-cms-block-maps',
    previewComponent: 'sas-cms-preview-maps',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        sasMaps: 'maps'
    }
});
