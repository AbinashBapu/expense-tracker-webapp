export class DateUtils {
  static parseISODateToDDMMYYYY(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
}
