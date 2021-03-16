export const formatUploadTime = (created_at) => {
  const timeCreatedAt = new Date(created_at);
  const currentTime = new Date(Date.now());
  let years = currentTime.getFullYear() - timeCreatedAt.getFullYear();;
  let months = currentTime.getMonth() - timeCreatedAt.getMonth();
  if (months < 0) {
    months = 12 - (timeCreatedAt.getMonth() - currentTime.getMonth());
    years--;
  };
  let days = currentTime.getDate() - timeCreatedAt.getDate();;
  if (days < 0) {
    days = 12 - (timeCreatedAt.getDate() - currentTime.getDate());
    months--;
  }

  if (years > 1) return `${years} years ago`;
  else if (years === 1) return "1 year ago";
  else if (months > 1) return `${months} months ago`;
  else if (months === 1) return "1 month ago";
  else if (days > 1) return `${days} days ago`;
  else if (days === 1) return "1 day ago";
  else return "Today";
};

export const getFormattedDate = (currDate) => {
  const monthNames = [
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
  
  const date = new Date(currDate)
  let year = date.getFullYear();

  let month = (date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return monthNames[Number(month)] + " " + day + ", " + year;
}
