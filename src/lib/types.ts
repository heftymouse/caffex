export type CaffeineStorage = {
    drink: string;
    caffeine: number;
    timestamp: Date;
}

export let cachedData: CaffeineStorage[] = [];

const TWENTY_FOUR_HOURS: number = 86400000
const THIRTY_SIX_HOURS: number = TWENTY_FOUR_HOURS * 1.5
const SEVEN_DAYS: number = TWENTY_FOUR_HOURS * 7
const MINUTE_COMMON_RATIO: number = 0.9976921765
const HOUR_COMMON_RATIO: number = 0.8714786601

export function clearOldData(data: CaffeineStorage[]): CaffeineStorage[] {
    return clearData(data, SEVEN_DAYS);
}

export function clearData(data: CaffeineStorage[], olderThanMs: number): CaffeineStorage[] {
    const ms: number = new Date().getUTCMilliseconds()
    return data.filter((value) => ms - value.timestamp.getUTCMilliseconds() <= olderThanMs);
}

export function getLast24HoursTotalCaffeine(data: CaffeineStorage[]): number {
    return clearData(data, TWENTY_FOUR_HOURS).reduce((total, datum) => datum.caffeine + total, 0);
}

export function getAllCaffeineAt(data: CaffeineStorage[], at: Date): number {
    return data.reduce((total, datum) => getCaffeineAt(datum, at), 0);
}

export function getCaffeineAt(datum: CaffeineStorage, at: Date): number {
    const diff = at.getUTCMilliseconds() - datum.timestamp.getUTCMilliseconds();
    if (diff < 0) {
        return 0; // The intake hasn't happened yet.
    }
    const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    const caffeine = datum.caffeine * Math.pow(HOUR_COMMON_RATIO, diffHrs) * Math.pow(MINUTE_COMMON_RATIO, diffMins);
    if (caffeine < 3) {
        return 0;
    }
}

export type status = "over" | "under" | "approaching"

export function getDailyLimitMessage(age: number, weight: number, thing: number): string {
    const dailyLimitStatus: status = getDailyLimitStatus(age, weight, thing);
    if (dailyLimitStatus == "over") {
        return "Your caffeine consumption is over the daily limit 💀";
    } else if (dailyLimitStatus == "approaching") {
        return "Your caffeine consumption is approaching the daily limit 😬";
    }
    return "Your caffeine consumption is under the daily limit 🎉";
}

export function getDailyLimitStatus(age: number, weight: number, thing: number): status {
    const dailyLimit = getDailyLimit(age, weight);
    if (thing > dailyLimit) {
        return "over";
    } else if (thing != 0 && (dailyLimit - thing) <= 50) {
        return "approaching";
    }
    return "under";
}

export function getDailyLimit(age: number, weight: number): number {
    if (age < 12) {
        return 0;
    } else if (age <= 18) {
        return 2.5 * weight;
    } else {
        return 400;
    }
}

export function getAllCaffeineAtHours(data: CaffeineStorage[], hours: number) {
    const labels: string[] = [];
    const values: number[] = [];
    const now = new Date();
    const start = new Date(now.getTime() - (hours * 3600000));
    const startHrs = new Date(start.getTime() - start.getMinutes() * 60000);
    for (let i = 0; i < hours; i++) {
        labels.push(`${(startHrs.getHours() + i)}:00`);
        values.push(getAllCaffeineAt(data, new Date(startHrs.getTime() + (i * 3600000))));
    }
    return {
        labels: labels,
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
            data: values
        }]
    };
}

export function getDailyCaffeineData(data: CaffeineStorage[], days: number, age: number, weight: number): any {
    const dailyLimit = getDailyLimit(age, weight);
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];
    const now = new Date();
    const start = new Date(now.getTime() - (days * 86400000));
    const startDay = new Date(start.getTime() - start.getHours() * 3600000);
    for (let i = 0; i < days; i++) {
        labels.push(`${(startDay.getDate() + i)}/${(startDay.getMonth() + 1)}`);
        values.push(getAllCaffeineAt(data, new Date(startDay.getTime() + (i * 86400000))));
        pushColors(backgroundColors, borderColors, values[i], dailyLimit);
    }
    labels.push("Today")
    const todayCaffeine = getAllCaffeineAt(data, now);
    values.push(todayCaffeine);
    pushColors(backgroundColors, borderColors, todayCaffeine, dailyLimit);

    return {
        labels: labels,
        datasets: [
            {
                label: "Daily Caffeine intake",
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: borderColors
            }
        ]
    };
}

function pushColors(backgroundColors: string[], borderColors: string[], value: number, dailyLimit: number) {
    if (value > dailyLimit) {
        backgroundColors.push("rgba(255,14,14,0.3)");
        borderColors.push("rgba(255,14,14,1)");
    } else if (value != 0 && (dailyLimit - value) <= 30) {
        backgroundColors.push("rgba(255,255,14,0.3)");
        borderColors.push("rgba(255,255,14,1)");
    } else {
        backgroundColors.push("rgba(0,255,0,0.3)");
        borderColors.push("rgba(0,255,0,1)");
    }
}
