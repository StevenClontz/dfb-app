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

<div class="review-card">
	<div class="review-header">
		<div class="author-section">
			<span class="author">{review.author}</span>
			<span class="date">{formatDate(review.date)}</span>
		</div>
		<div class="stars">
			{#each Array(5) as _, i}
				<span class="star {i < review.rating ? 'filled' : ''}">★</span>
			{/each}
		</div>
	</div>
	<p class="comment">{review.comment}</p>
</div>

<style>
	.review-card {
		background: #f9fafb;
		border-left: 4px solid #e5e7eb;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 0.75rem;
	}

	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.author-section {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.author {
		font-weight: 600;
		color: #1f2937;
	}

	.date {
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.stars {
		display: flex;
		gap: 0.125rem;
	}

	.star {
		font-size: 1rem;
		color: #d1d5db;
	}

	.star.filled {
		color: #fbbf24;
	}

	.comment {
		color: #4b5563;
		line-height: 1.5;
		margin: 0;
	}
</style>
