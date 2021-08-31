import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {
            defaultCards: [{
                index: 1,
                name: 'Oleg',
                desc: 'po skidke',
                imgLink: 'https://s0.rbk.ru/v6_top_pics/media/img/7/78/755953432670787.jpg',
                cost: 2
            }],
            cards: [],
        }
    },
    mutations: {
        /**
         * Обновить localStorage до актуального состояния
         * @state defaultCards
         */
        updateLocal(state) {
            const parsed = JSON.stringify(state.defaultCards);
            localStorage.setItem('defaultCards', parsed);
            console.log('Current cards', state.defaultCards)
            console.log('updated');
            console.log(parsed);
        },
        /**
         *  Наполняет хранилище данными из памяти
         *  @state defaultCards
         */
        // parseLocal (state) { // state нужен для доступа к объектам выше.
        //   // if (localStorage.getItem('defaultCards')) {
        //   //   console.log('ты пидор');
        //   // }
        //   return state.defaultCards = JSON.parse(localStorage.getItem('defaultCards'));
        // },
        /**
         * @state cards
         * Сортирует карточки по функции*/
        sortCards(state, func) {
            console.log(state.cards);
            return state.cards.sort(func); // Сортировку походу тоже надо делать через action
        },
        /**
         * @state cards
         * Обнуляет временное хранилище*/
        toNull(state) {
            return state.cards = [];
        },

        // Remove | Add
        /**
         * @state cards
         * Добавляет новую карточку товара во временный массив
         * @param state
         * @param item {object} - {index, name, desc, imgLink, cost}
         */
        add(state, item) {
            state.cards.unshift(item); // Добавление в начало списка.
        },
        /**
         * @state all cards arrays
         * Добавляет новую карточку товара во все массивы
         * @param state
         * @param item {object} - {index, name, desc, imgLink, cost}
         */
        addAll(state, item) {
            state.defaultCards.unshift(item);
            state.cards.unshift(item);
        },
        /**
         * @state one of arrays
         * Удаляет карточку с указанным индексом в определённом массиве.
         * @param state
         * @param index {number}
         * @param arr {string} - cards | defaultCards
         */
        removeCard(state, index, arr) {
            if (arr === 'cards') {
                state.cards.splice(index, 1);
            } else if (arr === 'defaultCards') {
                state.cards = state.defaultCards.splice(index, 1); // проверить работу удаления. ****
            }

        },
    },
    getters: {
        defaultCards(state) {
            return state.defaultCards;
        },
        defaultLength(state) {
            return state.defaultCards.length; // если заменить defaultCards на cards, то всё чинится, но СХУЯЛИ. Короче, судя по всему, где то насралось во взаимодействии с defaultCards, поэтому меня шлют нахуй. По итогу прикол был с parseLocal. Как-то косячно создаётся localStorage. Надо переписать через action.
        }
    },
    actions: {},
    modules: {}
})
