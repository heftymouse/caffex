<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import { currentTab } from './stores.js'
    import Statistics from "./Statistics.svelte";
    let intakeDialog;

    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })

    onMount(() => {
        currentTab.set("")
    })
</script>

<div class="flex flex-col p-6 justify-center items-center">
    <button on:click={() => intakeDialog.showModal()} class="default-button">
        Add new caffeine intake
    </button>
    <br>
    <Statistics/>
    <br>
</div>

<dialog bind:this={intakeDialog} class="rounded-md">
    <div class="flex flex-col p-3">
        <button on:click={() => intakeDialog.close()} class="self-end rounded-sm">X</button>
        <h1 class="w-full self-center">New caffeine intake</h1>
    </div>
</dialog>
