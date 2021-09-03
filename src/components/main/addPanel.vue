<template>
  <form class="panel">
    <label class="panel__item">
      <span class="panel__name title">Наименование товара <i class="inputRequired"/></span>
      <input class="panel__name input" v-model="name" type="text" name="name" placeholder="Введите наименование товара"
             required autocomplete="off"
             @keydown.enter="isBlank"
             @keyup="isValid()"
             oninvalid="this.setCustomValidity(' ')"
             oninput="setCustomValidity('')">
    </label>
    <label class="panel__item">
      <span class="panel__desc title">Описание товара</span>
      <textarea cols="30" rows="10" class="panel__desc textarea" v-model="desc" name="desc"
                placeholder="Введите описание товара"></textarea>
    </label>
    <label class="panel__item">
      <span class="panel__link title">Ссылка на изображение товара <i class="inputRequired"/></span>
      <input type="text" class="panel__link input" v-model="imgLink" name="link" placeholder="Введите ссылку" required
             autocomplete="off"
             @keydown.enter="isBlank"
             @keyup="isValid()"
             oninvalid="this.setCustomValidity(' ')"
             oninput="setCustomValidity('')">
    </label>
    <label class="panel__item">
      <span class="panel__cost title">Цена товара <i class="inputRequired"/></span>
      <input id="cost" type="text" class="panel__cost input" v-model="cost" name="cost" placeholder="Введите цену"
             required autocomplete="off"
             @keydown.enter="isBlank"
             @keyup="isValid()"
             @input="$event.target.value = $event.target.value.replace(/[^\d,^\s]/g,''); cost = $event.target.value = $event.target.value.replace('+, -', '');"
             oninvalid="this.setCustomValidity(' ')"
             oninput="setCustomValidity('')">
    </label>
    <button disabled id="submit" class="panel__button" type="submit"
            @keydown.enter.prevent="isBlank"
            @click.prevent="isBlank; createCard()"
            oninvalid="this.setCustomValidity(' ')"
            oninput="setCustomValidity('')">
      Добавить товар
    </button>
  </form>
</template>
<script>
import { inputValidator } from '@/backend/inputValidator';
import { priceMask } from '@/backend/priceMask';

export default {
  name: 'addPanel',
  data: function () {
    return {
      // Elems
      submitButton: '',
      inputs: '',
      // Item
      name: '',
      desc: '',
      imgLink: '',
      cost: '',
    }
  },
  methods: {
    /**
     * Проверяет валидность полей, если true - активирует кнопку
     * */
    isValid: function () {
      inputValidator.isValid(this.inputs, this.submitButton)
    },
    /**
     * При вызове проверяет наличие в поле символов, если false, окрашивает границы поля в красный и выводит сообщение об ошибке.
     */
    isBlank: function () {
      inputValidator.isBlank(this.inputs, this.submitButton)
    },

    /**
     * Создаёт карточку товара, заполняя информацией из инпутов
     */
    createCard: function () {
      const index = this.$store.getters.defaultLastCard + 1;

      this.$store.commit('addCard', {
        item: {
          index: index,
          name: this.name,
          desc: this.desc,
          imgLink: this.imgLink,
          cost: this.cost},
        type: 'all'
      });
      // console.log(this.name, this.desc, this.imgLink, this.cost);

      // Сброс значений
      this.name = this.desc = this.imgLink = this.cost = '';
      this.submitButton.disabled = true;
    },
  },
  mounted: function () {
    this.submitButton = document.querySelector('#submit');
    this.inputs = document.querySelectorAll('.input');
  },
  watch: {
    cost: function () {
      this.cost = priceMask(this.cost);
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/style";
@import "../../assets/scss/icon";

.panel {
  display: flex;
  flex-flow: column;
  width: 332px;
  height: 440px;
  padding: 24px;

  background: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  // label
  &__item {
    display: flex;
    flex-flow: column;
    margin: 0px 0px 16px 0px;

    width: 284px;

    &:last-child {
      margin: 0px 0px 24px 0px;
    }
  }

  //button
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 36px;
    background: rgba(123, 174, 115, 1);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 1);
    @include transitionAll();

    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.04em;


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

    &.__active {

    }
  }
}

// label Title
.title {
  margin: 0px 0px 4px 0px;
  color: rgba(73, 72, 94, 1);

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: -0.02em;
  text-align: left;
}

// Fields
.textarea {
  max-width: 284px;
  min-width: 284px;
  min-height: 108px;
  max-height: 108px;
  resize: none;
  overflow: auto;
  background: #FFFEFB;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 16px;
  color: rgba(63, 63, 63, 1);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;

  &::placeholder {
    color: rgba(180, 180, 180, 1);
  }
}

.input {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  padding-left: 16px;
  background: #FFFEFB;
  color: rgba(63, 63, 63, 1) !important;

  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 36px;

  &::placeholder {
    color: rgba(180, 180, 180, 1);
  }

  // Убрать стрелки в input number
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  // Стили для ошибки отправки
  &.__error {
    border: 1px solid rgba(255, 132, 132, 1);
  }
}

@media (max-width: 962px) {
  .panel {
    width: 224px;

    &__item {
      width: 200-24px;
    }
  }
  .textarea {
    padding-right: 10px;
    width: 200-24px;
    min-width: 200-24px;
    max-width: 200-24px;
    font-size: 11px;
  }
  .input {
    font-size: 11px;
    padding-left: 10px;
    padding-right: 5px;
  }
}

</style>