<script lang="ts">
    let intakeDialog;
</script>

<div class="flex flex-col p-6 justify-center items-center">
    <button on:click={() => intakeDialog.showModal()} class="self-center h-12 text-lg bg-black hover:bg-gray-600 transition-colors align-middle leading-none text-white p-3 rounded-md">
        Add new caffeine intake
    </button>
    <br>
    <h4 class="text-xl">Caffeine in the last 24 hours: 140 mg</h4>
    <h4 class="text-xl">Approximate amount of caffeine: 50 mg</h4>
    <h4 class="text-xl">Your intake is not above the daily limit</h4>
    <div class="w-full text-left pl-4 pt-4">
        <h4 class="text-2xl decoration-gray-300 underline">Recent caffeine intakes</h4>
        <table class="table-auto text-xl w-full">
            <thead>
            <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Caffeine</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Coca Cola</td>
                <td>17:15</td>
                <td>10 mg</td>
            </tr>
            <tr>
                <td>Energy Drink</td>
                <td>16:45</td>
                <td>30 mg</td>
            </tr>
            <tr>
                <td>Brewed Coffee</td>
                <td>10:15</td>
                <td>100 mg</td>
            </tr>
            </tbody>
        </table>
    </div>
    <br>
</div>

<dialog bind:this={intakeDialog} class="rounded-md">
    <div class="flex flex-col p-3">
        <button on:click={() => intakeDialog.close()} class="self-end rounded-sm">X</button>
        <h1 class="w-full self-center">New caffeine intake</h1>
    </div>
</dialog>
