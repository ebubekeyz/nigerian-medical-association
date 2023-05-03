const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const regSubmit = document.querySelector('.reg-submit')
const logAlert = document.querySelector('.log-alert')
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
  
    const email = emailInput.value
    const password = passwordInput.value
  
    try {
        regSubmit.value = `loggin user...`
        const { data } = await axios.post('/api/v1/auth/login', { email, password }).then((response) => {
            
            if(response){
                window.location = '/formList'
                localStorage.setItem('token', response.data.token)
            }
          
            
        }).catch((error) => {
            console.log(error)
            logAlert.textContent = error.response.data.msg
            window.location = "/login"
        })

        regSubmit.value = `login successfull`

        emailInput.value = ''
        passwordInput.value = ''

        logAlert.classList.add('show-reg-alert')
        logAlert.style.color = 'green'
        
      
    } catch (error) {
        logAlert.textContent = error.response.data.msg
        logAlert.classList.add('show-reg-alert')
        logAlert.style.color = 'red'
       
    }
  })
  

//   regSubmit.addEventListener('click', async (e) => {
//     const token = localStorage.getItem('token')
//     try {
//      const {data} = await axios.get('/formList').then((response) => {
//         console.log(response)
//       })

//     } catch (error) {
//         console.log(error)
//       localStorage.removeItem('token')
     
//     }
// })