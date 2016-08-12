'use strict';

export default class Observer {
    constructor() {
        this._observers = [];
    }

    add(item) {
        this._observers.push(item);
    }

    removeAll() {
        this._observers = [];
    }

    notify() {
        this._observers.forEach(elem => {
            elem.notify();
        })
    }
}