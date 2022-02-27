export class DateHelper {

    // Used to generate random date between start date and end date
    static generateRandomDate(startDate: Date, endDate: Date): string {
        return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).toDateString()
    }

    // Used to format expiry date
    static formatExpiryDate(date: string): string {
        const d = new Date(date);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear().toString().substr(2);
        return `${mm}/${yyyy}`
    }
}