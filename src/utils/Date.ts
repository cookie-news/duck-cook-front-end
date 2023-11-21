function parseSecondsToHours(seconds: number) {
  var hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  var minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");

  var result = `${hours}h e ${minutes} min`;

  return result;
}

export const Date = {
  parseSecondsToHours,
};
