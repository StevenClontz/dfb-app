<script lang="ts">
	import type { MenuItem, Review } from '$lib/types';
	import { getAverageRating, getMenuItemReviews } from '$lib/stores';

	interface Props {
		item: MenuItem;
		allReviews: Review[];
		onReview: (itemId: string) => void;
	}

	let { item, allReviews, onReview }: Props = $props();

	let itemReviews = $derived(getMenuItemReviews(item.id, allReviews));
	let averageRating = $derived(getAverageRating(item.id, allReviews));
	let reviewCount = $derived(itemReviews.length);
</script>

<div class="menu-item-card">
	<div class="card-header">
		<div class="item-info">
			<h3>{item.name}</h3>
			<span class="category">{item.category}</span>
		</div>
		<span class="price">${item.price.toFixed(2)}</span>
	</div>
	
	<p class="description">{item.description}</p>
	
	<div class="rating-section">
		{#if reviewCount > 0}
			<div class="stars">
				{#each Array(5) as _, i}
					<span class="star {i < Math.round(averageRating) ? 'filled' : ''}">★</span>
				{/each}
			</div>
			<span class="rating-text">{averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
		{:else}
			<span class="no-reviews">No reviews yet</span>
		{/if}
	</div>

	<button class="review-btn" onclick={() => onReview(item.id)}>
		Write a Review
	</button>
</div>

<style>
	.menu-item-card {
		background: white;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.menu-item-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.75rem;
	}

	.item-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	h3 {
		margin: 0;
		color: #1a1a1a;
		font-size: 1.25rem;
	}

	.category {
		font-size: 0.875rem;
		color: #666;
		background: #f0f0f0;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		width: fit-content;
	}

	.price {
		font-size: 1.5rem;
		font-weight: bold;
		color: #2563eb;
	}

	.description {
		color: #4b5563;
		line-height: 1.6;
		margin: 0 0 1rem 0;
	}

	.rating-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.stars {
		display: flex;
		gap: 0.125rem;
	}

	.star {
		font-size: 1.25rem;
		color: #d1d5db;
	}

	.star.filled {
		color: #fbbf24;
	}

	.rating-text {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.no-reviews {
		color: #9ca3af;
		font-size: 0.875rem;
		font-style: italic;
	}

	.review-btn {
		width: 100%;
		padding: 0.75rem;
		background: #2563eb;
		color: white;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.review-btn:hover {
		background: #1d4ed8;
	}
</style>
