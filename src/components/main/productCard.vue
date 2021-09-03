<template>
  <div class="product__card">
    <div class="product__card-action-menu">
      <button id="action-menu__remove" type="submit" class="product__cardRemove" @click="removeObj();">
        <img src="../../assets/svg/removeTry.svg" alt="" class="remove">
      </button>
    </div>
    <div class="product__info">
      <img class="product__img" :src="this.item.imgLink" onerror="this.onerror=null; this.src='https://content2.rozetka.com.ua/goods/images/big/44928638.jpg'" alt="Изображение товара">
<!--      <img class="product__img" src="" alt="">-->
      <div class="product__inner">
        <h3 class="product__name">
          {{ this.item.name }}
        </h3>
        <p class="product__desc">
          {{ this.item.desc }}
        </p>
        <span class="product__cost"><span class="product__cost">
          {{ this.item.cost }}
        </span> руб.</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'productCard',
  props: ['item'],
  data: function () {
    return {}
  },
  methods: {
    /**
     * Удаляет объект их массива товаров
     */
    removeObj: function () {
      console.log('+');
      this.$store.dispatch('remove', this.item.index);

    },
  },
  computed: {
    defaultCards() {
      return this.$store.getters.defaultCards;
    },
    cards() {
      return this.$store.getters.cards;
    },
  },
  mounted: function () {

  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/style";

.product {
  &__card {
    display: flex;
    flex-flow: column;
    width: 332px;
    min-height: 423px;
    max-height: 423px;
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    margin-bottom: 16px;
    margin-right: 16px;
    @include transitionAll();

    &:hover {
      transform: translate(0, 0px);
    }

    &:hover > &-action-menu > &Remove {
      display: inline-block;
      z-index: 5;
      transform: translate(316px, -16px);
      background: rgb(255, 132, 132);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background: rgb(255, 81, 81);
      }
    }

    &Remove {
      position: relative;
      transform: translate(300px, -0px);
      background: rgba(0, 0, 0, 0);
      z-index: 0;
      width: 32px;
      height: 32px !important;

      border-radius: 10px;
      @include transitionAll();

      & .remove {
        position: relative;
        height: 32px;
        width: 32px;
      }

    }

    &-action-menu {
      background: rgba(255, 132, 132, 0);
      display: flex;
      flex-flow: column nowrap;
      flex: 0 1;
      flex-basis: 32px;
      width: 100%;
    }
  }

  &__info {
    position: relative;
    transform: translate(0, -32px);
  }

  &__img {
    object-fit: contain;
    object-position: top;
    min-height: 200px;
    width: 332px;
    height: 200px;
    margin: 0px 0px 16px 0px;
  }

  &__inner {
    padding: 0 16px;
  }

  &__name {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0px 0px 16px 0px;

    max-width: 100%;
    max-height: 28px;
    padding-bottom: 5px;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  &__desc {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0px 0px 32px 0px;
    min-height: 90px;
    max-height: 90px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__cost {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    padding: 0 0 24px 0;

  }
}

@media (max-width: 1761px) {
  .product {
    &__card {
      min-height: 423px;
      max-height: 423px;
    }
  }

}

@media (max-width: 1465px) {
  .product {
    &__card {
      width: 246.73px;
      max-height: 390.51px;

      &:hover > &-action-menu > &Remove {
        transform: translate(190px, 10px);
      }
    }

    &__cardRemove {
      transform: translate(190px, 0);
    }

    &__img {
      min-height: 200px;
      max-width: 100%;
      max-height: 100%;
    }
  }
}

@media (min-width: 1155px) {
  .product {
    &__card {
      &:nth-child(3n) {
        margin-right: 0px;
      }
    }
  }
}

@media (max-width: 1397px) {
  .product {
    &__card {
      width: 246.73px;
      min-height: 423px;
      max-height: 423px;
      //overflow-y: auto;
      &:hover > &-action-menu > &Remove {
        transform: translate(106px, 0);
      }
    }

    &__cardRemove {
      transform: translate(106px, 0);
    }

    &__img {
      min-height: 0;
      max-width: 100%;
      max-height: 100%;
    }

    &__inner {
      max-height: 100%;
    }

    &__cost {
      padding-bottom: 0;
    }
  }
}

@media (max-width: 1283px) {
  .product {
    &__card {
      display: flex;
      flex-flow: row;
      width: 635px;
      height: 155px;
      min-height: 0px;
      max-height: 155px;

      &:hover > &-action-menu > &Remove {
        transform: translate(580px, 118px);
        width: 50px;
        z-index: 10;
      }
      &-action-menu {
        flex-flow: row;
        display: block;
        width: 50px !important;
        flex-basis: 50px;
        height: 50px;
      }
    }

    &__cardRemove {
      transform: translate(580px, 118px);
      width: 50px;
      z-index: 10;
      background: #ffa8a8;
    }

    &__img {
      min-height: 0;
      padding: 0;
      max-width: 22%;
      max-height: 85%;
    }

    &__info {
      display: flex;
      padding: 15px 0 0 0;
      width: 100%;
      transform: translate(-32px, 0);
    }

    &__inner {
      height: 144px;
      padding: 0 0 0 16px;
    }

    &__name {
      margin-bottom: 0;
      font-size: 17px;
    }

    &__desc {
      margin-bottom: 0px;
      min-height: 80px;
      max-height: 80px;
    }

    &__cost {
      font-size: 18px;
    }
  }
}

@media (max-width: 1245px) {
  .product {
    &__card {
      display: flex;
      flex-flow: row;
      width: 535px;
      height: 155px;

      &:hover > &-action-menu > &Remove {
        transform: translate(480px, 118px);
        width: 50px;
      }
      &-action-menu {
        flex-flow: row;
        display: block;
        width: 50px !important;
        flex-basis: 50px;
        height: 50px;
      }
    }

    &__cardRemove {
      transform: translate(480px, 118px);
      width: 50px;
      z-index: 10;
      background: #ffa8a8;
    }

    &__img {
      min-height: 0;
      padding: 0;
      max-width: 22%;
      max-height: 85%;
    }

    &__info {
      display: flex;
      padding: 20px 0 0 0;
      width: 100%;
      transform: translate(-32px, 0);
    }

    &__inner {
      height: 144px;
    }

    &__name {
      margin-bottom: 0;
    }

    &__desc {
      margin-bottom: 0px;
    }

    &__cost {
      font-size: 18px;
    }
  }
}

@media (max-width: 924px) {
  .product {
    &__card {
      display: flex;
      flex-flow: row;
      width: 100%;
      height: 155px;

      &:hover > &-action-menu > &Remove {
        transform: translate(0px, 123px);
        width: 50px;
        border-radius: 0;
      }

      &-action-menu {
        flex-flow: row;
        display: block;
        width: 50px !important;
        flex-basis: 50px;
        height: 50px;
      }
    }

    &__cardRemove {
      transform: translate(0px, 123px);
      width: 50px;
      z-index: 10;
      background: #ffa8a8;
      border-radius: 0;
    }

    &__img {
      position: relative;
      padding: 0;
      max-width: 22%;
      max-height: 85%;
    }

    &__info {
      display: flex;
      padding: 20px 0 0 0;
      width: 100%;
      transform: translate(-32px, 0);
    }

    &__inner {
      height: 144px;
    }

    &__name {
      margin-bottom: 0;
    }

    &__desc {
      margin-bottom: 0px;
    }

    &__cost {
      font-size: 18px;
    }
  }
}

@media (max-width: 660px) {
  .product {

    &__img {
      max-height: 100%;
    }

    &__desc {
      max-height: 70px;
    }
  }
}

@media (max-width: 494px) {
  .product__card {
    max-width: 98%;
    width: 98%;
  }
}
</style>