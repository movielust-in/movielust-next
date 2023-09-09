export default function MinutesToDuration(s: string | number) {
  //   @ts-ignore
  const days = Math.floor(s / 1440);
  //   @ts-ignore
  s -= days * 1440;
  //   @ts-ignore
  const hours = Math.floor(s / 60);
  //   @ts-ignore
  s -= hours * 60;

  let dur = 'PT';
  if (days > 0) {
    dur += `${days}D`;
  }
  if (hours > 0) {
    dur += `${hours}H`;
  }
  dur += `${s}M`;

  return dur;
}
