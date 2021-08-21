<template>
  <div class="product__card">
    <div class="product__card-action-menu">
      <button id="action-menu__remove" type="submit" class="product__cardRemove" @click="removeProduct($event.target)">
        <img src="../assets/svg/removeTry.svg" alt="" class="remove">
      </button>
    </div>
    <div class="product__info">
      <img class="product__img" src="../assets/img/default_image.jpg" alt="">
      <div class="product__inner">
        <h3 class="product__name">Наименование товара</h3>
        <p class="product__desc">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное
          описание товара в несколько строк</p>
        <span class="product__cost">10 000 руб.</span>
      </div>
    </div>

  </div>
</template>
<script>
module.exports = {
  name: 'productCard',
  data: function () {
    return {}
  },
  methods: {
    removeProduct: function (target) {
      if (target.className === 'product__cardRemove' || target.className === 'remove') {
        target.parentNode.parentNode.parentNode.remove();
      } else {
        console.error('EventListener расположен на неправильном элементе или указывает на неверный родитель:')
        console.error(target);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/style";

</style>