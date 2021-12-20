import moment from "moment";

export const fromNowDate = (date: string) => {
    moment.updateLocale("en", {
        relativeTime: {
            future: "in %s",
            past: "%s Trước",
            s: "Vài Giây",
            ss: "%d Giây",
            m: "Một Phút",
            mm: "%d Phút",
            h: "Một Giờ",
            hh: "%d Giờ",
            d: "Một Ngày",
            dd: "%d Ngày",
            w: "Một Tuần",
            ww: "%d Tuần",
            M: "Một Tháng",
            MM: "%d Tháng",
            y: "Một Năm",
            yy: "%d Năm",
        },
    });

    return moment(date).fromNow();
};
