<template>
  <div id="app">
    <div class="wrapper __container">
      <header class="product">
        <h1 class="product__title">Добавление товара</h1>
        <div id="sortList" class="product__sort" @click="expand()">
          <a class="product__sortBtn __current" v-if="showSort === false">
            {{ sortType.name }}
            <i id="arrow" class="arrow down"></i>
          </a>
          <span class="product__sortBtn default"
                :style="isShowSort"
                @click="toSort('default')">По умолчанию</span>
          <span class="product__sortBtn toMax"
                :style="isShowSort"
                @click="toSort('toMax')">По возрастанию цены</span>
          <span class="product__sortBtn toMin"
                :style="isShowSort"
                @click="toSort('toMin');">По убыванию цены</span>
        </div>
      </header>
      <div class="product__main">

        <addPanel :defaultCards="defaultCards" :cards="cards"></addPanel>
        <div class="product__list">
          <span class="empty" v-if="!defaultCards[0]">Список пуст. Добавьте товар</span>
          <productCard :defaultCards="defaultCards" :cards="cards" :item="item" :key="item" v-for="item in sortedCards"></productCard>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import addPanel from './components/addPanel'
import productCard from './components/productCard'

export default {
  name: 'App',
  components: {
    addPanel, productCard,
  },
  data: function () {
    return {
      defaultCards: [],
      cards: [],
      showSort: false,
      isShowSort: 'display: none',
      sortType: {name: 'По умолчанию', type: 'default'},
    }
  },
  methods: {
    expand: function () {
      const sortList = document.getElementById('sortList');
      sortList.classList.toggle('__active');
      this.showSort = !this.showSort;
    },
    toSort: function (type) {
      if (type === 'default') {
        this.sortType = {name: 'По умолчанию', type: 'default'};
      } else if (type === 'toMax') {
        this.sortType = {name: 'По возрастанию цены', type: 'toMax'};
      } else if (type === 'toMin') {
        this.sortType = {name: 'По убыванию цены', type: 'toMin'};
      }
    }
  },
  watch: {
    defaultCards: function () {
      const parsed = JSON.stringify(this.defaultCards);
      localStorage.setItem('defaultCards', parsed);
      console.log('Current cards', this.defaultCards)
    },
    cards: function () {

    },
    showSort: function (state) {
      if (state === true) {
        this.isShowSort = 'display: flex; justify-content: center';
      } else {
        this.isShowSort = 'display: none';
      }
    },
  },
  computed: {
    sortedCards: function () {

      if (this.sortType.type === 'default') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.defaultCards = JSON.parse(localStorage.getItem('defaultCards'));
      }
      if (this.sortType.type === 'toMax') {
        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.cost > b.cost) {
                return 1
              }
              if (a.cost < b.cost) {
                return -1
              }
        }

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.cards.sort(compare)
      }
      if (this.sortType.type === 'toMin') {
        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.cost < b.cost) {
            return 1
          }
          if (a.cost > b.cost) {
            return -1
          }
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.cards.sort(compare)
      }
      return 0
    }

  },
mounted() {
  if (localStorage.getItem('defaultCards')) {
    try {
      this.defaultCards = JSON.parse(localStorage.getItem('defaultCards'));
    } catch (e) {
      console.error('ERROR localStorage.getItem: ', e);
      localStorage.removeItem('defaultCards');
    }
    this.cards = [];
    for (let item of this.defaultCards) {
      this.cards.push(item);
    }
  }
}
}

</script>

<style lang="scss">
@import "assets/scss/icon";
@import "assets/scss/animation";
@import "assets/scss/style";
@import "assets/scss/null";
@import "assets/scss/container";

