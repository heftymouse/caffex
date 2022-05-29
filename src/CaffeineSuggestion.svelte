<script lang="ts">
    import type {CaffeineDose} from "./stores";
    export let dose: CaffeineDose
</script>

{#if dose.noCaffeine}
    <h1 class="text-3xl">No caffeine needed</h1>
    <h3 class="text-lg">You may have consumed enough caffeine today</h3>
{:else}
    <h1 class="text-3xl">Next dose of caffeine</h1>
    <h3 class="text-lg">You should drink {dose.amount}ml of {dose.type}</h3>
    <h3 class="text-lg">You should drink it at/after {dose.time}</h3>
{/if}
