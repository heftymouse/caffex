<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';
    import { currentTab, pageName } from './lib/stores';
    import {caffeineData, SessionData, sessionData} from './stores'
    import {CaffeineStorage, getDailyLimit, getLast24HoursTotalCaffeine} from "./lib/types";

    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })

    onMount(() => {
        currentTab.set("session");
        pageName.set("Session");
    })

    let cachedCaffeineData: CaffeineStorage[];

    let cachedSessionData: SessionData = null;
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
    const mgPerMl = {
        "Brewed Coffee": 0.4,
        "Espresso": 2.1,
        "Tea": 0.2,
        "Green Tea": 0.12,
        "Energy Drink": 0.3
    }
    $: age = Number(localStorage.getItem('age'));
    $: weight = Number(localStorage.getItem('weight'));
    $: dailyLimit = getDailyLimit(age, weight);
    $: last24hoursCaffeine = getLast24HoursTotalCaffeine(cachedCaffeineData);

    type CaffeineDose = {
        amount: number,
        time: string,
        type: string
    }
    let nextDoseOfCaffeine: CaffeineDose = null;

    caffeineData.subscribe(data => {
        cachedCaffeineData = data;
        if (cachedSessionData != null) {
            calculateNextDose();
        }
    });

    // TODO
    function calculateNextDose() {
        const leftMg: number = Math.min(dailyLimit - last24hoursCaffeine, 50);
        if (leftMg + 50 <= dailyLimit) {
            return {
                amount: 50,
                time: "",
                type: ""
            }
        }
    }

    let formPreferredDrink: string;
    let formTime: Date;

    function diffHHMM(first: Date, next: Date) {
        const diff = next.getTime() - first.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }
</script>

<div class="flex flex-col text-3xl justify-center items-center pt-2">
    {#if cachedSessionData == null}
        <h1 class="font-2xl">Create a session</h1>
        <form>
            <div class="flex flex-col w-full text-left p-4 items-center">
                <div class="pb-3">
                    <label class="text-xl">Preferred Drink: &nbsp;&nbsp;</label>
                    <select name="Preferred" class="rounded-md" bind:value={formPreferredDrink} required>
                        <option value="">Select an option...</option>
                        {#each options as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>
                <div class="pb-3">
                    <label class="text-xl">Awake till: &nbsp;&nbsp;</label>
                    <input type="datetime-local" name="Time" class="rounded-md" bind:value={formTime} required>
                </div>
                <button on:click={() => {
                    sessionData.set({
                        preferredDrink: formPreferredDrink,
                        time: formTime
                    });
                    calculateNextDose();
                }} class="default-button">
                    <span class="font-bold">Start session</span>
                </button>
            </div>
        </form>
    {:else}
        {#if dailyLimit === 0 || age < 12}
            <h1 class="font-3xl">You shouldn't be having any caffeine so as to not exceed the daily limit</h1>
        {:else}
            <h1 class="font-3xl">Your session ends in {diffHHMM(new Date(), cachedSessionData.time)}</h1>
            <h1 class="font-3xl">Your next dose of caffeine should be a </h1>
        {/if}
        <button on:click={() => sessionData.set(null)} class="default-button">
            <span class="font-bold">Stop session</span>
        </button>
    {/if}
</div>
