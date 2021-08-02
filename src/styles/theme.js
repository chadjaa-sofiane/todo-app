import { createGlobalStyle } from "styled-components";
import backgroudnLight from "../assets/images/bg-desktop-light.jpg";
import backgroudnDark from "../assets/images/bg-desktop-dark.jpg";
import JosefinSansUrl from "../fonts/JosefinSans-VariableFont_wght.ttf";
import mobileBackgroudnLight from "../assets/images/bg-mobile-light.jpg";
import mobileBackgroudnDark from "../assets/images/bg-mobile-dark.jpg";

export const Theme = {
  light: {
    backgroundImage: backgroudnLight,
    mobileBackgroundImage: mobileBackgroudnLight,
    backgroundColor: "hsl(0, 0%, 98%)",
    todoCompliteColor: "hsl(233, 11%, 84%)",
    paperBackground: "hsl(0, 0%, 98%)",
    fontColor: "hsl(235, 19%, 35%)",
    menuItemColor: "hsl(236, 9%, 61%)",
    menuItemHoverColor: "hsl(235, 19%, 35%)",
    menuItemActive: "hsl(235, 19%, 35%)",
    checkboxColor: "hsl(236, 9%, 61%)",
  },
  dark: {
    backgroundImage: backgroudnDark,
    mobileBackgroundImage: mobileBackgroudnDark,
    backgroundColor: "hsl(235, 21%, 11%)",
    todoCompliteColor: "hsl(233, 14%, 35%)",
    paperBackground: "hsl(235, 24%, 19%)",
    fontColor: "hsl(234, 39%, 85%)",
    menuItemColor: "hsl(234, 11%, 52%)",
    menuItemHoverColor: "hsl(236, 33%, 92%)",
    checkboxColor: "hsl(237, 14%, 26%)",
  },
};

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family:"Josefin Sans";
  src: local("Josefin Sans"),url(${JosefinSansUrl});
  font-weight: 400;
  font-style: normal;
}
* {
  padding: 0;
  margin: 0;
  box-sizing:border-box;
}
  body {
  background-image: url(${(p) => p.theme.backgroundImage});
  background-color:${(p) => p.theme.backgroundColor};
  background-size: contain;
  font-size: 18px;
  color:${(p) => p.theme.fontColor};
  transition: 0.1s all ease;
  font-family: "Josefin Sans",-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    background-repeat: no-repeat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media screen and (max-width:860px){
    background-image: url(${(p) => p.theme.mobileBackgroundImage});
    background-size: 100% auto;
  }
}

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;
