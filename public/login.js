const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const regSubmit = document.querySelector('.reg-submit')
const logAlert = document.querySelector('.log-alert')
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  
    const email = emailInput.value
    const password = passwordInput.value
  
    try {
        regSubmit.value = `loggin user...`
        const { data } = await axios.post('/api/v1/auth/login', { email, password })

        regSubmit.value = `login successfull`

        emailInput.value = ''
        passwordInput.value = ''

        logAlert.classList.add('show-reg-alert')
        logAlert.style.color = 'green'
  
        localStorage.setItem('token', data.token)
        location.url ='/formList'
      
    } catch (error) {
        logAlert.textContent = error.response.data.msg
        logAlert.classList.add('show-reg-alert')
        logAlert.style.color = 'red'
        location.url ='/login'
    }
  })
  

//   regSubmit.addEventListener('click', async (e) => {
//     const token = localStorage.getItem('token')
//     try {
//       await axios.get('/formList', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//     } catch (error) {
//         console.log(error)
//       localStorage.removeItem('token')
     
//     }
// })