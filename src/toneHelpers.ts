export const getBeats = (barsBeatsSixteenths: string): number => {
    console.log("bbs", barsBeatsSixteenths)
    return parseInt(barsBeatsSixteenths.split(":")[1])
}