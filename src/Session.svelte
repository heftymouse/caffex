<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';
    import { currentTab } from './stores';

    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })

    onMount(() => {
        currentTab.set("session");
    })
</script>

<div class="flex flex-col text-3xl justify-center items-center pt-2">
</div>
