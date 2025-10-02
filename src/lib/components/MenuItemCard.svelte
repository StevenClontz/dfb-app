<script lang="ts">
	import type { MenuItem, Review } from '$lib/types';
	import { getAverageRating, getMenuItemReviews } from '$lib/stores';

	interface Props {
		item: MenuItem;
		allReviews: Review[];
		onReview: (itemId: string) => void;
		onViewReviews: (itemId: string) => void;
	}

	let { item, allReviews, onReview, onViewReviews }: Props = $props();

	let itemReviews = $derived(getMenuItemReviews(item.id, allReviews));
	let averageRating = $derived(getAverageRating(item.id, allReviews));
	let reviewCount = $derived(itemReviews.length);
</script>

<div class="bg-white rounded-lg p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
	<div class="flex justify-between items-start mb-3">
		<div class="flex flex-col gap-1">
			<h3 class="m-0 text-gray-900 text-xl">{item.name}</h3>
			<div class="flex flex-wrap gap-1">
				{#each item.categories as category}
					<span class="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">{category}</span>
				{/each}
			</div>
		</div>
		<span class="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
	</div>
	
	<p class="text-gray-600 leading-relaxed m-0 mb-4">{item.description}</p>
	
	<div class="flex items-center gap-2 mb-4">
		{#if reviewCount > 0}
			<button class="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer transition-opacity hover:opacity-70" onclick={() => onViewReviews(item.id)}>
				<div class="flex gap-0.5">
					{#each Array(5) as _, i}
						<span class="text-xl {i < Math.round(averageRating) ? 'text-amber-400' : 'text-gray-300'}">★</span>
					{/each}
				</div>
				<span class="text-gray-600 text-sm">{averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
			</button>
		{:else}
			<span class="text-gray-400 text-sm italic">No reviews yet</span>
		{/if}
	</div>

	<button class="w-full px-3 py-3 bg-blue-600 text-white border-none rounded-md font-semibold cursor-pointer transition-colors hover:bg-blue-700" onclick={() => onReview(item.id)}>
		Write a Review
	</button>
</div>
