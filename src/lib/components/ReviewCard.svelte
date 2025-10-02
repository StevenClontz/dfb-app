<script lang="ts">
	import type { Review } from '$lib/types';

	interface Props {
		review: Review;
	}

	let { review }: Props = $props();

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<div class="bg-gray-50 border-l-4 border-gray-200 p-4 rounded mb-3">
	<div class="flex justify-between items-center mb-2">
		<div class="flex flex-col gap-0.5">
			<span class="font-semibold text-gray-800">{review.author}</span>
			<span class="text-xs text-gray-400">{formatDate(review.date)}</span>
		</div>
		<div class="flex gap-0.5">
			{#each Array(5) as _, i}
				<span class="text-base {i < review.rating ? 'text-amber-400' : 'text-gray-300'}">★</span>
			{/each}
		</div>
	</div>
	<p class="text-gray-600 leading-normal m-0">{review.comment}</p>
</div>
