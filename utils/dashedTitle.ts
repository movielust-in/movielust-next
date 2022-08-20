export default function dashedTitle(str: string) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();
}

export function detailLink(type: string, id: number, title: string): string {
  return `/${type}/${id}/${dashedTitle(title)}`;
}

export function detailLinkWithEpisode(
  type: string,
  id: number,
  title: string,
  season: number,
  episode: number
): string {
  return `/${type}/${id}/${dashedTitle(title)}?s=${season}&e=${episode}`;
}
