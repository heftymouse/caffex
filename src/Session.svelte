<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';
    import { currentTab, pageName } from './lib/stores';
    import {caffeineData, SessionData, CaffeineDose} from './stores'
    import {CaffeineStorage, getAllCaffeineAt, getDailyLimit, getLast24HoursTotalCaffeine} from "./lib/types";
    import CaffeineSuggestion from "./CaffeineSuggestion.svelte";

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
    const options = [
        "Brewed Coffee",
        "Espresso",
        "Tea",
        "Green Tea",
        "Energy Drink"
    ];
    const mgPerMlAll = {
        "Brewed Coffee": 0.4,
        "Espresso": 2.1,
        "Tea": 0.2,
        "Green Tea": 0.12,
        "Energy Drink": 0.3
    }
    const optimumAmount = {
        "Brewed Coffee": 100,
        "Espresso": 25,
        "Tea": 150,
        "Green Tea": 250,
        "Energy Drink": 160
    }
    $: age = Number(localStorage.getItem('age'));
    $: weight = Number(localStorage.getItem('weight'));
    $: dailyLimit = getDailyLimit(age, weight);
    $: last24hoursCaffeine = getLast24HoursTotalCaffeine(cachedCaffeineData);
    let nextDoseOfCaffeine: CaffeineDose = null;

    caffeineData.subscribe(data => {
        cachedCaffeineData = data;
        if (cachedSessionData != null) {
            calculateNextDose();
        }
    });

    // TODO
    function calculateNextDose() {
        if (age < 12) {
            nextDoseOfCaffeine = {
                doseType: "invalid",
                time: "",
                type: ""
            }
        }
        const currentRateAmount = getAllCaffeineAt(cachedCaffeineData, cachedSessionData.time);
        if (currentRateAmount >= 50) {
            return nextDoseOfCaffeine = {
                doseType: "sleep",
                time: "",
                type: ""
            };
        } else {
            nextDoseOfCaffeine = {
                doseType: "dose",
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
        <h1 class="text-3xl">Create a session</h1>
        <h3 class="text-lg">Get suggested on an optimal caffeine schedule</h3>
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
                    cachedSessionData = {
                        preferredDrink: formPreferredDrink,
                        time: formTime
                    };
                    calculateNextDose();
                }} class="default-button">
                <span class="font-bold">Start session</span>
            </button>
        </div>
    {:else}
        <CaffeineSuggestion dose={nextDoseOfCaffeine}/>
        <button on:click={() => cachedSessionData = null} class="default-button">
            <span class="font-bold">Stop session</span>
        </button>
    {/if}
</div>
