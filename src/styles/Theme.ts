// export type Mode = "light" | "dark";

import { theme } from "twin.macro";

export const lightTheme: object = {
  // background_color: "#F8F9FA",
  background_color: "#FBFBF9",
  container_bg_color: "#F6F6F5",
  theme_color: "#F5F4F2",
  theme_comparsion_color: "#202020",
  text_symbol_color: "#0066A0",
  text_primary_color: "#0F1118",
  text_secondary_color: "#F0F0F0",
  black_primary: "#262626",
  gray_dark: "#999999",
  gray_primary: "#B3B3B3",
  gray_light: "#E3E3E3",
  gray_extra_light: "#EFEFEF",
  gray_transparent: "#EFEFEF30",
  white_primary: "#FAFAFA",
  red_primary: "#EB2F06",
  red_secondary: "#FF6878",
  blue_priamry: "#3897F0",
};

export const darkTheme: object = {
  background_color: "#121212",
  container_bg_color: "#1E1E1E",
  theme_color: "#202020",
  theme_comparsion_color: "#F5F4F2",
  text_primary_color: "#FEFEFE",
  text_secondary_color: "#0F1118",
  black_primary: "#262626",
  gray_dark: "#999999",
  gray_primary: "#B3B3B3",
  gray_light: "#E3E3E360",
  gray_extra_light: "#EFEFEF30",
  gray_transparent: "#EFEFEF30",
  red_primary: "#EB2F06",
  red_secondary: "#FF6878",
  blue_priamry: "#3897F0",
};

const Theme = {
  lightTheme,
  darkTheme,
};

export default Theme;

