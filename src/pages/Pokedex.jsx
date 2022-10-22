import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputSearch from "../components/home/pokedex/InputSearch";
import SelectByType from "../components/home/pokedex/SelectByType";
import CardPoke from "../components/home/pokedex/styles/CardPoke";
import '../pages/styles/pokedex.css'
import '../components/home/pokedex/styles/inputSearch.css'


const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  const [typeSelected, setTypeSelected] = useState("All Pokemons");

  useEffect(() => {
    if (typeSelected !== "All Pokemons") {
      //Si se selecciono un tipo
      axios
        .get(typeSelected)
        .then((res) => {
          const result = res.data.pokemon.map((e) => e.pokemon);
          setPokemons(result);
        })
        .catch((err) => console.log(err));
    } else {
      //Si quiero todos los pokemons
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);

  const userName = useSelector((state) => state.userName);

  //Lógica de programación
  const [page, setPage] = useState(1);

  const [pokePerPage, setPokePerPage] = useState(100);

  //initial 1-1  8=0
  //2-1          8 =8
  //3-1          8=16

  const initialPoke = (page - 1) * pokePerPage;
  //initialPoke + pokePerPage +1
  const finalPoke = page * pokePerPage;

  return (
    <div>
      <header>
        <h1 >Pokedex</h1>
        <p className="title_pokedex">
          Welcome
          <span>{userName}, here you can find your favorite pokemon.</span>
        </p>
      </header>

      <aside>
        <InputSearch />
        <SelectByType setTypeSelected={setTypeSelected} />
      </aside>
      <main>
        <div className="card-container">
          {pokemons?.slice(initialPoke, finalPoke).map((pokemon) => (
            <CardPoke key={pokemon.url} url={pokemon.url} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pokedex;
