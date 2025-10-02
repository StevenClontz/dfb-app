import { writable } from 'svelte/store';
import type { MenuItem, Review } from './types';

// Sample menu items
const sampleMenuItems: MenuItem[] = [
	{
		id: '1',
		name: 'Classic Burger',
		description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
		price: 12.99,
		categories: ['Main Course', 'Popular']
	},
	{
		id: '2',
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with parmesan cheese and homemade croutons',
		price: 8.99,
		categories: ['Salads', 'Healthy']
	},
	{
		id: '3',
		name: 'Margherita Pizza',
		description: 'Classic Italian pizza with fresh mozzarella, basil, and tomato sauce',
		price: 14.99,
		categories: ['Main Course', 'Italian', 'Popular']
	},
	{
		id: '4',
		name: 'Chocolate Lava Cake',
		description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
		price: 7.99,
		categories: ['Desserts', 'Popular']
	},
	{
		id: '5',
		name: 'Grilled Salmon',
		description: 'Fresh Atlantic salmon with seasonal vegetables and lemon butter',
		price: 18.99,
		categories: ['Main Course', 'Healthy', 'Seafood']
	}
];

// Sample reviews
const sampleReviews: Review[] = [
	{
		id: '1',
		menuItemId: '1',
		rating: 5,
		comment: 'Best burger in town! The sauce is amazing.',
		author: 'John D.',
		date: new Date('2024-01-15')
	},
	{
		id: '2',
		menuItemId: '1',
		rating: 4,
		comment: 'Very good, but could use more toppings.',
		author: 'Sarah M.',
		date: new Date('2024-01-20')
	},
	{
		id: '3',
		menuItemId: '3',
		rating: 5,
		comment: 'Authentic Italian taste! Loved it.',
		author: 'Mike R.',
		date: new Date('2024-01-18')
	}
];

export const menuItems = writable<MenuItem[]>(sampleMenuItems);
export const reviews = writable<Review[]>(sampleReviews);

// Helper function to add a review
export function addReview(review: Omit<Review, 'id' | 'date'>) {
	reviews.update(items => [
		...items,
		{
			...review,
			id: Date.now().toString(),
			date: new Date()
		}
	]);
}

// Helper function to get reviews for a specific menu item
export function getMenuItemReviews(menuItemId: string, allReviews: Review[]): Review[] {
	return allReviews.filter(review => review.menuItemId === menuItemId);
}

// Helper function to calculate average rating
export function getAverageRating(menuItemId: string, allReviews: Review[]): number {
	const itemReviews = getMenuItemReviews(menuItemId, allReviews);
	if (itemReviews.length === 0) return 0;
	const sum = itemReviews.reduce((acc, review) => acc + review.rating, 0);
	return Math.round((sum / itemReviews.length) * 10) / 10;
}
