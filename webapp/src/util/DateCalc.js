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
    days = 12 - (timeCreatedAt.getDay() - currentTime.getDay());
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

