<script lang="ts">
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    export let icon: IconDefinition;
    export let name: string;
    export let route: string;
</script>

<div on:click={() => location.hash = `#/${route}`} class="w-32 flex flex-col md:flex-row items-center text-lg">
    <Fa icon={icon} class="md:px-1.5"/>
    <span class="md:-px-1.5">{name}</span>
</div>