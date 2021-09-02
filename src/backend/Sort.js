export class Sort {

    constructor() {

    }

    static currentSort (type) {
        if (type === 'default') {
            return {name: 'По умолчанию', type: 'default'};
        } else if (type === 'toMax') {
            return {name: 'По возрастанию цены', type: 'toMax'};
        } else if (type === 'toMin') {
            return {name: 'По убыванию цены', type: 'toMin'};
        }
    }

    static toMaxCost (a, b) {
        if (a.cost > b.cost) {
            return 1
        }
        if (a.cost < b.cost) {
            return -1
        }
    }
    static toMinCost (a, b) {
        if (a.cost < b.cost) {
            return 1
        }
        if (a.cost > b.cost) {
            return -1
        }
    }
}