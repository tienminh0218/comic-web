interface PropsIconSidebar {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    className?: string;
}

export const Icon = ({ icon: Icon, className }: PropsIconSidebar) => {
    return (
        <>
            <Icon className={`${className ? className : "h-5 w-5"}`} />
        </>
    );
};
