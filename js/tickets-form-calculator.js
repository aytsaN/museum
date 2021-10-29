const ticketForm = document.querySelector('form.tickets-form');
const increaseBtns = ticketForm.querySelectorAll('.increase');
const decreaseBtns = ticketForm.querySelectorAll('.decrease');
const basicInput = ticketForm.querySelector('#basic');
const seniorInput = ticketForm.querySelector('#senior');
const totalAmountOutput = ticketForm.querySelector('.amount-sum');
const ticketTypes = ticketForm.querySelectorAll('.fieldset.type input');

class ticketData {
  constructor(ticketType, basicCount, seniorCount) {
    this.ticketType = ticketType || 0;
    this.basicCount = basicCount || 0;
    this.seniorCount = seniorCount || 0;
  }

  get totalCount() {
    return (this.ticketType * this.basicCount) + (this.ticketType/2 * this.seniorCount);
  }

  setValueFromStorage() {
    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i].value === sessionStorage.getItem('ticketType')) {
        ticketTypes[i].checked = true;
      }
      basicInput.value = sessionStorage.getItem('basicCount');
      seniorInput.value = sessionStorage.getItem('seniorCount');
      totalAmountOutput.innerHTML = this.totalCount;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let ticket = new ticketData(sessionStorage.ticketType, sessionStorage.basicCount, sessionStorage.seniorCount);
  if (sessionStorage.length > 1) ticket.setValueFromStorage();

  function updateFormClass() {
    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i].checked) ticket.ticketType = ticketTypes[i].value;
      ticket.basicCount = basicInput.value;
      ticket.seniorCount = seniorInput.value;
    }
  }

  function updateForm() {
    totalAmountOutput.innerHTML = ticket.totalCount;
  }

  function updateStorage(ticket) {
    for (let key in ticket) {
      sessionStorage.setItem(key, ticket[key]);
    }
  }

  for (let i = 0; i < decreaseBtns.length; i++) {
    decreaseBtns[i].addEventListener('click', function() {
      this.nextElementSibling.stepDown();
      updateFormClass();
      updateForm();
      updateStorage(ticket);
    });
  }

  for (let i = 0; i < increaseBtns.length; i++) {
    increaseBtns[i].addEventListener('click', function() {
      this.previousElementSibling.stepUp();
      updateFormClass();
      updateForm();
      updateStorage(ticket);
    });
  }

  ticketForm.addEventListener('change', function() {
    updateFormClass();
    updateForm();
    updateStorage(ticket);
  })

});
