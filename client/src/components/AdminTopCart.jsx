import PropTypes from "prop-types"

const AdminTopCart = ({ title, data, svg, color, fill }) => {
    return (
        <div className={` ${color} py-6 px-[60px] ${fill} rounded h-fit cursor-pointer hover:shadow-xl hover:shadow-${color} hover:scale-105 transition-all ease-in`}>
            <div className=" flex space-x-4">
                {svg}
                <span className=" font-bold text-slate-600">{title}</span>
            </div>
            <div>
                <span className=" font-bold text-4xl text-center text-slate-700">{data}</span>
            </div>
        </div>
    )
}

AdminTopCart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.number,
    svg: PropTypes.object,
    color: PropTypes.string,
    fill: PropTypes.string
}

export default AdminTopCart