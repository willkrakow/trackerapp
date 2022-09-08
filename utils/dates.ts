import { Dayjs } from 'dayjs';

const last = <T>(arr: T[]) => arr[arr.length - 1];

export function getDaysBetween(start: Dayjs, end: Dayjs){
    const arr = [start];
    let shouldContinue = true;
    while(shouldContinue){
        const nextDay = last(arr).add(1, 'day');
        shouldContinue = nextDay.isBefore(end);
        if(shouldContinue){
            arr.push(nextDay);
        } else {
            break;
        }
    }

    return arr;
}