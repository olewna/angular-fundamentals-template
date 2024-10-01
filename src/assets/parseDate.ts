export function parseDateDDMMYYYY(dateString: string) {
  const parts = dateString.split("/");
  const day = +parts[0];
  const month = +parts[1] - 1;
  const year = +parts[2];

  return new Date(year, month, day);
}
