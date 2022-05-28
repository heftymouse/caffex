<script lang="ts">
    import Line from "svelte-chartjs/src/Line.svelte"
    import Bar from "svelte-chartjs/src/Bar.svelte"
    import {getLast24HoursTotalCaffeine} from "./lib/types"

    let instantaneousCaffeineData = {
        labels: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
        datasets: [{
            label: "Approximate Caffeine in body",
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(255, 100, 18)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointRadius: 1,
            data: [100, 87, 75.8, 66, 57.4, 50, 43.5]
        }]
    };
    
    let dailyCaffeineData = {
        labels: ["22/7", "23/7", "24/7", "25/7", "26/7", "27/7"],
        datasets: [
            {
                label: "Daily Caffeine intake",
                data: [300, 250, 330, 200, 150, 140],
                backgroundColor: [
                    "rgba(69, 69, 69, 1)",
                    "rgba(69, 69, 69, 1)",
                    "rgba(69, 69, 69, 1)",
                    "rgba(69, 69, 69, 1)",
                    "rgba(69, 69, 69, 1)",
                    "rgba(69, 69, 69, 1)"
                ],
                borderWidth: 2,
                borderColor: [
                    "rgba(29, 29, 29, 1)",
                    "rgba(29, 29, 29, 1)",
                    "rgba(29, 29, 29, 1)",
                    "rgba(29, 29, 29, 1)",
                    "rgba(29, 29, 29, 1)",
                    "rgba(29, 29, 29, 1)"
                ]
            }
        ]
    };
    
    let options = {
        responsive: true,
        scales: {
            xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
</script>

<h4 class="text-xl">Caffeine in the last 24 hours: {"placeholder"} mg</h4>
<h4 class="text-xl">Approximate amount of caffeine: 50 mg</h4>
<h4 class="text-xl">Your intake is not above the daily limit</h4>
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
