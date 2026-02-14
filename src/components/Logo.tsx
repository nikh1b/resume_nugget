interface LogoProps {
    text1?: string;
    text2?: string;
    color1?: string;
    color2?: string;
}

export const Logo = ({ text1 = "RESUME", text2 = "NUGGET", color1 = "text-white", color2 = "text-yellow-400" }: LogoProps) => {
    return (
        <div className="flex items-center gap-2">
            {/* Nugget Icon */}
            <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Nugget Shape (Rough Heptagon) - Gold Outline, Black Fill */}
                    <path
                        d="M12 4L28 4L36 14L32 34L16 38L4 26L6 10L12 4Z"
                        fill="#000000"
                        stroke="#eab308"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Internal Crack/Detail - Gold */}
                    <path d="M12 4L16 12" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />

                    {/* Green Circuit Traces */}
                    {/* Node 1 (Left) */}
                    <circle cx="12" cy="24" r="2.5" fill="#22c55e" />
                    <path d="M12 24L16 28" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

                    {/* Node 2 (Top Left) */}
                    <circle cx="16" cy="18" r="2.5" fill="#22c55e" />
                    <path d="M16 18L20 22" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

                    {/* Node 3 (Center) */}
                    <circle cx="24" cy="20" r="2.5" fill="#22c55e" />
                    <path d="M24 20L24 30" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

                    {/* Node 4 (Bottom Right) */}
                    <circle cx="28" cy="26" r="2.5" fill="#22c55e" />
                    <path d="M28 26L24 30" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

                </svg>
            </div>

            {/* Text */}
            <span className={`${color1} font-black text-xl tracking-tighter uppercase`}>{text1}</span>
            <span className={`${color2} font-black text-xl tracking-tighter uppercase`}>{text2}</span>
        </div>
    );
};
