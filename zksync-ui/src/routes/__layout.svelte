<script lang="ts">
  import '../app.css';
	import Header from '$lib/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Code available at <a href="https://github.com/mootz12/playground-zksync">mootz12/playground-zksync</a></p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
