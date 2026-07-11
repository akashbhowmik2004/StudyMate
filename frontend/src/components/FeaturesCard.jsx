const FeaturesCard = ({feature}) => {
    const Icon = feature.icon;
    const iconBgStyle = `mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 ${feature.color.bg}`
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className= {iconBgStyle}>
                <Icon className={feature.color.text+" text-2xl drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]"}/>
            </div>
            <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                {feature.title}
            </h3>
            <p className="leading-7 text-slate-300">
                {feature.content}
            </p>
        </div>
    )
}

export default FeaturesCard;