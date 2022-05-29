export type CaffeineStorage = {
    drink: string;
    caffeine: number;
    timestamp: Date;
}

const TWENTY_FOUR_HOURS: number = 86400000
const THIRTY_SIX_HOURS: number = TWENTY_FOUR_HOURS * 1.5
const SEVEN_DAYS: number = TWENTY_FOUR_HOURS * 7
const MINUTE_COMMON_RATIO: number = 0.9976921765
const HOUR_COMMON_RATIO: number = 0.8714786601

export function clearOldData(data: CaffeineStorage[]): CaffeineStorage[] {
    return clearData(data, SEVEN_DAYS);
}

export function clearData(data: CaffeineStorage[], olderThanMs: number): CaffeineStorage[] {
    const ms: number = new Date().getTime()
    return data.filter((value) => (ms - value.timestamp.getTime()) <= olderThanMs);
}

export function getLast24HoursTotalCaffeine(data: CaffeineStorage[]): number {
    return getCaffeineConsumptionFrom(data, new Date(new Date().getTime() - TWENTY_FOUR_HOURS), new Date());
}

export type SimpleCaffeineStorage = {
    drink: string;
    caffeine: number;
    timestamp: string;
}

export function getRecentCaffeineIntakes(data: CaffeineStorage[]): SimpleCaffeineStorage[] {
    const simpleData: SimpleCaffeineStorage[] = clearData(data, THIRTY_SIX_HOURS).map(datum => {
        return {
            drink: datum.drink,
            caffeine: datum.caffeine,
            timestamp: formatHHMMDDMM(datum.timestamp)
        }
    });
    if (simpleData.length <= 3) {
        return simpleData;
    }
    return simpleData.slice(0, 3).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

function formatHHMMDDMM(date: Date): string {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`;
}

function formatHHMM(date: Date): string {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

export function getAllCaffeineNow(data: CaffeineStorage[]): number {
    return getAllCaffeineAt(data, new Date());
}

export function getAllCaffeineAt(data: CaffeineStorage[], at: Date): number {
    let caffeine: number = 0;
    data.forEach(datum => {
        caffeine += getCaffeineAt(datum, at);
    });
    return caffeine;
}

export function getCaffeineAt(datum: CaffeineStorage, at: Date): number {
    const diff = at.getTime() - datum.timestamp.getTime();
    if (diff < 0) {
        return 0; // The intake hasn't happened yet.
    }
    const diffSeconds = Math.floor(diff / 1000);
    const minutes = ((diffSeconds % 3600) / 60);
    const hours = diffSeconds / 3600 + minutes / 60;
    const caffeine = datum.caffeine * Math.pow(HOUR_COMMON_RATIO, hours);
    if (caffeine < 1) {
        return 0;
    }
    return caffeine;
}

export type status = "over" | "under" | "approaching"

export function getDailyLimitMessage(age: number, weight: number, thing: number): string {
    const dailyLimitStatus: status = getDailyLimitStatus(age, weight, thing);
    if (dailyLimitStatus == "over") {
        return "Your caffeine consumption is over the daily limit %s 💀";
    } else if (dailyLimitStatus == "approaching") {
        return "Your caffeine consumption is approaching the daily limit %s 😬";
    }
    return "Your caffeine consumption is under the daily limit %s 🎉";
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
    const nowHrs = new Date(now.getTime() - (now.getMinutes() * 60000) - (now.getSeconds() * 1000));
    for (let i = 0; i < hours; i++) {
        const at = new Date(nowHrs.getTime() - (i * 3600000));
        labels.push(formatHHMM(at));
        values.push(getAllCaffeineAt(data, at));
    }
    return {
        labels: labels.reverse(),
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
            data: values.reverse()
        }]
    };
}

export function getCaffeineConsumptionFrom(data: CaffeineStorage[], from: Date, to: Date): number {
    let total: number = 0;
    data.forEach(datum => {
        if (datum.timestamp >= from && datum.timestamp <= to) {
            total += datum.caffeine;
        }
    });
    return total;
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
        values.push(getCaffeineConsumptionFrom(data, new Date(startDay.getTime() + (i * 86400000)), new Date(startDay.getTime() + ((i + 1) * 86400000))));
        pushColors(backgroundColors, borderColors, values[i], dailyLimit);
    }
    labels.push("Today")
    const today = new Date(now.getTime() - now.getHours() * 3600000 - now.getMinutes() * 60000 - now.getSeconds() * 1000);
    const todayCaffeine = getCaffeineConsumptionFrom(data, today, now);
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
