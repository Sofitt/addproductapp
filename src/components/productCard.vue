<template>
  <div class="product__card">
    <div class="product__card-action-menu">
      <button id="action-menu__remove" type="submit" class="product__cardRemove" @click="removeProduct($event.target)">
        <img src="../assets/svg/removeTry.svg" alt="" class="remove">
      </button>
    </div>
    <div class="product__info">
      <img class="product__img" :src="this.item.imgLink" alt="Изображение товара">
      <div class="product__inner">
        <h3 class="product__name">
          {{this.item.name}}
        </h3>
        <p class="product__desc">
          {{this.item.desc}}

        </p>
        <span class="product__cost"><span class="product__cost">
          {{this.item.cost}}

        </span> руб.</span>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: 'productCard',
  props: ['cards', 'item'],
  data: function () {
    return {
      counter: 0,
      img: this.cards[0].imgLink,
      name: this.cards[0].name,
      desc: this.cards[0].desc,
      cost: this.cards[0].cost,
      // cards: [{
      //   name: 'Кирпич',
      //   desc: 'Роскошный кирчик нежно-розового цвета',
      //   imgLink: '<img class="product__img" src="https://www.zsm-altair.ru/sites/default/files/moskva_krasnyy_loft_razreshenie_obrez.jpg" alt="">',
      //   cost: '10 000',
      // }],
    }
  },
  methods: {
    removeProduct: function (target) {
      if (target.className === 'product__cardRemove' || target.className === 'remove') {
        target.parentNode.parentNode.parentNode.remove();
      } else {
        console.error('EventListener расположен на неправильном элементе или указывает на неверный родитель:')
        console.error(target);
      }
    },
//     imgPut(item) {
// let imgLocation = document.getElementsByClassName('product__info');
//       imgLocation.innerHTML += item;
//       return item.this.imgPut;
//     }
  },
  mounted: function () {
    console.log('product', this.cards);

  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/style";

</style>