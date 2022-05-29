<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';
    import { currentTab, pageName } from './lib/stores';
    import { sessionData } from './stores'

    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })

    onMount(() => {
        currentTab.set("session");
        pageName.set("Session");
    })

    let cachedSessionData = null;
    sessionData.subscribe(data => {
        cachedSessionData = data;
    });
    const options = [
        "Brewed Coffee",
        "Espresso",
        "Tea",
        "Green Tea",
        "Energy Drink"
    ];
</script>

<div class="flex flex-col text-3xl justify-center items-center pt-2">
    {#if cachedSessionData == null}
        <h1 class="font-2xl">Create a session</h1>
        <form>
            <div class="flex flex-col w-full text-left p-4 items-center">
                <div class="pb-3">
                    <label class="text-xl">Preferred Drink: &nbsp;&nbsp;</label>
                    <select name="Preferred" class="rounded-md" required>
                        <option value="">Select an option...</option>
                        {#each options as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>
                <div class="pb-3">
                    <label class="text-xl">Awake till: &nbsp;&nbsp;</label>
                    <input type="datetime-local" name="Time" class="rounded-md" required>
                </div>
                <input type="submit" value="Start Session" class="default-button"/>
            </div>
        </form>
    {/if}
</div>
