export interface ThemeStyleProps {
	red: string;
	blue: string;
	blue1: string;
	black: string;
	gray: string;
	text1: string;
	text2: string;
	text3: string;
	text4: string;
	divider1: string;
	divider2: string;
	background: string;
	link: string;
	themeColor: string;
}

export enum Font {
	Bold = "SFProText-Bold",
	Heavy = "SFProText-Heavy",
	Light = "SFProText-Light",
	Medium = "SFProText-Medium",
	Regular = "SFProText-Regular",
	Semibold = "SFProText-Semibold",
}

export const themeStyle: ThemeStyleProps = {
	red: "#E62222",
	blue: "#3D82F7",
	blue1: "#3E82F7",
	black: "#1A1A1A",
	gray: "#C7C7CC",
	text1: "#333",
	text2: "#666",
	text3: "#999",
	text4: "#CCC",
	divider1: "#E0E0E0",
	divider2: "#ECECEC",
	background: "#F5F5F5",
	link: "#2785FA",
	themeColor: "#FF5A00",
};

export const px2rem = (pxValue?: number, defaultValue: string = "initial") => {
	if (typeof pxValue !== "undefined") {
		return `${Number((pxValue / 16).toFixed(4))}rem`;
	} else {
		return defaultValue;
	}
};

export const px2vw = (pxValue: number) => {
	return `${Number(((pxValue * 100) / 375).toFixed(4))}vw`;
};
