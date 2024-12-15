
import PropTypes from "prop-types"


const Categories = ({ img, title }) => {


    return (
        <div className=" relative sm:max-w-fit max-w-[170px] max-h-[120px] sm:max-h-fit overflow-hidden cursor-pointer rounded-lg border-teal-500">
            <img className=" sm:h-[300px] h-[200px] sm:w-[300px] w-[200px] object-cover hover:scale-105 transition-all duration-150 ease-in-out " src={img} alt={title} />
            <span className={` absolute font-poppins sm:pt-4 sm:pb-4 top-0 right-0  text-white bg-teal-700 bg-opacity-50 backdrop-blur-md sm:text-xl w-full text-center`} >{title}</span>
        </div>
    )
}


Categories.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string
}

export default Categories