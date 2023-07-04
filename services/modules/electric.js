const axios = require('axios');
const config = require("../../config/index.json");
const { getDateTomorrow } = require('../../helpers/index.js');

const getElectricCutSchedule = async (listLocation = config.ENV_LIST_LOCATION) => {
    try {
        const URL = config.ENV_URL_API;
        const dateTomorrow = getDateTomorrow();

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
  getElectricCutSchedule
}