// fills uf select
function populateUFs() { 
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
        .then(res => res.json() )
        .then(states => {
            for (let state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()
// fills cities select
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufId = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json() )
        .then(cities => {
            for (let city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
const itemsToColect = document.querySelectorAll(".items-grid li")
for (let item of itemsToColect){
    item.addEventListener("click", handleSelectedItem)
}


const colectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemId = event.target.dataset.id
    event.target.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(item => item == itemId)
    
    if (alreadySelected != -1){
        selectedItems = selectedItems.filter(item => item != itemId)
    }else {
        selectedItems.push(itemId)
    }

    colectedItems.value = selectedItems
}