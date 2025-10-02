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

<div class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[1000] p-4" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="presentation">
	<div class="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
		<div class="flex justify-between items-center mb-6">
			<h2 class="m-0 text-gray-900 text-2xl">Review: {menuItem.name}</h2>
			<button class="bg-transparent border-none text-2xl cursor-pointer text-gray-600 p-0 w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-gray-100" onclick={onClose} aria-label="Close">×</button>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<div class="mb-6">
				<label for="author" class="block mb-2 font-semibold text-gray-700">Your Name</label>
				<input 
					id="author"
					type="text" 
					bind:value={author}
					placeholder="Enter your name"
					required
					class="w-full p-3 border border-gray-300 rounded-md text-base font-inherit focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
				/>
			</div>

			<div class="mb-6">
				<label for="rating" class="block mb-2 font-semibold text-gray-700">Rating</label>
				<div id="rating" class="flex gap-1" role="radiogroup" aria-label="Rating">
					{#each Array(5) as _, i}
						<button
							type="button"
							class="bg-transparent border-none text-[2rem] cursor-pointer p-0 transition-all {i < rating ? 'text-amber-400' : 'text-gray-300'} hover:scale-110"
							onclick={() => handleStarClick(i + 1)}
							aria-label="{i + 1} stars"
						>
							★
						</button>
					{/each}
				</div>
			</div>

			<div class="mb-6">
				<label for="comment" class="block mb-2 font-semibold text-gray-700">Your Review</label>
				<textarea 
					id="comment"
					bind:value={comment}
					placeholder="Share your thoughts about this menu item..."
					rows="4"
					required
					class="w-full p-3 border border-gray-300 rounded-md text-base font-inherit resize-y focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
				></textarea>
			</div>

			<div class="flex gap-4 justify-end mt-8">
				<button type="button" class="px-6 py-3 rounded-md font-semibold cursor-pointer border-none transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" onclick={onClose}>Cancel</button>
				<button type="submit" class="px-6 py-3 rounded-md font-semibold cursor-pointer border-none transition-colors bg-blue-600 text-white hover:bg-blue-700">Submit Review</button>
			</div>
		</form>
	</div>
</div>
