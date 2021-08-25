<template>
  <div id="app">
    <div class="wrapper __container">
      <header class="product">
        <h1 class="product__title">Добавление товара</h1>
        <div id="sortList" class="product__sort" @click="showSort = !showSort; expand()">
          <a class="product__sortBtn __current"><span class="product__sortBtn default">По умолчанию</span><i id="arrow" class="arrow down"></i></a>
          <span class="product__sortBtn default"
                v-if="sortType !== 'default'"
                @click="toSort('default')">По умолчанию</span>
          <span class="product__sortBtn toMax"
                :style="isShowSort"
                v-if="sortType !== 'toMax'"
                @click="toSort('toMax')">По возрастанию цены</span>
          <span class="product__sortBtn toMin"
                :style="isShowSort"
                v-if="sortType !== 'toMin'"
                @click="toSort('toMin')">По убыванию цены</span>
        </div>
      </header>
      <div class="product__main">

        <addPanel :cards="cards"></addPanel>
        <div class="product__list">
          <productCard :cards="cards" :item="item" :key="item" v-for="item in cards"></productCard>
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
      cards: [{
        name: 'Кирпич',
        desc: 'Роскошный кирчик нежно-розового цвета',
        imgLink: 'https://www.zsm-altair.ru/sites/default/files/moskva_krasnyy_loft_razreshenie_obrez.jpg',
        cost: '10 000',
      },
        {
          name: 'JS',
          desc: 'Роскошный JS сочно-жёлтого цвета',
          imgLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/120px-Unofficial_JavaScript_logo_2.svg.png',
          cost: '100 000',
        },
      ],
      sortedCards: [],
      showSort: false,
      isShowSort: 'display: none',
      sortType: 'default',
    }
  },
  methods: {
    expand: function () {
      const sortList = document.getElementById('sortList');
      sortList.classList.toggle('__active');
    },
    toSort: function (type) {
      if (type === 'default') {
        this.sortType = 'default';
        console.log('def');
      } else if (type === 'toMax') {
        this.sortType = 'toMax';
        console.log('max');
      } else if (type === 'toMin') {
        this.sortType = 'toMin';
        console.log('min');
      }
    }
  },
  watch: {
    cards: function () {
      console.log('cards');
      console.log(this.cards[0]);
      const parsed = JSON.stringify(this.cards);
      localStorage.setItem('cards', parsed);
    },
    showSort: function (state) {
      const icon = document.getElementById('arrow');
      const current = document.querySelector('.__current').childNodes[0];
      if (state === true) {
        icon.classList.add('up');
        icon.classList.remove('down');
        icon.style.borderColor = 'rgba(63, 63, 63, 1)';
        icon.style.position = 'relative';
        icon.style.top = '3px';
        current.style.color = 'rgba(63, 63, 63, 1)';
        this.isShowSort = 'display: flex; justify-content: center';
      } else {
        icon.classList.add('down');
        icon.classList.remove('remove');
        icon.style.borderColor = '';
        icon.style.position = '';
        icon.style.top = '';
        current.style.color = '#B4B4B4';
        this.isShowSort = 'display: none';
      }
    }
  },
  mounted() {
    if (localStorage.getItem('cards')) {
      try {
        this.cards = JSON.parse(localStorage.getItem('cards'));
      } catch (e) {
        console.error('ERROR localStorage.getItem: ', e);
        localStorage.removeItem('cards');
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
@import "assets/scss/before";



@media (max-width: 1283px) {
  #app {
    .wrapper {
      .product {
        &__list {
          flex-flow: column;
          //justify-content: space-between;
        }
      }
    }
  }
}

@media (max-width: 844px) {
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
      //background: #EEEEEE;
      //color: rgba(180, 180, 180, 1);
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
</style>


