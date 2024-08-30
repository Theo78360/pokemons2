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
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { Pokemon, PokemonType, Talents, Resistance, Evolution, PokemonStats } from '../types/interface'; // Import interfaces

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const router = useIonRouter();

  useEffect(() => {
    fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, [id]);

  const goToPreviousPokemon = () => {
    const previousId = pokemon?.pokedex_id ? pokemon.pokedex_id - 1 : 1;
    if (previousId >= 0) {
      history.push(`/pokemon-detail/${previousId}`);
    }
  };

  const goToNextPokemon = () => {
    const nextId = pokemon?.pokedex_id ? pokemon.pokedex_id + 1 : 1;
    history.push(`/pokemon-detail/${nextId}`);
  };

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
          <IonTitle>{pokemon?.name?.fr} (#{pokemon?.pokedex_id})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard style={{ textAlign: 'center' }}>
          <IonCardHeader>
            <IonCardTitle>{pokemon?.name?.fr} (#{pokemon?.pokedex_id})</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IonImg
                src={pokemon?.sprites?.regular}
                alt={pokemon?.name?.fr}
                style={{ width: '200px', height: '200px', margin: '0 10px' }}
              />
              {pokemon?.sprites?.shiny && (
                <IonImg
                  src={pokemon.sprites.shiny}
                  alt={`${pokemon?.name?.fr} Shiny`}
                  style={{ width: '200px', height: '200px', margin: '0 10px' }}
                />
              )}
            </div>

      
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Noms</h1>
                  <p>Français: {pokemon?.name?.fr}</p>
                  <p>Anglais: {pokemon?.name?.en}</p>
                  <p>Japonais: {pokemon?.name?.jp}</p>
                </IonLabel>
              </IonItem>
            </IonList>

            
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Types</h1>
                  {pokemon?.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((type) => (
                      <div
                        key={type.name}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                      >
                        <IonImg
                          src={type.image}
                          alt={type.name}
                          style={{ width: '50px', marginRight: '8px' }}
                        />
                        <span>{type.name}</span>
                      </div>
                    ))
                  ) : (
                    <div>Aucun type disponible</div>
                  )}
                </IonLabel>
              </IonItem>
            </IonList>

          
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Statistiques</h1>
                  {pokemon?.stats ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      <li>HP: {pokemon.stats.hp}</li>
                      <li>Attaque: {pokemon.stats.atk}</li>
                      <li>Défense: {pokemon.stats.def}</li>
                      <li>Attaque Spéciale: {pokemon.stats.spe_atk}</li>
                      <li>Défense Spéciale: {pokemon.stats.spe_def}</li>
                      <li>Vitesse: {pokemon.stats.vit}</li>
                    </ul>
                  ) : (
                    <div>Pas de statistiques disponibles</div>
                  )}
                </IonLabel>
              </IonItem>
            </IonList>

          
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Caractéristiques</h1>
                  {pokemon?.weight && pokemon?.height ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      <li>Poids: {pokemon.weight}</li>
                      <li>Taille: {pokemon.height}</li>
                    </ul>
                  ) : (
                    <div>Pas de caractéristiques disponibles</div>
                  )}
                </IonLabel>
              </IonItem>
            </IonList>

         
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Talents</h1>
                  {pokemon?.talents && pokemon.talents.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {pokemon.talents.map((talent) => (
                        <li key={talent.name}>{talent.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>Pas de talents disponibles</div>
                  )}
                </IonLabel>
              </IonItem>
            </IonList>

          
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Résistances</h1>
                  {pokemon?.resistances && pokemon.resistances.length > 0 ? (
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
                </IonLabel>
              </IonItem>
            </IonList>

            
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Évolutions</h1>
                  {pokemon?.evolution?.pre && pokemon.evolution.pre.length > 0 ? (
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
                  {pokemon?.evolution?.next && pokemon.evolution.next.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {pokemon.evolution.next.map((next) => (
                        <li key={next.name}>
                          {next.name} - #{next.pokedex_id}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Pas d'évolution</div>
                  )}
                </IonLabel>
              </IonItem>
            </IonList>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <IonButton
                expand="block"
                style={{ width: '150px', margin: '0 10px' }}
                onClick={goToPreviousPokemon}
              >
                Précédent
              </IonButton>
              <IonButton
                expand="block"
                style={{ width: '150px', margin: '0 10px' }}
                href="/pokemon-list"
              >
                Retour
              </IonButton>
              <IonButton
                expand="block"
                style={{ width: '150px', margin: '0 10px' }}
                onClick={goToNextPokemon}
              >
                Suivant
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetail;
