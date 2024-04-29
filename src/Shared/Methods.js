export default class Methods {
  static formatShortDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    // Define the days of the week and months

    // Get the components of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };

  static formatLongDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Define the days of the week and months

    // Get the components of the date
    const day = date.getDate();
    const monthIndex = date.getMonth(); // Zero-based month index
    const month = months[monthIndex];
    const year = date.getFullYear().toString();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };
}
