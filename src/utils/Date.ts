function parseSecondsToHours(seconds: number) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");

  const result = `${hours}h e ${minutes} min`;

  return result;
}

function separateParseHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {hours, minutes};
}

export const Date = {
  parseSecondsToHours,
  separateParseHoursAndMinutes
};
