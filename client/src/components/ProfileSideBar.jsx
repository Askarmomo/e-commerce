import PropTypes from "prop-types"

const ProfileSideBar = ({ name, icon, setSelect, select }) => {


    return (
        < div onClick={() => setSelect(name)} className={`${name === select && 'bg-slate-200'} transition-all w-fit sm:w-[250px] duration-150 ease-in-out flex rounded-lg justify-between sm:rounded p-2 cursor-pointer ${name === "LOGOUT" ? "hover:bg-rose-200 p-3" : "hover:bg-slate-200"}`}>
            <div className=" flex space-x-3 items-center">
                {icon}
                <span className={` hidden sm:block ${name === "LOGOUT" && "text-rose-500 hover:text-rose-600"} `}>{name}</span>
            </div>
            {
                name !== "LOGOUT" && <svg className=" hidden sm:block" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#888888" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"></path></svg>
            }
        </div>
    )
}

ProfileSideBar.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    setSelect: PropTypes.func,
    select: PropTypes.string
}

export default ProfileSideBar