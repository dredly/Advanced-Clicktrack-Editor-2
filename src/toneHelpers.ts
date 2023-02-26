export const getBars = (barsBeatsSixteenths: string): number => {
    return parseInt(barsBeatsSixteenths.split(":")[0])
}