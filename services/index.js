const axios = require('axios');
const config = require("../config/index.json");
const { getDateTomorrow } = require('../helpers/index.js');

const getWeather = async () => {
    try {
        const BASE_URL = config.OPENWEATHERMAP_URL_API;
        const API_KEY = config.OPENWEATHERMAP_API_KEY;
        const LOCATION = config.OPENWEATHERMAP_LOCATION;

        const URL = `${BASE_URL}weather?q=${LOCATION}&units=metric&APPID=${API_KEY}`;

        if (BASE_URL && API_KEY && LOCATION) {
            const { data } = await axios.get(URL);

            if (data.cod === 200) {
                console.log("[SUCCESS] CALL API GET WEATHER");
                return data;
            } else {
                console.log("[ERROR] CALL API GET WEATHER");
                return null;
            }
        } else {
            console.log("[ERROR] CALL API GET WEATHER");
            console.log(`Missing environment variables: BASE_URL: ${BASE_URL}, API_KEY: ${API_KEY}, LOCATION: ${LOCATION}`);
        }
    } catch (error) {
        console.log("[ERROR] CALL API GET WEATHER");
        console.error(error);

        return null;
    }
};

const getElectricCutSchedule = async () => {
    try {
        const URL = "https://evnhanoi.vn/api/TraCuu/LichCatDien";
        const dateTomorrow = getDateTomorrow();
        const listLocation = [
            {
                "code": "PD0100",
                "name": "Quận Hoàn Kiếm"
            },
            {
                "code": "PD0200",
                "name": "Quận Hai Bà Trưng"
            },
            {
                "code": "PD0300",
                "name": "Quận Ba Đình"
            },
            {
                "code": "PD0400",
                "name": "Quận Đống Đa"
            },
            {
                "code": "PD0500",
                "name": "Quận Nam Từ Liêm"
            },
            {
                "code": "PD0600",
                "name": "Huyện Thanh Trì"
            },
            {
                "code": "PD0700",
                "name": "Huyện Gia Lâm"
            },
            {
                "code": "PD0800",
                "name": "Huyện Đông Anh"
            },
            {
                "code": "PD0900",
                "name": "Huyện Sóc Sơn"
            },
            {
                "code": "PD1000",
                "name": "Quận Tây Hồ"
            },
            {
                "code": "PD1100",
                "name": "Quận Thanh Xuân"
            },
            {
                "code": "PD1200",
                "name": "Quận Cầu Giấy"
            },
            {
                "code": "PD1300",
                "name": "Quận Hoàng Mai"
            },
            {
                "code": "PD1400",
                "name": "Quận Long Biên"
            },
            {
                "code": "PD1500",
                "name": "Huyện Mê Linh"
            },
            {
                "code": "PD1600",
                "name": "Quận Hà Đông"
            },
            {
                "code": "PD1700",
                "name": "Thị Xã Sơn Tây"
            },
            {
                "code": "PD1800",
                "name": "Huyện Chương Mỹ"
            },
            {
                "code": "PD1900",
                "name": "Huyện Thạch Thất"
            },
            {
                "code": "PD2000",
                "name": "Huyện Thường Tín"
            },
            {
                "code": "PD2100",
                "name": "Huyện Ba Vì"
            },
            {
                "code": "PD2200",
                "name": "Huyện Đan Phượng"
            },
            {
                "code": "PD2300",
                "name": "Huyện Hoài Đức"
            },
            {
                "code": "PD2400",
                "name": "Huyện Mỹ Đức"
            },
            {
                "code": "PD2500",
                "name": "Huyện Phú Xuyên"
            },
            {
                "code": "PD2600",
                "name": "Huyện Phúc Thọ"
            },
            {
                "code": "PD2700",
                "name": "Huyện Quốc Oai"
            },
            {
                "code": "PD2800",
                "name": "Huyện Thanh Oai"
            },
            {
                "code": "PD2900",
                "name": "Huyện Ứng Hòa"
            },
            {
                "code": "PD3000",
                "name": "Quận Bắc Từ Liêm"
            }
        ];

        const len = listLocation.length;
        let idx = 0;

        const result = [];

        while (idx < len) {
            const { code } = listLocation[idx];

            const BODY = {
                ngayBatDau: dateTomorrow,
                ngayKetThuc: dateTomorrow,
                maDViQly: code
            }

            console.log(BODY);

            const { data } = await axios.post(URL, BODY);

            if (data) {
                const lichCatdienToList = data.data.lichCatdienToList || [];

                result.push({
                    name: listLocation[idx].name,
                    data: lichCatdienToList
                });
            }

            idx++;
        }

        return result;
    } catch (error) {
        console.log("[ERROR] CALL API GET ELECTRIC");
        console.error(error);

        return null;
    }
};

module.exports = {
    getWeather,
    getElectricCutSchedule
}