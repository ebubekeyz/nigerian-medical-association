
// 
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const giveaway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');
  
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  // months are ZERO index based;
  const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 12, 00, 0);
  
//   let futureDate = new Date(2023, 3, 8, 11, 30, 0);
  
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  
  let month = futureDate.getMonth();
  month = months[month];
  const weekday = weekdays[futureDate.getDay()];
  const date = futureDate.getDate();
  giveaway.textContent = `Registration ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;
  
  const futureTime = futureDate.getTime();
  function getRemaindingTime() {
    const today = new Date().getTime();
  
    const t = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr
    // values in miliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    // calculate all values
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);
  
    // set values array
    const values = [days, hours, minutes, seconds];
    function format(item) {
      if (item < 10) {
        return (item = `0${item}`);
      }
      return item;
    }
  
    items.forEach(function (item, index) {
      item.innerHTML = format(values[index]);
    });
  
    if (t < 0) {
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">sorry, Registration has date has expired. You cannot register</h4>`;
    }
  }
  // countdown;
  let countdown = setInterval(getRemaindingTime, 1000);
  //set initial values
  getRemaindingTime();
  

const formBtn = document.querySelector('.form-btn')
const regForm = document.querySelector('.reg-form-section')
const regSection = document.querySelector('.reg-form-section')

formBtn.addEventListener('click',() => {
  regForm.classList.add('show-register')
})




const times = document.querySelector('.times')
const regFormSection = document.querySelector('.reg-form-section')

times.addEventListener('click',()=>{
  regFormSection.classList.toggle('hide')
})


const url = '/api/v1/form'
const imageInput = document.getElementById('receipt')
const regSubmit = document.querySelector('.reg-submit')
const regAlert = document.querySelector('.reg-alert')
const firstnameInput = document.getElementById('firstname')
const lastnameInput = document.getElementById('lastname')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
const amountInput = document.getElementById('amount')
const countryInput = document.getElementById('country')
const stateInput = document.getElementById('state-input')
const titleInput = document.getElementById('title-input')
const designationInput = document.getElementById('designation-input')
const specialtyInput = document.getElementById('specialty-input')
const participantInput = document.getElementById('participant-input')

let imageValue;

imageInput.addEventListener('change',async (e)=>{
  const imageFile = e.target.files[0];
  const formData = new FormData();
  console.log(formData)
  formData.append('image',imageFile)
  try {
   const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
    headers:{
     'Content-Type':'multipart/form-data'
    }
   })
   imageValue = src
  } catch (error) {
    imageValue = null
   console.log(error);
  }
 })


 regSubmit.addEventListener('click',async (e)=>{
  e.preventDefault()
  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const email = emailInput.value;
  const designation = designationInput.value;
  const title = titleInput.value;
  const phone = phoneInput.value;
  const state = stateInput.value;
  const country = countryInput.value;
  const specialty = specialtyInput.value;
  const participant = participantInput.value;
  const amount = amountInput.value;
  
  try {
   regSubmit.value = `sending...`
   const list = {firstname: firstname, lastname: lastname, email: email, designation: designation, title: title, phone: phone, state: state, country: country, specialty: specialty, participant: participant, amount: amount, image:imageValue}
   
   await axios.post(url,list);
   
    regSubmit.value = `sent`
    formBtn.textContent = 'You are already registered'

    firstnameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    designationInput.value = '';
    titleInput.value = '';
    phoneInput.value = '';
    stateInput.value = '';
    countryInput.value = '';
    specialtyInput.value = '';
    participantInput.value = '';
    amountInput.value = '';
    imageInput.value = '';
    regAlert.textContent = 'successfully registered'

    regAlert.classList.add('show-reg-alert')
    regAlert.style.color = 'green'
    setTimeout(() => {
      regAlert.classList.remove('show-reg-alert')
    },3000)

  } catch (error) {
   console.log(error);
   regAlert.textContent = error.response.data.msg
   regAlert.classList.add('show-reg-alert')
   regAlert.style.color = 'red'
    setTimeout(() => {
      regAlert.classList.remove('show-reg-alert')
    },3000)


  }

  })