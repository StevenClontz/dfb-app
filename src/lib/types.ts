export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl?: string;
}

export interface Review {
	id: string;
	menuItemId: string;
	rating: number; // 1-5 stars
	comment: string;
	author: string;
	date: Date;
}
