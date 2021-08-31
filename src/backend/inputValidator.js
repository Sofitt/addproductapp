export class inputValidator {

    constructor() {

    }
    /**
     * Проверяет валидность полей, если true - активирует кнопку
     * @param inputs - коллекция элементов
     * @param btn - кнопка отправки
     * */
    static isValid(inputs, btn) {
        const arr = inputs;
        btn.disabled = !(
            arr[0].value.length && arr[1].value.length && arr[2].value.length
        );
    }

    /**
     * При вызове проверяет наличие в поле символов, если false, окрашивает границы поля в красный и выводит сообщение об ошибке.
     * @param inputs - коллекция элементов
     * @param btn - кнопка отправки
     */
    static isBlank(inputs, btn) {
        for (let item of inputs) {
            let error = document.createElement('span');
            error.className = 'requireErr';
            error.innerHTML = 'Поле является обязательным';
            if (!item.value && item.className !== '__error' && !item.nextSibling) {
                item.classList.add('__error');
                item.parentElement.insertAdjacentElement("beforeend", error);
            }
            if (btn.disabled === true && item.value && item.className !== '__error' || item.value && item.className !== '__error') {
                item.classList.remove('__error');
                if (item.nextSibling) item.nextSibling.remove();
            }
            this.isValid(inputs, btn);
        }
    }
}