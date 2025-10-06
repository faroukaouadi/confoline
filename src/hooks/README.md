# TanStack Query Hooks

Ce dossier contient les hooks personnalisés utilisant TanStack Query pour la gestion du cache et des requêtes API.

## Hooks disponibles

### `usePartners()`
- **Fonction** : Récupère la liste des partenaires
- **Cache** : 5 minutes (staleTime), 10 minutes (gcTime)
- **Query Key** : `["partners"]`

### `useNews()`
- **Fonction** : Récupère la liste des actualités
- **Cache** : 5 minutes (staleTime), 10 minutes (gcTime)
- **Query Key** : `["news"]`

### `useNewsById(id)`
- **Fonction** : Récupère une actualité spécifique par ID
- **Cache** : 5 minutes (staleTime), 10 minutes (gcTime)
- **Query Key** : `["news", id]`
- **Paramètres** : `id` (number) - ID de l'actualité

### `useGallery()`
- **Fonction** : Récupère la liste des images de la galerie
- **Cache** : 5 minutes (staleTime), 10 minutes (gcTime)
- **Query Key** : `["gallery"]`

## Avantages de TanStack Query

✅ **Cache intelligent** : Les données sont mises en cache et réutilisées entre les composants
✅ **Pas de refetch inutile** : Les données en cache ne sont pas re-téléchargées
✅ **Background refetching** : Mise à jour automatique en arrière-plan
✅ **Gestion d'erreur** : Gestion centralisée des erreurs
✅ **Loading states** : États de chargement automatiques
✅ **DevTools** : Outils de développement pour déboguer les requêtes

## Configuration

Les URLs d'API sont centralisées dans `src/config/api.ts` et s'adaptent automatiquement selon l'environnement (développement/production).

## Utilisation

```tsx
import { useNews } from '../hooks/useNews';

function MyComponent() {
  const { data, isLoading, error } = useNews();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render data */}</div>;
}
```
