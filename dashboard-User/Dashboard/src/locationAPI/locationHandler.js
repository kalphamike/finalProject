import locations from './response.json';

export const fetchProvinces = () => {
    const provinces = [];
    locations.data.forEach(province => {
        provinces.push({name: province.name, id: province.id});    
    })

    return provinces;
}

export const fetchDistricts = (nameOfProvince) => {
    const districts = [];
    locations.data.forEach(province => {
        if (province.name === nameOfProvince) {
            districts.push(province.districts)
        }
    })

    return districts;
}

export const fetchSectors = (nameOfProvince, nameOfDistrict) => {
    const sectors = [];
    locations.data.forEach(province => {
        if (province.name === nameOfProvince) {
            province.districts.forEach(district => {
                if (district.name === nameOfDistrict) {
                    sectors.push(district.sectors)
                }
            })
        }
    })

    return sectors;
}
