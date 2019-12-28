import { configure } from 'mobx';
import { HistoryAdapter } from 'mobx-state-router';
import { RootStore } from './stores';
import { history } from './utils';

function initMobX() {
    // Enable strict mode for MobX.
    // This disallows state changes outside of an action.
    configure({ enforceActions: 'observed' });
}

function initStores() {
    // Create the rootStore
    const rootStore = new RootStore();
    rootStore.init();

    // Observe history changes
    const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
    historyAdapter.observeRouterStateChanges();

    return rootStore;
}

export function initApp() {
    initMobX();
    return initStores();
}
