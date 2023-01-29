export const getBeats = (barsBeatsSixteenths: string): number => {
    return parseInt(barsBeatsSixteenths.split(":")[1])
}