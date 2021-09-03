import {priceMask} from "@/backend/priceMask";

export default {
    state() {
        return {
            defaultCards: [{
                index: 0,
                name: 'Oleg',
                desc: 'po skidke',
                imgLink: 'https://s0.rbk.ru/v6_top_pics/media/img/7/78/755953432670787.jpg',
                cost: 1
            },
                {
                    index: 1,
                    name: 'Petya',
                    desc: 'po skidke',
                    imgLink: 'https://s0.rbk.ru/v6_top_pics/media/img/7/78/755953432670787.jpg',
                    cost: 6
                },
                {
                    index: 2,
                    name: 'Vasya',
                    desc: 'po skidke',
                    imgLink: 'https://s0.rbk.ru/v6_top_pics/media/img/7/78/755953432670787.jpg',
                    cost: 4
                }],
            cards: [],
        }
    },
    mutations: {
        /**
         * Обновить localStorage до актуального состояния
         * @state defaultCards
         */
        updateLocalData(state) {
            const parsed = JSON.stringify(state.defaultCards);
            localStorage.setItem('defaultCards', parsed);
            console.log('Current default', state.defaultCards)
            console.log('Current cards', state.cards)
            console.log('updated');
        },
        /**
         *  Забрать данные из localStorage
         *  @state defaultCards
         */
        getLocalData(state) {
            if (localStorage.getItem('defaultCards')) {
                state.defaultCards = JSON.parse(localStorage.getItem('defaultCards'))
            }
        },
        /**
         * Убирает отступы между символами
         * @param state
         */
        resetSpaces (state) {
            state.cards.forEach((card) => card.cost = card.cost.replace(' ', ''))
            state.cards.forEach((card) => console.log(card.cost))
            console.log(state.cards);
        },

        /**
         * @state cards
         * Сортирует карточки по функции*/
        sortCards(state, func) {
            return state.cards.sort(func);
        },
        /**
         * Накладывает на значение маску priceMask
         * @param state
         */
        setSpaces (state) {
          state.cards.forEach((card) => card.cost = priceMask(card.cost));
        },

        /**
         * @state cards
         * Обнуляет временное хранилище*/
        toNull(state) {
            return state.cards = [];
        },

        // Remove | Add
        /**
         * @state all cards
         * Добавляет новую карточку товара во временный массив, либо во все массивы.
         * @param state
         * @param obj {object} - {item: {index, name, desc, imgLink, cost}, type: cards || all}
         */
        addCard(state, obj) {
            if (obj.type === 'cards') {
                state.cards.push(obj.item);
            } else if (obj.type === 'all') {
                state.defaultCards.push(obj.item);
                state.cards.push(obj.item);
            }
        },
        /**
         * @state one of arrays
         * Удаляет карточку с указанным индексом в определённом массиве.
         *
         * @param state
         * @param obj {object} - index, type (cards || default)
         */
        removeCard(state, value) {
            state.cards = state.cards.filter((card) => card.index !== value);
            state.defaultCards = state.defaultCards.filter((card) => card.index !== value);
        },

    },
    getters: {
        defaultCards(state) {
            return state.defaultCards;
        },
        defaultLength(state) {
            return state.defaultCards.length;
        },
        defaultLastCard(state) {
            if (state.defaultCards.length !== 0) {
                return state.defaultCards[state.defaultCards.length-1].index;
            } else return 0

        },
        cards(state) {
            return state.cards;
        },
    },
    actions: {
        async sort (ctx, func) {
            ctx.commit("resetSpaces");
            ctx.commit('sortCards', func);
            ctx.commit('setSpaces');
        },
        async remove(ctx, value) {
            await ctx.commit('removeCard', value);
        }
    },
}