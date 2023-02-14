const jsonURL = 'http://localhost:3000/dogs'
// data structure: id, name, breed, sex


/*

getData -> buildSite

editExistingDog -> submitExistingDog -> getData

fetch data
build site

each datarow is editble
when data is editted, send in patch request
then rerender page 

*/


function submitExistingDog(formNode, id){
    const formValues = document.getElementById('dog-form')

    const dogObj = {
        name : formNode.name.value,
        breed : formNode.breed.value,
        sex : formNode.sex.value,
    }

    fetch(`${jsonURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(dogObj) 
    })
    .then(getData)
}


function editExistingDog(trNode){
    const formValues = document.getElementById('dog-form')
    
    formValues.name.value = trNode.childNodes[0].innerText
    formValues.breed.value = trNode.childNodes[2].innerText
    formValues.sex.value = trNode.childNodes[4].innerText
    
    formValues.addEventListener('click', (e) => {
        e.preventDefault() 
        submitExistingDog(e.target.parentNode, trNode.id)
    })
}

function buildSite(array){
    const tBody = document.getElementById('table-body')
    tBody.innerHTML = ''

    array.forEach(obj => {
        const tr = document.createElement('tr')
        tr.id = obj.id

        tr.innerHTML = 
           `<td>${obj.name}</td>
            <td>${obj.breed}</td>
            <td>${obj.sex}</td>
            <td><button>Edit</button></td>`
    
        tr.querySelector('button').addEventListener('click', (e) => editExistingDog(e.target.parentNode.parentNode))
        
        tBody.append(tr)
    })

}

// get data
function getData(){
    fetch(jsonURL)
    .then(response => response.json())
    .then(data => buildSite(data))
}


document.addEventListener('DOMContentLoaded', () => {
    getData() 
})