#app {
  background: rgba(255, 254, 251, 0.8);

  .wrapper {

    .product {
      position: absolute;
      transform: translate(-32px);
      z-index: 1;
      top: 16px;
      display: flex;
      flex-flow: row;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      max-width: 1440px;
      max-height: 36px;
      padding: 0px 32px;
      margin: 16px auto;
      background: rgba(255, 254, 251, 0.8);
      &__title {
        display: inline-block;
        height: 36px;

        font-size: 28px;
        font-style: normal;
        font-weight: 600;
        line-height: 35px;
        letter-spacing: 0em;
        text-align: left;
      }

      &__sort {
        //position: fixed;
        //top: 16px;
        //margin: 0px 0px 0px 1255px;
        z-index: 11;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        //padding: 0px 16px;
        background: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        width: 121.5px;
        height: 36px;
        cursor: pointer;

        &:hover {
          border: 1px solid #c5c5c5;
        }

        &.__active {
          z-index: 10;
          display: block;
          height: 109px;

          &:hover {
            border: 0;
          }
        }

        &Btn {
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          height: 36px;
          width: 121.5px;
          margin-top: 0px;
          color: #3f3f3f;
          cursor: pointer;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 15px;
          letter-spacing: 0em;
          text-align: left;

          &:first-child > .__current {
            margin-top: 0;
            color: #B4B4B4;
            &:hover {

            }
          }

          &:hover {
            background: #e5e5e5;
          }

          &.__current {
            display: flex;
            align-items: center;
            padding: 0px 16px;
            color: #B4B4B4;
          }

        }

        .arrow {
          position: relative;
          top: 0px;
        }
      }

      &__main {
        z-index: -1;
        margin: 68px 0px 0px 0px;
        display: flex;
        flex-flow: row;

        .panel {
          margin-top: 16px;
          position: sticky;
          top: 24px;
          // Сообщение об ошибке при заполнении
          .requireErr {
            color: #FF8484;
            margin: 4px 0px 0px 0px;
            position: absolute;
            transform: translate(0, 52px);
            font-size: 8px;
            font-style: normal;
            font-weight: 400;
            line-height: 10px;
            letter-spacing: -0.02em;
            text-align: left;
          }
        }
      }

      &__list {

        padding-top: 16px;
        margin: 0px 0px 0px 16px;
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        flex-basis: 100%;

        @include transitionAll();
        //transition: all 0.3s ease 0s;
      }

      &Card {
        margin: 0 16px 16px;
      }

      &__card {

      }
    }
  }
}

@media (max-width: 1283px) {
  #app {
    .wrapper {
      .product {
        &__list {
          flex-flow: column;
        }
      }
    }
  }
}

@media (max-width: 844px) {
  #app .wrapper .product {
    top: -4px;
    padding-right: 32px;
    justify-content: flex-end;
  }
  #app .wrapper .product__title {
    display: none;
  }
  #app .wrapper .product__main {
    margin-top: 45px;
  }
  #app .wrapper .product__main .panel {
    position: absolute !important;
    padding: 14px;
    z-index: 100;
    top: -390px;
    left: 0px;
    box-shadow: none;
    background: rgba(255, 255, 255, 0);
    @include transitionAll();
    //transition: all 0.3s ease 0s;
    &:hover {
      position: fixed !important;
      top: -20px;
      background: rgba(255, 255, 255, 1);
      overflow-y: auto;
      height: 300px;
    }

    &:hover > #submit {
      display: block !important;
      transform: translate(0px, 0px);
      min-height: 36px;

      &:hover {
        background: rgb(88, 153, 77);
        color: rgb(255, 255, 255);

        @include transitionAll();
      }

      &:disabled, &[disabled] {
        background: #EEEEEE;
        color: rgba(180, 180, 180, 1);
        cursor: default;
      }

    }

    &__button {
      transform: translate(-8px, 28px);
      background: rgba(123, 174, 115, 1);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 1);
    }
  }
}

@media (max-width: 768px) {
  #app .wrapper .product {
    margin-left: 32px;
    padding-right: 16px;
  }
}
@media (max-width: 494px) {
  #app .wrapper .product__list {
    max-width: 100%;
  }
}
</style>


