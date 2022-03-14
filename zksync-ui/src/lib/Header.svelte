<script lang="ts">
	import { page } from '$app/stores';
  import { wallet } from '$lib/wallet';
  import { formatter, zkUtils } from '$lib/utils';
  import { Token } from 'zksync-web3/build/types';

  async function handleConnect() {
    console.log('Connecting to MetaMask');
    try {
      $wallet = await zkUtils.connectMetaMask();
      alert('Connected MetaMask')
    } catch (e) {
      alert(`Unable to connect: ${e.message}`)
    }
  }

</script>

<header>
	<div class="corner">
		<a href="/">
			<p>zkSync</p>
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}>
        <a sveltekit:prefetch href="/">Home</a>
      </li>
			<li class:active={$page.url.pathname === '/tbd'}>
				<a sveltekit:prefetch href="/tbd">About</a>
			</li>
		</ul>
	</nav>

  {#if $wallet.connected}
  	<div class="corner">
      <p>
        {formatter.address($wallet.address)}
      </p>
    </div>
  {:else}
    <div class="corner">
      <button on:click={handleConnect}>Connect</button>
    </div>
  {/if}

</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 6em;
		height: 4em;
    display: flex;
		align-items: center;
		justify-content: center;
    margin: 0.25em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
