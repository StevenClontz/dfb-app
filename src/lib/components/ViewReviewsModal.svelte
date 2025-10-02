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

<div class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[1000] p-4" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="presentation">
	<div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto sm:p-6" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
		<div class="flex justify-between items-start mb-6 gap-4">
			<div class="flex flex-col gap-2 flex-1">
				<h2 class="m-0 text-gray-900 text-[1.75rem] sm:text-2xl">{menuItem.name}</h2>
				<div class="flex flex-wrap gap-1">
					{#each menuItem.categories as category}
						<span class="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">{category}</span>
					{/each}
				</div>
			</div>
			<button class="bg-transparent border-none text-2xl cursor-pointer text-gray-600 p-0 w-8 h-8 flex items-center justify-center rounded transition-colors flex-shrink-0 hover:bg-gray-100" onclick={onClose} aria-label="Close">×</button>
		</div>

		<div class="flex justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-200 flex-col sm:flex-row">
			<p class="text-gray-600 leading-relaxed m-0 flex-1">{menuItem.description}</p>
			<span class="text-2xl font-bold text-blue-600 flex-shrink-0 sm:text-xl">${menuItem.price.toFixed(2)}</span>
		</div>

		<div class="bg-gray-50 p-4 rounded-md mb-6 text-center">
			{#if reviewCount > 0}
				<div class="flex gap-1 justify-center mb-2">
					{#each Array(5) as _, i}
						<span class="text-2xl {i < Math.round(averageRating) ? 'text-amber-400' : 'text-gray-300'}">★</span>
					{/each}
				</div>
				<span class="text-gray-600 text-sm">{averageRating} average rating from {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
			{:else}
				<p class="text-gray-400 italic m-0">No reviews yet for this item.</p>
			{/if}
		</div>

		{#if reviewCount > 0}
			<div class="mt-6">
				<h3 class="m-0 mb-4 text-gray-900 text-xl">Reviews</h3>
				<div class="flex flex-col">
					{#each itemReviews as review (review.id)}
						<ReviewCard {review} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
