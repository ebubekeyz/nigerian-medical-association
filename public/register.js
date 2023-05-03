const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const regSubmit = document.querySelector('.reg-submit')
const regAlert = document.querySelector('.reg-alert')

regSubmit.addEventListener('click', async(e) => {
    e.preventDefault()
    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value

    try{
        regSubmit.value = `registering...`
        const {data} = await axios.post('/api/v1/auth/register', {name, email, password}).then((response) => {
            if(response){
                window.location = '/login'
            }
        }).catch((error) => {
            console.log(error)
            logAlert.textContent = error.response.data.msg
            window.location = "/register"
        })

        regSubmit.value = `successfully registered`

        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';

        regAlert.classList.add('show-reg-alert')
        regAlert.style.color = 'green'
        
        
    }
    catch(error){
        console.log(error)
        regAlert.textContent = error.response.data.msg
        regAlert.classList.add('show-reg-alert')
        regAlert.style.color = 'red'
        
    }
})






