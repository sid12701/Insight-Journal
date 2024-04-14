export function formatDate(dateStr : string) {
    const date = new Date(dateStr);
  
    // Define an array of month names
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    
    // Get the day of the month, month, and year from the date
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Function to get the ordinal indicator of a given day
    function getOrdinalIndicator(day:number) :string {
      if (day > 3 && day < 21) return 'th'; // for numbers like 11th, 12th, 13th
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }
  
    // Combine everything
    return `${day}${getOrdinalIndicator(day)} ${month} ${year}`;
  }
  
