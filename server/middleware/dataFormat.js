import dayjs from "dayjs";

export const dataFormat = (date, formet) => {

    return dayjs(date).format(formet)
}