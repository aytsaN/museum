// import {orderForm} from './order-form.js';
const orderForm = orderPopup.querySelector('.order-form');
const nameInput = orderForm.querySelector('input[name="name"]');
const emailInput = orderForm.querySelector('input[name="email"]');
const telInput = orderForm.querySelector('input[name="tel"]');

telInput.addEventListener('input', function() {
  let hasNumbers = /^[0-9]{2,3}[- ][0-9]{2,3}[- ][0-9]{2,3}[- ][0-9]{2,3}$|^[0-9]{6,10}$|^[0-9]{2}[- ][0-9]{2}[- ][0-9]{2}[- ][0-9]{2}[- ][0-9]{2}$|^[0-9]{2}[- ][0-9]{2}[- ][0-9]{2}$|^[0-9]{2,3}[- ][0-9]{2,3}[- ][0-9]{2,3}$/;
  if (!hasNumbers.test(this.value)) {
    this.classList.add('error');
  } else {
    this.classList.remove('error');
  }
})