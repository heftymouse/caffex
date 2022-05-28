<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import Statistics from "./Statistics.svelte";
    import { currentTab, pageName } from './lib/stores'
    import Question from './lib/Question.svelte'
    import Fa from "svelte-fa";
    import { faClose } from "@fortawesome/free-solid-svg-icons";
    import type { CaffeineStorage } from "./lib/types";
    import { Db } from "./lib/db";
    
    const mgPerMl = {
        "Brewed Coffee": 0.4,
        "Espresso": 2.1,
        "Tea": 0.2,
        "Green Tea": 0.12,
        "Energy Drink": 0.3
    }
    
    const questions = [
        {
            heading: "What kind of drink did you have?",
            name: "drinkName",
            type: "select",
            options: [
                "Brewed Coffee",
                "Espresso",
                "Tea",
                "Green Tea",
                "Energy Drink"
            ]
        },
        {
            heading: "How much of it did you have, in millilitres?",
            name: "drinkAmount",
            type: "number"
        }
    ]
    
    let intakeDialog;
    let intakeForm;
    
    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })

    onMount(() => {
        currentTab.set("");
        pageName.set("Home");
    })

    async function onFormSubmit(e) {
        let data: FormData = new FormData(e.target);
        console.log(...data);
        const cf: CaffeineStorage = {
            drink: data.get('drinkName') as string,
            caffeine: parseInt(data.get('drinkAmount') as string),
            timestamp: new Date(Date.now())
        }

        let db = new Db();
        await db.init();
        db.addHistory(cf);
        e.target.reset();
        intakeDialog.close();
    }
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
    <form on:submit|preventDefault={onFormSubmit} bind:this={intakeForm}>
        <div class="flex flex-col p-3 items-start">
            <button on:click={(e) => { intakeForm.reset(); intakeDialog.close() }} class="self-end rounded-sm">
                <Fa icon={faClose} scale={1.2}/>
            </button>
            <h1 class="self-center text-3xl font-bold pb-6">New caffeine intake</h1>
            {#each questions as q, i}
            <Question ordinal={i + 1} {...q}/>
            {/each}
            <input type="submit" value="Submit" class="default-button"/>
        </div>
    </form>
</dialog>
