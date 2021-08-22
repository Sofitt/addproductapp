<template>
  <div id="app">
    <div class="wrapper __container">
      <header class="product">
        <h1 class="product__title">Добавление товара</h1>
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
      }],
    }
  },
  watch: {
    cards: function () {
      console.log('cards', this.cards);
    }
  }
}

</script>

<style lang="scss">
@import "assets/scss/style";
@import "assets/scss/null";
@import "assets/scss/container";
@import "assets/scss/before";

#app {
  //background: rgba(255, 254, 251, 0.8);


  .wrapper {
    background: rgba(255, 188, 0, 0.8);
    //margin: 0 auto;
    //padding: 0 32px;
    //width: 1440px;

    .product {
      margin: 16px 0px 0px 0px; //b 16px
      &__title {
        display: inline-block;

        font-size: 28px;
        font-style: normal;
        font-weight: 600;
        line-height: 35px;
        letter-spacing: 0em;
        text-align: left;
      }

      &__main {
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
        //justify-content: flex-end;
        align-items: flex-start;
        flex-basis: 100%;
        //width: 1028px;
        //height: 825px;
        //overflow: auto;
      }

      &Card {
        margin: 0 16px 16px;
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
    padding: 16px;
    z-index: 100;
    top: -390px;
    left: 40px;
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
      transform: translate(0px, 0px) scaleY(1.5);
      height: 42px;
    }
    &__button {
      transform: translate(-8px, 28px);
    }
  }
}
</style>


