
const Testimonial = () => {
    return (
        <aside className="w-[470px] border-r border-cyan-900/30 relative px-10 py-12 flex flex-col">

            {/* Logo */}

            <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full border border-cyan-500 flex items-center justify-center">
                    🌊
                </div>

                <h2 className="text-white font-black tracking-[4px]">
                    SWIMCOACH AI
                </h2>

            </div>

            <div className="flex-1 flex flex-col justify-center">

                <h1 className="text-5xl leading-tight font-black text-white">
                    Великий пловец
                    <br />
                    знает свои
                    <br />
                    ошибки.
                </h1>

            </div>


        </aside>
    );
};
export default Testimonial