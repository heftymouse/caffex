<script lang="ts">
    let intakeDialog;
</script>

<div class="flex flex-col p-12">
    <button on:click={() => intakeDialog.showModal()} class="self-center h-12 text-lg bg-black hover:bg-gray-600 transition-colors align-middle leading-none text-white p-3 rounded-md">
        Add new caffeine intake
    </button>
</div>

<dialog bind:this={intakeDialog} class="rounded-md">
    <div class="flex flex-col p-3">
        <button on:click={() => intakeDialog.close()} class="self-end rounded-sm">X</button>
        <h1 class="w-full self-center">New caffeine intake</h1>
    </div>
</dialog>