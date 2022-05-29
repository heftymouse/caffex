<script lang="ts">
    import type {CaffeineDose} from "./stores";
    export let dose: CaffeineDose
</script>

{#if dose.type === "invalid"}
    <h1 class="text-3xl">No caffeine needed</h1>
    <h3 class="text-lg">You should not be consuming caffeine</h3>
{:else if dose.type === "dose"}
    <h1 class="text-3xl">Next dose of caffeine</h1>
    <h3 class="text-lg">You should drink {dose.amount}ml of {dose.type}</h3>
    <h3 class="text-lg">You should drink it at/after {dose.time}</h3>
{:else}
    <h1 class="text-3xl">No caffeine needed</h1>
    <h3 class="text-lg">Best to avoid caffeine if you wish to sleep well</h3>
{/if}
