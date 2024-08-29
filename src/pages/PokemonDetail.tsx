import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

interface PokemonType {
  name: string;
  image: string;
}

interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}


 interface Pre{
  pokedex_id: number;
  name:string;
  condition : string;
 }

 interface Next{
  pokedex_id: number;
  name:string;
  condition : string;
 }


interface Resistance {
  name: string; // Assuming the resistance has a name
  multiplier: number;
}

interface Talents {
  name: string;
  tc: boolean;
}

interface Pokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  types: PokemonType[];
  stats: PokemonStats;
  talents: Talents[]; 
  resistances: Resistance[]; 
  evolution: {
		pre:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
		next:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
}}

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>Pokémon non trouvé</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pokemon.name.fr} (#{pokemon.pokedex_id})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard style={{ textAlign: 'center' }}>
          <IonCardHeader>
            <IonCardTitle>{pokemon.name.fr} (#{pokemon.pokedex_id})</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IonImg
                src={pokemon.sprites.regular}
                alt={pokemon.name.fr}
                style={{ width: '200px', height: '200px', margin: '0 10px' }}
              />
              <IonImg
                src={pokemon.sprites.shiny}
                alt={`${pokemon.name.fr} Shiny`}
                style={{ width: '200px', height: '200px', margin: '0 10px' }}
              />
            </div>
            <h3>Noms</h3>
            <p>Français: {pokemon.name.fr}</p>
            <p>Anglais: {pokemon.name.en}</p>
            <p>Japonais: {pokemon.name.jp}</p>
            <h3>Types</h3>
            {pokemon.types && pokemon.types.length > 0 ? (
              pokemon.types.map((type) => (
                <div
                  key={type.name}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
                >
                  <IonImg src={type.image} alt={type.name} style={{ width: '50px', marginRight: '8px' }} />
                  <span>{type.name}</span>
                </div>
              ))
            ) : (
              <div>Aucun type disponible</div>
            )}
            <h3>Statistiques</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>HP: {pokemon.stats.hp}</li>
              <li>Attaque: {pokemon.stats.atk}</li>
              <li>Défense: {pokemon.stats.def}</li>
              <li>Attaque Spéciale: {pokemon.stats.spe_atk}</li>
              <li>Défense Spéciale: {pokemon.stats.spe_def}</li>
              <li>Vitesse: {pokemon.stats.vit}</li>
            </ul>
            <h2>Talents :</h2>
            {pokemon.talents && pokemon.talents.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pokemon.talents.map((talents) => (
                  <li key={talents.name}>
                    {talents.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Pas de talents disponibles</div>
            )}
            <h3>Résistances :</h3>
            {pokemon.resistances && pokemon.resistances.length > 0 ? (
             <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pokemon.resistances.map((resistance) => (
                  <li key={resistance.name}>
                    {resistance.name} - {resistance.multiplier}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Pas de résistances disponibles</div>
            )}
            <h2>Evolutions :</h2>
            {pokemon.evolution.pre && pokemon.evolution.pre.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pokemon.evolution.pre.map((pre) => (
                  <li key={pre.name}>
                    {pre.name} - #{pre.pokedex_id}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Pas de pré-évolution</div>
            )}
            {pokemon.evolution.next && pokemon.evolution.next.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pokemon.evolution.next.map((next) => (
                  <li key={next.name}>
                    {next.name} - #{next.pokedex_id}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Pas de pré-évolution</div>
            )}
            <IonButton
              expand="block"
              style={{ width: '200px', margin: '10px auto' }}
              onClick={() => window.history.back()}
            >
              Retour
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetail;
