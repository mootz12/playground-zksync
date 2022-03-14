<script lang="ts">
  import { Contract, Signer } from 'zksync-web3';
  import { ethers } from 'ethers';
  import { HELLO_CONTRACT } from '../contracts';
  import { tokens, wallet } from '$lib/wallet';
  import { zkUtils } from '$lib/utils';
  import { Token } from 'zksync-web3/build/types';

  // state
  // -> token related
  let token = tokens[0]
  let balance = '0.0'
  let loadingBalance = false
  let progress = 0

  // -> contract related
  let helloContract: Contract | undefined;
  let message = '';
  let greeting = '';
  let estFee = '';
  let sendingTx = false;

  // modifiers

  async function updateToken(token: Token) {
    console.log('Updating token:', token.symbol);
    try {
      if ($wallet.connected && !loadingBalance) {
        loadingBalance = true;
        balance = await zkUtils.fetchBalanceAsync($wallet, token);
        loadingBalance = false;
      }
    } catch (e) {
      loadingBalance = false;
      alert(`Unable to update token: ${e.message}}`);
    }
  }

  
  async function handleHello() {
    if (helloContract) {
      message = await helloContract.greet();
    } else {
      message = 'Please connect to zkSync to say Hello'
    }
  }

  async function changeGreeting() {
    try {
      sendingTx = true;
      progress = 0.25
      console.log('Changing greeting...');
      const txHandle = await helloContract.setGreeting(greeting.length === 0 ? message : greeting, {
        customData: {
          feeToken: token.address
        }
      });
      progress = 0.50
      console.log('Sent to MM...');
      // Wait until the transaction is committed
      await txHandle.wait();
      progress = 0.75
      console.log('Tx committed');
      await handleHello();
      progress = 1
      sendingTx = false;
    } catch (e) {
        alert(JSON.stringify(e));
        sendingTx = false;
    }
  };

  async function estimateFee() {
    try {
      const feeInGas = await helloContract.estimateGas.setGreeting(greeting, {
          customData: {
            feeToken: token.address
        }
      });
      const gasPriceInUnits = await $wallet.provider.getGasPrice(token.address);

      estFee = ethers.utils.formatUnits(feeInGas.mul(gasPriceInUnits), token.decimals);
    } catch {
      alert('Failed to fetch fee')
    }
  }

  // reactive declarations

  $: if ($wallet.connected) {
    helloContract = new Contract(HELLO_CONTRACT.address, HELLO_CONTRACT.abi, $wallet.signer)
    updateToken(token)
  }
  
  // -> fetch greeting if helloContract updates
  $: if (helloContract) {
    handleHello()
  }
  
  // -> fetch fee if token changes
  $: if (token.address !== undefined) {
    estimateFee()
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .container-item {
    margin:1em;
  }

</style>

<h1>A Poorly Designed Excuse to Learn Svelte with Svelte-Kit</h1>

<div class="container">
  <h2 class="container-item">Say Hello to zkSync!</h2>
  <button class="container-item" on:click={handleHello}>Hello!</button>
  {#if message !== ''}
    <h2 class="container-item">{message}</h2>
  {/if}
</div>

<div class="container">
  <label class="container-item" for="token-selector">
    <p>Select a token:</p>
  </label>
  <select name="token-selector" id="tokens" bind:value={token}>
    {#each tokens as token}
      <option value={token}>{token.symbol}</option>
    {/each}
  </select>
</div>

<div class="container">
  {#if Number(balance) > 0}
    <p>Current Token Balance: {balance}</p>
  {:else}
    <p>No Token Balance</p>
  {/if}
</div>

<div class="container">
  <p>Estimated Fee: {estFee}</p>
  <button class="container-item" on:click={estimateFee}>Refresh</button>
</div>

<div class="container">
  <input class="container-item" bind:value={greeting} />
  {#if sendingTx}
    <progress value={progress}></progress>
  {:else}
    <button class="container-item" on:click={changeGreeting}>Change Greeting</button>
  {/if}
</div>