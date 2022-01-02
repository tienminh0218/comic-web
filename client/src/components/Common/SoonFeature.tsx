interface Props {
    message?: string;
}

export const SoonFeature = ({ message }: Props) => {
    return (
        <div className="w-full py-24 flex-center gap-2 text-3xl font-bold sub-color">
            <p className="">{message ? message : "Coming Soon"}</p>
            <img className="w-40" src="/gif/nuoctoidau.gif" alt="" />
        </div>
    );
};
