const timeSincePost = (dateOfPost) => {
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  const diffInDay = (now - dateOfPost) / msInDay;
  const diffInHours = diffInDay * 24;
  const diffInMinutes = diffInHours * 60;
  const diffInSeconds = diffInMinutes * 60;
  if (Math.floor(diffInHours) === 0) {
    return `${Math.floor(diffInSeconds)} seconds`;
  } else if (Math.floor(diffInHours) === 0) {
    return `${Math.floor(diffInMinutes)} minutes`;
  } else if (Math.floor(diffInDay / 365) === 0) {
    return `${Math.floor(diffInHours)} hours`;
  } else if (diffInDay < 31) {
    return `${Math.floor(diffInDay / 365)} days`;
  } else if (diffInDay <= 365) {
    return `${Math.floor(diffInDay / 31)} months`;
  } else {
    return `${Math.floor(diffInDay / 365)} years`;
  }
};
