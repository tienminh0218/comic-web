export const colorRating = (index: number): string => {
    switch (index + 1) {
        case 1:
            return "bg-gradient-to-r from-[#ffd749] to-[#FF7A00]";
        case 2:
            return "bg-gradient-to-r from-[#8fffe4] to-[#1D5CFF]";
        case 3:
            return "bg-gradient-to-r from-[#a1ff89] to-[#00BE7A]";

        default:
            return "bg-[#F4F4F4] dark:bg-[#1A1A1A]";
    }
};
