import Maps from './sas-maps/sas-maps.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('Maps', Maps, '[data-maps]');

if (module.hot) {
    module.hot.accept();
}
