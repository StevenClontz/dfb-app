<script lang="ts">
	import { menuItems, reviews } from '$lib/stores';
	import MenuItemCard from '$lib/components/MenuItemCard.svelte';
	import ReviewForm from '$lib/components/ReviewForm.svelte';
	import ViewReviewsModal from '$lib/components/ViewReviewsModal.svelte';
	import type { MenuItem } from '$lib/types';

	let selectedMenuItemForReview = $state<MenuItem | null>(null);
	let selectedMenuItemForViewing = $state<MenuItem | null>(null);
	let selectedCategory = $state<string>('All');
	
	let categories = $derived(['All', ...new Set($menuItems.flatMap(item => item.categories))]);
	let filteredItems = $derived(
		selectedCategory === 'All' 
			? $menuItems 
			: $menuItems.filter(item => item.categories.includes(selectedCategory))
	);

	function handleReviewClick(itemId: string) {
		selectedMenuItemForReview = $menuItems.find(item => item.id === itemId) || null;
	}

	function handleViewReviewsClick(itemId: string) {
		selectedMenuItemForViewing = $menuItems.find(item => item.id === itemId) || null;
	}

	function handleCloseReviewModal() {
		selectedMenuItemForReview = null;
	}

	function handleCloseViewModal() {
		selectedMenuItemForViewing = null;
	}
</script>

<div class="container">
	<header>
		<h1>🍽️ Menu Review App</h1>
		<p>Discover and review delicious menu items</p>
	</header>

	<div class="filters">
		<label for="category-filter">Filter by category:</label>
		<select id="category-filter" bind:value={selectedCategory}>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	<div class="menu-grid">
		{#each filteredItems as item (item.id)}
			<MenuItemCard 
				{item} 
				allReviews={$reviews}
				onReview={handleReviewClick}
				onViewReviews={handleViewReviewsClick}
			/>
		{/each}
	</div>

	{#if filteredItems.length === 0}
		<div class="no-items">
			<p>No menu items found in this category.</p>
		</div>
	{/if}
</div>

{#if selectedMenuItemForReview}
	<ReviewForm 
		menuItem={selectedMenuItemForReview}
		onClose={handleCloseReviewModal}
	/>
{/if}

{#if selectedMenuItemForViewing}
	<ViewReviewsModal 
		menuItem={selectedMenuItemForViewing}
		allReviews={$reviews}
		onClose={handleCloseViewModal}
	/>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		background: #f3f4f6;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		margin: 0 0 0.5rem 0;
		color: #1a1a1a;
		font-size: 2.5rem;
	}

	header p {
		margin: 0;
		color: #6b7280;
		font-size: 1.125rem;
	}

	.filters {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		background: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	label {
		font-weight: 600;
		color: #374151;
	}

	select {
		padding: 0.5rem 1rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		background: white;
	}

	select:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.no-items {
		text-align: center;
		padding: 3rem;
		background: white;
		border-radius: 8px;
		color: #6b7280;
	}

	.no-items p {
		margin: 0;
		font-size: 1.125rem;
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.menu-grid {
			grid-template-columns: 1fr;
		}

		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		select {
			width: 100%;
		}
	}
</style>
