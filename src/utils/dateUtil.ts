export class DateUtils {
  static parseISODateToDDMMYYYY(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  static parseUTCDateToDDMMYYYY(utcDate: string): string {
    // Convert to Date object (UTC)
    const date = new Date(utcDate);

    // Convert to local components
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format as DD-MMM-YYYY
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
}
