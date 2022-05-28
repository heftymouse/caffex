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
    const ms: number = new Date().getUTCMilliseconds()
    return data.filter((value) => ms - value.timestamp.getUTCMilliseconds() <= olderThanMs);
}

export function getLast24HoursTotalCaffeine(data: CaffeineStorage[]): number {
    return clearData(data, TWENTY_FOUR_HOURS).reduce((total, datum) => datum.caffeine + total, 0);
}

export function getCaffeineAtAll(data: CaffeineStorage[], at: Date): number {
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
