import {FaComments} from "react-icons/fa";

const FeaturesCard = ({feature}) => {
    const Icon = feature.icon;
    const iconBgStyle = `w-16 h-16  rounded-lg flex items-center justify-center mb-6 ${feature.color.bg}`
    return (
        <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-slate-100">
            <div className= {iconBgStyle}>
                <Icon className={feature.color.text}/>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">
                {feature.content}
            </p>
        </div>
    )
}

export default FeaturesCard;