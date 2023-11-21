function parseSecondsToHours(seconds: number) {
  var hours = Math.floor(seconds / 3600);
  var minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");

  let result: Array<string> = [];
  if (hours !== 0) result.push(`${hours}h`);
  if (minutes !== "00") result.push(`${minutes} min`);

  return result.join("e");
}

export const Date = {
  parseSecondsToHours,
};
