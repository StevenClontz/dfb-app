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

<div class="max-w-7xl mx-auto px-8 py-8">
	<header class="text-center mb-12">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">🍽️ Menu Review App</h1>
		<p class="text-gray-600 text-lg">Discover and review delicious menu items</p>
	</header>

	<div class="flex items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm flex-col sm:flex-row">
		<label for="category-filter" class="font-semibold text-gray-700">Filter by category:</label>
		<select id="category-filter" bind:value={selectedCategory} class="px-4 py-2 border border-gray-300 rounded-md text-base cursor-pointer bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 w-full sm:w-auto">
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
		<div class="text-center py-12 bg-white rounded-lg text-gray-600">
			<p class="text-lg m-0">No menu items found in this category.</p>
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
