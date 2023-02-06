const pokeButton = document.querySelector('#pokemonButton')

pokeButton.addEventListener('click', getName);

async function getName(){

    try {
        const getPokemonStats = await axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.data.results)
            .then(data => {
                data.map(pokeStat =>{
                    getStats(pokeStat)
                })
                return data
            })
        } catch (error) {
            console.error(error)
        }
}
const getMainContainer = document.querySelector('#mainContainer')

const getStats = async (charStats) => {
    try {
        const inStats = await axios.get(charStats.url)
            .then(res => res.data)
            .then(data => {
                console.log()
                // <div class="card" style="width: 18rem;"></div>
                const card = document.createElement('div')
                    card.className = 'card'

                // <img src="..." class="card-img-top" alt="...">
                const frontShiny = data.sprites.front_shiny
                const img = document.createElement('img')
                    img.src = frontShiny
                    img.className = 'card-img-top'
                card.append(img)

                // <div class="card-body">
                const cardBody = document.createElement('div')
                    cardBody.className = 'card-body'

                // <h5 class="card-title">Card title</h5>
                const h5 = document.createElement('h5')
                    h5.className = 'card-title'
                    h5.textContent = charStats.name
                    cardBody.append(h5)

                 //<p class="card-text"></p>
                const para = document.createElement('para')
                    para.className = 'card-text'
                    para.textContent = data.types.map(type =>{
                        return ' ' + type.type.name
                    })
                    cardBody.append(para)

                    card.append(cardBody)
                getMainContainer.append(card)

            })
    } catch (error) {
        console.error(error)
    }
}


//https://pokeapi.co/api/v2/pokemon