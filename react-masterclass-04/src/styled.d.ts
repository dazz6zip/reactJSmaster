import "styled-components";

// and extent them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    cardColor: string;
    boardColor: string;
  }
}
