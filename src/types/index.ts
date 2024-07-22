import { FunctionComponent } from "react";
import { IconBaseProps } from "react-icons";

export type TypeName = "mobile_number" | "otp" | "fcm_token";
export type IconType = string | FunctionComponent<IconBaseProps> | Element;
