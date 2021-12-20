import { ThumbDownAltRounded, ThumbUpAltRounded, VisibilityRounded, FavoriteRounded } from "@mui/icons-material";
import { pink, green, lightBlue } from "@mui/material/colors";

import { InteractType } from "models";

export const Interacts = ({ like, unlike, views, bookMark }: InteractType) => {
    return (
        <div className="w-full max-w-lg lg:max-w-sm xl:max-w-lg 2xl:max-w-lg h-108 shadow-base border border-gray-200 px-6 pt-2 rounded-2xl">
            <div className="py-5 mb-4 font-semibold text-lg text-gray-600">Tương tác</div>
            <div className="grid grid-cols-2 h-4/6 gap-4">
                <div className="hover:shadow-base cursor-pointer transition-all duration-150 border border-gray-200 rounded-lg flex justify-center items-center shadow-sm">
                    <div className="text-center">
                        <ThumbUpAltRounded fontSize="large" sx={{ color: lightBlue[500] }} />
                        <p>{like}</p>
                    </div>
                </div>
                <div className="hover:shadow-base cursor-pointer transition-all duration-150 border border-gray-200 rounded-lg flex justify-center items-center shadow-sm">
                    <div className="text-center">
                        <ThumbDownAltRounded fontSize="large" color="inherit" />
                        <p>{unlike}</p>
                    </div>
                </div>
                <div className="hover:shadow-base cursor-pointer transition-all duration-150 border border-gray-200 rounded-lg flex justify-center items-center shadow-sm">
                    <div className="text-center">
                        <VisibilityRounded fontSize="large" sx={{ color: green[500] }} />
                        <p>{views}</p>
                    </div>
                </div>
                <div className="hover:shadow-base cursor-pointer transition-all duration-150 border border-gray-200 rounded-lg flex justify-center items-center shadow-sm">
                    <div className="text-center">
                        <FavoriteRounded fontSize="large" sx={{ color: pink[500] }} />
                        <p>{bookMark}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
