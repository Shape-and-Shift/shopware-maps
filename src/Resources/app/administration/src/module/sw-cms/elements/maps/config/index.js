import template from './sw-cms-el-config-maps.html.twig';

const { Component, Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-config-maps', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('maps');
        }
    }
});
