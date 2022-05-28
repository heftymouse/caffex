<script lang="ts">
    import Question from "./lib/Question.svelte";
    const questions = [
        {
            heading: "What is your body weight?",
            name: "weight",
            type: "number"
        },
        {
            heading: "What is your age?",
            name: "age",
            type: "number"
        }
    ]

    let form;

    function onSubmit(e) {
        let data: FormData = new FormData(e.target);
        for(let field of data.entries()) {
            localStorage.setItem(field[0], field[1] as string);
        }
        location.hash = '#/'
    }
</script>

<div class="flex flex-col p-6 justify-center items-center">
    <div class="items-start">
        <h1 class="text-3xl font-semibold pb-12">First, we need to know some info about you.</h1>
        <form on:submit|preventDefault={onSubmit} bind:this={form}>
            {#each questions as q, i}
            <Question ordinal={i + 1} {...q}/>
            {/each}
            <input type="submit" value="Submit" class="default-button"/>
        </form>
    </div>
</div>
