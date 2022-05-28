<script lang="ts">
    export let ordinal: number;
    export let name: string;
    export let heading: string;
    export let type: string;
</script>

<div class="flex flex-row items-start text-lg pb-6">
    <label for={name}>
        <span class="inline-block font-semibold bg-black text-white w-8 mr-3 text-center h-8 rounded-full">{ordinal}.</span>
    </label><br>
    <div class="flex flex-col items-start space-y-3">
        <span class="font-semibold">{heading}</span>
        <input name={name} type={type} inputmode="numeric" class="w-20 rounded-md"/>
    </div>
</div>
