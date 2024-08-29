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
  IonBackButton,
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

interface EvolutionDetail {
  id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
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
  evolution: {
    pre: {
        pokedex_id: number,
          name: string,
          condition: string
    }| null;
         
    next: EvolutionDetail[];
  };
}

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
        console.log(pokemon?.name); // Affiche toutes les données récupérées
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
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{pokemon.name.fr} (#{pokemon.pokedex_id})</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonImg
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              style={{ width: '200px', height: '200px' }}
            />
            <h3>Noms</h3>
            <p>Français: {pokemon.name.fr}</p>
            <p>Anglais: {pokemon.name.en}</p>
            <p>Japonais: {pokemon.name.jp}</p>
            <h3>Types</h3>
            {pokemon.types && pokemon.types.length > 0 ? (
              pokemon.types.map((type) => (
                <div key={type.name} style={{ display: 'flex', alignItems: 'center' }}>
                  <IonImg src={type.image} alt={type.name} style={{ width: '50px', marginRight: '8px' }} />
                  <span>{type.name}</span>
                </div>
              ))
            ) : (
              <div>Aucun type disponible</div>
            )}
            <h3>Statistiques</h3>
            <ul>
              <li>HP: {pokemon.stats.hp}</li>
              <li>Attaque: {pokemon.stats.atk}</li>
              <li>Défense: {pokemon.stats.def}</li>
              <li>Attaque Spéciale: {pokemon.stats.spe_atk}</li>
              <li>Défense Spéciale: {pokemon.stats.spe_def}</li>
              <li>Vitesse: {pokemon.stats.vit}</li>
            </ul>
            <h3>Évolutions</h3>
            {/* Affichage des pré-évolutions */}
            {pokemon.evolution.pre ? (
              <div>
                <h4>Pré-évolution:</h4>
                <p>{pokemon.evolution.pre.name} (Français)</p>
              </div>
            ) : (
              <div>Pas de pré-évolution disponible</div>
            )}
            {/* Affichage des évolutions suivantes */}
            {pokemon.evolution.next && pokemon.evolution.next.length > 0 ? (
              <div>
                <h4>Évolutions suivantes:</h4>
                {pokemon.evolution.next.map((evolution) => (
                  <div key={evolution.id}>
                    <p>{evolution.name.fr} (Français)</p>
                    <p>{evolution.name.en} (Anglais)</p>
                    <p>{evolution.name.jp} (Japonais)</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>Pas d'évolution suivante disponible</div>
            )}
            <IonButton expand="full" onClick={() => window.history.back()}>
              Retour
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetail;
