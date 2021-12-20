import { Link } from "react-router-dom";
import { Routes } from "models";
import { routes } from "routes";

interface Props {
    active: boolean;
    pathName: string;
    handleActive: (value: boolean) => void;
}

const Sidebar = ({ active, handleActive, pathName }: Props) => {
    return (
        <div className="xl:col-start-1 xl:row-start-1 xl:row-span-2 ">
            <div
                onClick={() => handleActive(false)}
                className={`${
                    active && "fixed"
                } z-50 transition-all xl:hidden duration-100 inset-0 bg-gradient-to-l from-[#1f252c] opacity-90`}
            ></div>
            <div
                className={`${
                    !active && "-translate-x-full opacity-50"
                } w-2/3 xs:w-72 z-50 xl:-translate-x-0 xl:h-screen xl:opacity-100 fixed pt-8 inset-y-0 left-0 border-r border-gray-200 bg-white transform transition-all duration-700`}
            >
                <div className="flex flex-wrap gap-4 justify-center pl-4 py-4 mb-8 items-center">
                    <img className="w-10" src="https://minimal-kit-react.vercel.app/static/logo.svg" alt="" />
                    <img className="" src="/logo.svg" alt="" />
                </div>
                <div className="cursor-default group ml-6 mr-5 mb-14 py-3 px-5 rounded-xl transition-all duration-200 bg-[#f4f6f8] gap-2 flex flex-wrap justify-center items-center">
                    <img
                        className="w-10 h-10 group-hover:opacity-100 object-cover rounded-full opacity-80 "
                        src="https://minimal-kit-react.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                        alt=""
                    />
                    <p className="text-base font-medium text-gray-500 transition-all duration-100">
                        TiếnDepTraiBodoi
                    </p>
                </div>
                <div className="flex flex-col">
                    {routes.map((item, index) => (
                        <div key={`${index}-${item.name}`}>
                            {item.onSidebar && (
                                <Link to={item.path}>
                                    <div
                                        className={`${
                                            pathName === item.path &&
                                            "text-green-500 border-r-4 border-green-500 bg-[#ebf8f2] font-semibold"
                                        } font-medium text-sm pl-8 text-gray-500 flex py-4 transition-all duration-150 items-center hover:bg-[#f6f7f8] cursor-pointer`}
                                    >
                                        <IconSidebar icon={item.icon} />
                                        {item.name}
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface PropsIconSidebar {
    icon: Routes["icon"];
}

const IconSidebar = ({ icon: Icon }: PropsIconSidebar) => {
    return (
        <>
            <Icon className="h-6 w-6 mr-4" />
        </>
    );
};

export default Sidebar;
