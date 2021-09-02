<template>
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
      <addPanel></addPanel>
      <transition-group name="list-complete" class="product__list">
        <span class="empty" v-if="defaultCardsLength === 0">Список пуст. Добавьте товар</span>

        <productCard class="list-complete-item" :item="item" :key="item.index"
                     v-for="item in sortedCards"></productCard>
      </transition-group>

    </div>

  </div>
</template>

<script>
import addPanel from "@/components/addPanel";
import productCard from "@/components/productCard";
import {Sort} from "@/backend/Sort";

export default {
  name: "main",
  components: {
    addPanel, productCard,
  },
  data: function () {
    return {
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
      this.sortType = Sort.currentSort(type);
    },
    reCreateCards: function () {
      this.$store.commit('toNull');
      for (let item of this.defaultCards) {
        this.$store.commit('addCard', {item: item, type: 'cards'});
      }
    }
  },
  computed: {
    sortedCards: function () {
      if (this.sortType.type === 'default') {
        return this.defaultCards;
      }
      if (this.sortType.type === 'toMax') {
        this.$store.commit('sortCards', Sort.toMaxCost);
        return this.cards
      }
      if (this.sortType.type === 'toMin') {
        this.$store.commit('sortCards', Sort.toMinCost);
        return this.cards
      }
      return 0
    },
    defaultCards() {
      return this.$store.getters.defaultCards;
    },
    defaultCardsLength() {
      return this.$store.getters.defaultLength;
    },
    cards() {
      return this.$store.getters.cards;
    },

  },
  watch: {
    defaultCardsLength: function () {
      this.$store.commit('updateLocalData');
    },
    showSort: function (state) {
      if (state === true) {
        this.isShowSort = 'display: flex; justify-content: center';
      } else {
        this.isShowSort = 'display: none';
      }
    },
  },
  mounted() {
    this.reCreateCards()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/icon";
@import "../assets/scss/animation";
@import "../assets/scss/style";
@import "../assets/scss/null";
@import "../assets/scss/container";

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
      z-index: 11;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
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

.empty {
  position: absolute;
}

// List Animation
.list-complete-item {
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}

.list-complete-leave-active {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  transform: translateY(300px);

  @media (max-width: 1283px) {
    top: 0;
    left: 0;
    bottom: unset;
    right: unset;
    transform: translateY(0);
  }
}

// Adaptive
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