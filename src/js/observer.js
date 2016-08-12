'use strict';

export default class Observer {
    constructor() {
        const observers = [];
        this.add = function(item) {
            observers.push(item);
        }

        this.removeAll = function() {
            observers.length = 0;
        }

        this.notify = function() {
            observers.forEach(elem => {
                elem.notify();
            })
        }
    }
}