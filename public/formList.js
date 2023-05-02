let result = document.querySelector('.table')
let listSection = document.querySelector('.list-section')


const fetchList = async () => {
  try {
    const { data: { form }} = await axios.get('/api/v1/form')
    console.log(form)
    
    if(form.length < 1){
      result.innerHTML = `<h3 class="listing">No list Found</h3>`
      result.style.border = 'none'
      listSection.style.height = '100vh'
    }

    let id = 0;
    const allList = form.map((item) => {
      item.id = id++;
        let {_id: formId, designation, title, firstname, lastname, email, phone, state, country, specialty, amount, participant, image } = item
        console.log(title)
       const tr = document.createElement('tr')
      tr.classList.add('list-info')
      tr.innerHTML = `
      <td>${id}</td>
      <td style="text-transform: capitalize;"><strong>${title}</strong><a href="./singleList?id=${formId}"> ${firstname} ${lastname}</a></td>
      <td class="hide-small-screen">${email}</td>
      <td style="text-transform: capitalize;">${designation}</td>
      <td class="hide-small-screen">${phone}</td>
      <td class="hide-small-screen" style="text-transform: capitalize;">${state}/${country}</td>
      <td>${specialty}</td>
      <td class="hide-small-screen">${participant}</td>
      <td class="hide-small-screen">N${amount}</td>
      <td style="border: 1px solid black; padding: 1rem 1rem;"> <a href="${image}"><img src="${image}" style="width: 25px; height: 25px; object-fit: cover"></a></td>
      `
      result.appendChild(tr)
      
  
      })
    }
    catch(err){
      console.log(err)
      result.style.border = 'none'
      listSection.style.height = '100vh'
    }
  }
  fetchList()