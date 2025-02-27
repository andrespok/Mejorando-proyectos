const namePokemon = document.getElementById('pokename');
const imgPokemon = document.getElementById('pokeimage');
const btnAgua = document.getElementById('btn-agua');
const btnFuego = document.getElementById('btn-fuego');
const btnPlanta = document.getElementById('btn-planta');
const btnElectrico = document.getElementById('btn-electrico');
const btnDragon = document.getElementById('btn-dragon');
const btnPsiquico = document.getElementById('btn-psiquico');


function formatPokemonName(name) {

  const parts = name.split("-");


  const capitalized = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );

  return capitalized.join(" ");
}


async function getRandomPokemonByType(type) {
  try {
   
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    const data = await response.json();

 
    const randomIndex = Math.floor(Math.random() * data.pokemon.length);
    const pokemonInfo = data.pokemon[randomIndex].pokemon;

  
    const pokeResponse = await fetch(pokemonInfo.url);
    const pokeData = await pokeResponse.json();


    namePokemon.textContent = formatPokemonName(pokeData.name);
   
    imgPokemon.src =
      pokeData.sprites.other['official-artwork'].front_default 

    return pokeData;
    
  } catch (error) {
    console.error("Error al obtener Pokémon:", error);
  }
}


btnAgua.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("water");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});

btnFuego.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("fire");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});

btnPlanta.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("grass");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});

btnElectrico.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("electric");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});

btnDragon.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("dragon");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});

btnPsiquico.addEventListener("click", async () => {
  const pokeData = await getRandomPokemonByType("psychic");
  if (pokeData && pokeData.id) {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.07;
    audio.play();
  }
});


// btnAgua.addEventListener("click", () => {
//   getRandomPokemonByType("water");
// });

// btnFuego.addEventListener("click", () => {
//   getRandomPokemonByType("fire");
// });

// btnPlanta.addEventListener("click", () => {
//   getRandomPokemonByType("grass");
// });

// btnElectrico.addEventListener("click", () => {
//   getRandomPokemonByType("electric");
// });

// btnDragon.addEventListener("click", () => {
//   getRandomPokemonByType("dragon");
// });

// btnPsiquico.addEventListener("click", () => {
//   getRandomPokemonByType("psychic");
// });
