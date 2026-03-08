import { getCollection } from 'astro:content';
const recipes = await getCollection('recipes');
console.log(recipes);
