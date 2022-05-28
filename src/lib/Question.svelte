<script lang="ts">
    export let ordinal: number;
    export let name: string;
    export let heading: string;
    export let type: string;
    export let options: string[] = []; 
</script>

<div class="flex flex-row items-start text-lg pb-6">
    <label for={name}>
        <span class="inline-block font-semibold bg-black text-white w-8 mr-3 text-center h-8 rounded-full">{ordinal}.</span>
    </label><br>
    <div class="flex flex-col items-start space-y-3">
        <span class="font-semibold">{heading}</span>
        {#if type == "select"}
        <select name={name} class="rounded-md" required>
            <option value="">Select an option...</option>
            {#each options as option}
            <option value={option}>{option}</option>
            {/each}
        </select>
        {:else}
        <input name={name} type={type} class="w-20 rounded-md" required/>
        {/if}
    </div>
</div>
