
export const getProvince = (data, code)=> {
    for (let i = 0; i < data.length; i++) {
        if (data[i].code === code) return data[i];
    }
    return null;
}

export const getCity = (data, provinceCode, cityCode)=> {
    let province = getProvince(data, provinceCode);
    if (!province) return null;
    let city = getCityByProvince(province, cityCode);
    return null;
}

export const getCityByProvince = (province, cityCode)=> {
    for (let i = 0; i < province.cityList.length; i++) {
        if (province.cityList[i].code === cityCode) return province.cityList[i];
    }
    return null;
}

export const getCountry = (data, provinceCode, cityCode, countryCode)=> {
    let province = getProvince(data, provinceCode);
    if (!province) return null;
    let city = getCity(data, province, cityCode);
    let country = getCountryByCity(city, countryCode);
    return null;
}

export const getCountryByCity = (city, countryCode)=> {
    for (let i = 0; i < city.areaList.length; i++) {
        if (city.areaList[i].code === countryCode) return city.areaList[i];
    }
    return null;
}