export interface Avatar {
  id: number;
  link: string;
}

export interface AvatarResponse {
  avtars: Avatar[];
}

declare module "./node_modules/colorthief/dist/color-thief.mjs";
