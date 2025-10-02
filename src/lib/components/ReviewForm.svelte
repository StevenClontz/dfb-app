<script lang="ts">
	import { addReview } from '$lib/stores';
	import type { MenuItem } from '$lib/types';

	interface Props {
		menuItem: MenuItem;
		onClose: () => void;
	}

	let { menuItem, onClose }: Props = $props();

	let rating = $state(5);
	let comment = $state('');
	let author = $state('');

	function handleSubmit() {
		if (!author.trim() || !comment.trim()) {
			alert('Please fill in all fields');
			return;
		}

		addReview({
			menuItemId: menuItem.id,
			rating,
			comment: comment.trim(),
			author: author.trim()
		});

		onClose();
	}

	function handleStarClick(starRating: number) {
		rating = starRating;
	}
</script>

<div class="modal-backdrop" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="presentation">
	<div class="modal-content" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
		<div class="modal-header">
			<h2>Review: {menuItem.name}</h2>
			<button class="close-btn" onclick={onClose} aria-label="Close">×</button>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<div class="form-group">
				<label for="author">Your Name</label>
				<input 
					id="author"
					type="text" 
					bind:value={author}
					placeholder="Enter your name"
					required
				/>
			</div>

			<div class="form-group">
				<label for="rating">Rating</label>
				<div id="rating" class="star-rating" role="radiogroup" aria-label="Rating">
					{#each Array(5) as _, i}
						<button
							type="button"
							class="star-btn {i < rating ? 'filled' : ''}"
							onclick={() => handleStarClick(i + 1)}
							aria-label="{i + 1} stars"
						>
							★
						</button>
					{/each}
				</div>
			</div>

			<div class="form-group">
				<label for="comment">Your Review</label>
				<textarea 
					id="comment"
					bind:value={comment}
					placeholder="Share your thoughts about this menu item..."
					rows="4"
					required
				></textarea>
			</div>

			<div class="form-actions">
				<button type="button" class="btn-secondary" onclick={onClose}>Cancel</button>
				<button type="submit" class="btn-primary">Submit Review</button>
			</div>
		</form>
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
		max-width: 500px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	h2 {
		margin: 0;
		color: #1a1a1a;
		font-size: 1.5rem;
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
	}

	.close-btn:hover {
		background: #f3f4f6;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #374151;
	}

	input, textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 1rem;
		font-family: inherit;
	}

	input:focus, textarea:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	textarea {
		resize: vertical;
	}

	.star-rating {
		display: flex;
		gap: 0.25rem;
	}

	.star-btn {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		padding: 0;
		color: #d1d5db;
		transition: color 0.2s, transform 0.1s;
	}

	.star-btn:hover {
		transform: scale(1.1);
	}

	.star-btn.filled {
		color: #fbbf24;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
	}

	button[type="submit"],
	button[type="button"] {
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: background 0.2s;
	}

	.btn-primary {
		background: #2563eb;
		color: white;
	}

	.btn-primary:hover {
		background: #1d4ed8;
	}

	.btn-secondary {
		background: #f3f4f6;
		color: #374151;
	}

	.btn-secondary:hover {
		background: #e5e7eb;
	}
</style>
