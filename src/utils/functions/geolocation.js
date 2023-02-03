
import Axios from 'axios';

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY || '';

const mapAddress = (result = []) => {
  if (result?.length) {
    const detail = result[0];
    const city = detail.address_components?.find(
      item => item.types?.includes('administrative_area_level_2')
    )?.long_name || '';
    const address = detail.formatted_address;
    const latitude = detail.geometry.location.lat;
    const longitude = detail.geometry.location.lng;
    const latlng = `${latitude},${longitude}`

    return {
      address,
      city,
      latlng,
    }
  }
  return {
    address: '',
    city: '',
    latlng: '',
  }
}

export const reverseGeocode = async (latlng = '') => {
  try {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        latlng,
        key: MAPS_API_KEY,
        language: 'id',
      }
    };
    const response = await Axios(config);
    const mapResult = mapAddress(response.data.results);
    return mapResult;
  } catch (error) {
    console.log(error)
  }
}

export const forwardGeocode = async (address = '') => {
  try {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address,
        key: MAPS_API_KEY,
        language: 'id',
      }
    };
    const response = await Axios(config);
    const mapResult = mapAddress(response.data.results);
    return mapResult;
  } catch (error) {
    console.log(error)
  }
}

// export const getDistance = async (origins, destinations) => {
//   try {
//     const response = geolibGetDistance(origins, destinations);
//     const mapResult = mapDistance(response.data.rows);
//     return mapResult;
//   } catch (error) {
//     console.log(error)
//   }
// }
