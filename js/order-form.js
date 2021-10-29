// import {ticketData} from './tickets-form-calculator.js';

const buyNowBtn = document.querySelector('#tickets .order-button');

const orderPopup = document.querySelector('.popup-wrapper');
// export const orderForm = orderPopup.querySelector('.order-form');
const orderForm2 = orderPopup.querySelector('.order-form');

const increaseBtns2 = orderForm2.querySelectorAll('.increase');
const decreaseBtns2 = orderForm2.querySelectorAll('.decrease');


const dateInput = orderForm2.querySelector('#date');
const timeInput = orderForm2.querySelector('#time');
const ticketTypeList = orderForm2.querySelector('.ticket-type');
const basicInupt = orderForm2.querySelector('.basic input');
const seniorInupt = orderForm2.querySelector('.senior input');

const dateOutput = orderPopup.querySelector('.overview .date');
const timeOutput = orderPopup.querySelector('.overview .time');
const ticketTypeOutput = orderPopup.querySelector('.overview .check-circle-type');
const basicCountOutput = orderPopup.querySelector('.prices .basic-cost');
const seniorCountOutput = orderPopup.querySelector('.prices .senior-cost');
const totalAmountOutput2 = orderPopup.querySelector('.prices .total-cost span');
const basicTypeCostsOutput = orderPopup.querySelectorAll('.basic-type-cost');
const seniorTypeCostOutput = orderPopup.querySelectorAll('.senior-type-cost');
const typeAmounts = orderPopup.querySelectorAll('.prices .amount');

class ticketData2 {
  constructor(ticketType, basicCount, seniorCount) {
    this.ticketType = ticketType || 0;
    this.basicCount = basicCount || 0;
    this.seniorCount = seniorCount || 0;
  }

  get totalCount() {
    return (this.ticketType * this.basicCount) + (this.ticketType/2 * this.seniorCount);
  }
}

let ticketTypeMatcher = {
  0: 'Select Ticket Type',
  20: 'Permanent exhibition',
  25: 'Temporary exhibition',
  40: 'Combined Admission'
}

let today = new Date();
let order = {};

dateInput.min = `${today.getFullYear()}-${today.getMonth() < 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getDate()}`;

function updateOrderObj() {
  order.basicCount = basicInupt.value || 0;
  order.seniorCount = seniorInupt.value || 0;
  order.ticketType = ticketTypeList.value || 20;
}

function getTotalCount() {
  return (order.ticketType * order.basicCount) + (order.ticketType/2 * order.seniorCount);
}

function updateOrderForm() {
  ticketTypeOutput.innerHTML = ticketTypeMatcher[order.ticketType];
  basicCountOutput.innerHTML = `${order.basicCount * order.ticketType} €`;
  seniorCountOutput.innerHTML = `${order.seniorCount / 2 * order.ticketType} €`;
  basicTypeCostsOutput[0].innerHTML = order.ticketType;
  basicTypeCostsOutput[1].innerHTML = order.ticketType;
  seniorTypeCostOutput[0].innerHTML = order.ticketType / 2;
  seniorTypeCostOutput[1].innerHTML = order.ticketType / 2;
  totalAmountOutput2.innerHTML = `${order.totalCount ? order.totalCount : getTotalCount()} €`;
  typeAmounts[0].innerHTML = order.basicCount;
  typeAmounts[1].innerHTML = order.seniorCount;
}

function getData() {
  let selectedDate = dateInput.value ? new Date(dateInput.value) : new Date();
  let weekday = selectedDate.toLocaleString('default', { weekday: 'long'});
  let month = selectedDate.toLocaleString('default', { month: 'long'});
  let day = selectedDate.getDate();
  return `${weekday}, ${month} ${day}`;
}

function getTime() {
  return timeInput.value || '00:00';
}

function updateOrderOverview() {
  ticketTypeOutput.innerHTML = ticketTypeMatcher[order.ticketType];
  dateOutput.innerHTML = getData();
  timeOutput.innerHTML = getTime();
}

function prefillOrderForm() {
  basicInupt.value = sessionStorage.getItem('basicCount');
  seniorInupt.value = sessionStorage.getItem('seniorCount');
  ticketTypeList.value = sessionStorage.getItem('ticketType');
}

function prepareOrder() {
  order = new ticketData2(sessionStorage.ticketType, sessionStorage.basicCount, sessionStorage.seniorCount);
  prefillOrderForm();
  updateOrderForm();
  updateOrderOverview();
}

for (let i = 0; i < decreaseBtns2.length; i++) {
  decreaseBtns2[i].addEventListener('click', function() {
    this.nextElementSibling.stepDown();
  });
}

for (let i = 0; i < increaseBtns.length; i++) {
  increaseBtns2[i].addEventListener('click', function() {
    this.previousElementSibling.stepUp();
  });
}

function createListenerForFormUpdate(elements, action) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(action, function() {
      updateOrderObj();
      updateOrderForm();
      updateOrderOverview();
    });
  }
}

dateInput.addEventListener('focus', function() {this.type = 'date'}, { once: true });
timeInput.addEventListener('focus', function() {this.type = 'time'}, { once: true });
timeInput.addEventListener('change', function() {
  let newValue = this.value;
  if (newValue.split(':')[0] > 17 || newValue.split(':')[0] < 8)
  this.value = '09:00';
});

createListenerForFormUpdate(increaseBtns2, 'click');
createListenerForFormUpdate(decreaseBtns2, 'click');
createListenerForFormUpdate(orderForm2, 'change');

buyNowBtn.addEventListener('click', prepareOrder);
