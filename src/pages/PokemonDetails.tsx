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
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  useIonRouter,
} from '@ionic/react';

interface PokemonType {
  name: string;
  image: string;
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
}

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useIonRouter();

  useEffect(() => {
    fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPokemonData(data);
        } else {
          setError("Données invalides reçues de l'API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonData || pokemonData.length === 0) {
    return <div>Aucun Pokémon disponible</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des Pokémons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {pokemonData.map((pokemon) => (
              <IonCol size="12" size-md="6" size-lg="4" key={pokemon.pokedex_id}>
                <IonCard style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IonCardHeader>
                    <IonCardTitle>{pokemon.name.fr} (#{pokemon.pokedex_id})</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonImg
                      src={pokemon.sprites.regular}
                      alt={pokemon.name.fr}
                      style={{ width: '100px', height: '100px' }}
                    />
                    <h3>Types</h3>
                    {pokemon.types && pokemon.types.length > 0 ? (
                      pokemon.types.map((type) => (
                        <div key={type.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IonImg src={type.image} alt={type.name} style={{ width: '30px', marginRight: '8px' }} />
                          <span>{type.name}</span>
                        </div>
                      ))
                    ) : (
                      <div>Aucun type disponible</div>
                    )}
                    <IonButton
                      expand="full"
                      onClick={() => router.push(`/pokemon-detail/${pokemon.pokedex_id}`)}
                    >
                      Voir Pokémon
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
