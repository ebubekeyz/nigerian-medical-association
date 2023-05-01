const sMain = document.querySelector('.s-main')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
const showForm = async () => {
    try {
      const {
        data: { form },
      } = await axios.get(`/api/v1/form/${id}`)
      
      
        const { _id: formId, designation, title, firstname, lastname, email, phone, state, country, specialty, amount, participant, image  } = form

        sMain.innerHTML = `
      <div class="s-grid">
                    <div><h4>Name:</h4></div>
                    <div><p>${title} ${firstname} ${lastname}</p></div>
                </div>

                <div class="s-grid">
                    <div><h4>Email:</h4></div>
                    <div><p>${email}</p></div>
                </div>

                <div class="s-grid">
                <div><h4>Designation:</h4></div>
                <div><p>${designation}</p></div>
            </div>

            <div class="s-grid">
                <div><h4>Phone:</h4></div>
                <div><p>${phone}</p></div>
            </div>

            <div class="s-grid">
                <div><h4>State/Country:</h4></div>
                <div><p>${state}/${country}</p></div>
            </div>

            <div class="s-grid">
                <div><h4>Specialty:</h4></div>
                <div><p>${specialty}</p></div>
            </div>

            <div class="s-grid">
                <div><h4>Participant:</h4></div>
                <div><p>${participant}</p></div>
            </div>

            <div class="s-grid">
                <div><h4>Amount:</h4></div>
                <div><p>N${amount}</p></div>
            </div>


                <div class="s-grid">
                    <div><h4>Payment Receipt:</h4></div>
                    <div> <a href="${image}"><img src="${image}" class="receipt-img"></a></div>
                </div>
      `
      
    
    } catch (error) {
      console.log(error)
    }
  }
  
  showForm()