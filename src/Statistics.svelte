<script lang="ts">
    import Line from "svelte-chartjs/src/Line.svelte"
    import Bar from "svelte-chartjs/src/Bar.svelte"
    import {
        CaffeineStorage,
        getAllCaffeineAt,
        getAllCaffeineAtHours, getDailyCaffeineData,
        getDailyLimitMessage,
        getLast24HoursTotalCaffeine
    } from "./lib/types";
    import {caffeineData} from "./stores";

    let cachedCaffeineData: CaffeineStorage[];
    let last24hoursCaffeine: number;
    $: last24hoursCaffeine = getLast24HoursTotalCaffeine(cachedCaffeineData);
    let instantaneousCaffeine: number;
    $: instantaneousCaffeine = Math.floor(getAllCaffeineAt(cachedCaffeineData, new Date()) * 10) / 10;
    let age: number;
    $: age = Number(localStorage.getItem('age'));
    let weight: number;
    $: weight = Number(localStorage.getItem('weight'));
    let dailyLimitMessage: string;
    $: dailyLimitMessage = getDailyLimitMessage(age, weight, last24hoursCaffeine);
    let instantaneousCaffeineData
    $: instantaneousCaffeineData = getAllCaffeineAtHours(cachedCaffeineData, 6);
    let dailyCaffeineData
    $: dailyCaffeineData = getDailyCaffeineData(cachedCaffeineData, 5, age, weight);

    caffeineData.subscribe(data => {
        cachedCaffeineData = data;
    });

    let options = {
        responsive: true,
        scales: {
            xAxes: [{barPercentage: 1, gridLines: {display: true, color: "rgba(0, 0, 0, 0.1)"}}],
            yAxes: [{gridLines: {display: true, color: "rgba(0, 0, 0, 0.1)"}, ticks: {beginAtZero: true}}]
        }
    };
</script>

<h4 class="text-xl">Caffeine in the last 24 hours: {last24hoursCaffeine} mg</h4>
<h4 class="text-xl">Approximate amount of caffeine: {instantaneousCaffeine} mg</h4>
<h4 class="text-xl">{dailyLimitMessage}</h4>
<div class="w-full text-left p-4">
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
<div class="flex flex-col md:flex-row">
    <div>
        <Line data={instantaneousCaffeineData} width={300} height={320} options={{ responsive: true, maintainAspectRatio: false }}/>
    </div>
    <div>
        <Bar data={dailyCaffeineData} width={300} height={320} options={options}/>
    </div>
</div>
<br>
