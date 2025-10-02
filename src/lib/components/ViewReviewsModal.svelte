<script lang="ts">
	import type { MenuItem, Review } from '$lib/types';
	import { getMenuItemReviews, getAverageRating } from '$lib/stores';
	import ReviewCard from './ReviewCard.svelte';

	interface Props {
		menuItem: MenuItem;
		allReviews: Review[];
		onClose: () => void;
	}

	let { menuItem, allReviews, onClose }: Props = $props();

	let itemReviews = $derived(getMenuItemReviews(menuItem.id, allReviews));
	let averageRating = $derived(getAverageRating(menuItem.id, allReviews));
	let reviewCount = $derived(itemReviews.length);
</script>

<div class="modal-backdrop" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="presentation">
	<div class="modal-content" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
		<div class="modal-header">
			<div class="header-info">
				<h2>{menuItem.name}</h2>
				<span class="category">{menuItem.category}</span>
			</div>
			<button class="close-btn" onclick={onClose} aria-label="Close">×</button>
		</div>

		<div class="menu-details">
			<p class="description">{menuItem.description}</p>
			<span class="price">${menuItem.price.toFixed(2)}</span>
		</div>

		<div class="rating-summary">
			{#if reviewCount > 0}
				<div class="summary-stars">
					{#each Array(5) as _, i}
						<span class="star {i < Math.round(averageRating) ? 'filled' : ''}">★</span>
					{/each}
				</div>
				<span class="summary-text">{averageRating} average rating from {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
			{:else}
				<p class="no-reviews">No reviews yet for this item.</p>
			{/if}
		</div>

		{#if reviewCount > 0}
			<div class="reviews-section">
				<h3>Reviews</h3>
				<div class="reviews-list">
					{#each itemReviews as review (review.id)}
						<ReviewCard {review} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal-content {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
		gap: 1rem;
	}

	.header-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	h2 {
		margin: 0;
		color: #1a1a1a;
		font-size: 1.75rem;
	}

	.category {
		font-size: 0.875rem;
		color: #666;
		background: #f0f0f0;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		width: fit-content;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: #6b7280;
		padding: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background 0.2s;
		flex-shrink: 0;
	}

	.close-btn:hover {
		background: #f3f4f6;
	}

	.menu-details {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.description {
		color: #4b5563;
		line-height: 1.6;
		margin: 0;
		flex: 1;
	}

	.price {
		font-size: 1.5rem;
		font-weight: bold;
		color: #2563eb;
		flex-shrink: 0;
	}

	.rating-summary {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 6px;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.summary-stars {
		display: flex;
		gap: 0.25rem;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.star {
		font-size: 1.5rem;
		color: #d1d5db;
	}

	.star.filled {
		color: #fbbf24;
	}

	.summary-text {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.no-reviews {
		color: #9ca3af;
		font-style: italic;
		margin: 0;
	}

	.reviews-section {
		margin-top: 1.5rem;
	}

	h3 {
		margin: 0 0 1rem 0;
		color: #1a1a1a;
		font-size: 1.25rem;
	}

	.reviews-list {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 640px) {
		.modal-content {
			padding: 1.5rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.menu-details {
			flex-direction: column;
		}

		.price {
			font-size: 1.25rem;
		}
	}
</style>
