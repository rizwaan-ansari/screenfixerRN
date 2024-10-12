import { Alert } from 'react-native';
import * as API from './ApiConstant';
import axios, { AxiosResponse } from 'axios'

type FileUpload = {
    file: File,
    onUploadSuccess?: (data: any) => void;
    onUploadError?: (data: any) => void;
    onUploadComplete?: (data: any) => void;
    url?: string;
}

export const JSON_TO_URL_PARAMS = (obj: any) => {
    var str = '';
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + (null === obj[key] ? '' : encodeURIComponent(obj[key]));
    }
    return str.length > 0 ? '?'+str : '';
}

const config = {
    headers: { Authorization: `Bearer ${API.TECH_1_AUTH_TOKEN}` }
};

// const axios = _axios.create();

export function fetchDevices(props: any) {
    return axios.get(API.API_V1_DEVICE+JSON_TO_URL_PARAMS(props), config);
}

export function fetchIssues(props: any) {
    return axios.get(API.API_V1_ISSUE+JSON_TO_URL_PARAMS(props), config);
}

export function fetchBrands(props: any) {
    return axios.get(API.API_V1_BRAND+JSON_TO_URL_PARAMS(props), config);
}

export function fetchDeviceTypes(props: any) {
    return axios.get(API.API_V1_DEVICE_TYPE+JSON_TO_URL_PARAMS(props), config);
}

export function fetchCities(props: any) {
    return axios.get(API.API_V1_CITY+JSON_TO_URL_PARAMS(props), config);
}

export function sendBookingRequest(FORM_DATA: any) {
    return axios.post(API.API_V1_REPAIR_REQUEST, FORM_DATA);
}

export function fetchValueForKey(keyName: string) {
    return axios.get(API.API_V1_KEY_VALUE+JSON_TO_URL_PARAMS({ key: keyName }));
}

export function fetchValueForKeys(keyName: string) {
    return axios.get(API.API_V1_KEY_VALUE+JSON_TO_URL_PARAMS({ keys: keyName }));
}

export function sendContactMessage(FORM_DATA: any) {
    return axios.post(API.API_V1_CONTACT_MESSAGE, FORM_DATA);
}

export function fetchBannerSlides(props: any) {
    return axios.get(API.API_V1_BANNER_SLIDE+JSON_TO_URL_PARAMS(props), config);
}

export function fetchDeviceSeries(props: any) {
    return axios.get(API.API_V1_DEVICE_SERIES+JSON_TO_URL_PARAMS(props), config);
}

export function fetchRepairRequests(props: any) {
    return axios.get(API.API_V1_REPAIR_REQUEST+JSON_TO_URL_PARAMS(props), config);
}

export function fetchAdditionalCharges(props: any) {
    return axios.get(API.API_V1_ADDITIONAL_CHARGE+JSON_TO_URL_PARAMS(props), config);
}

export function fetchSingleRepairRequest(uuid: string) {
    return axios.get(API.API_V1_REPAIR_REQUEST_UUID+'/'+uuid, config);
}

export function updateRepairRequests(FORM_DATA: any) {
    return axios.put(API.API_V1_REPAIR_REQUEST, FORM_DATA);
}

export function fetchDiscounts(props: any) {
    return axios.get(API.API_V1_DISCOUNT+JSON_TO_URL_PARAMS(props), config);
}

export function fetchAddress(props: any) {
    return axios.get(API.API_V1_ADDRESS+JSON_TO_URL_PARAMS(props), config);
}

export function updateAddress(FORM_DATA: any) {
    return axios.put(API.API_V1_ADDRESS, FORM_DATA);
}
export function createAddress(FORM_DATA: any) {
    return axios.post(API.API_V1_ADDRESS, FORM_DATA);
}
export function deleteAddress(uuid: string) {
    return axios.delete(API.API_V1_ADDRESS, {data: { uuid }});
}
export function fetchAccount(props: any) {
    return axios.get(API.API_V1_ACCOUNT+JSON_TO_URL_PARAMS(props), config);
}
export function updateAccount(FORM_DATA: any) {
    return axios.put(API.API_V1_ACCOUNT, FORM_DATA);
}
export function generateInvoiceUrl({ uuid } : { uuid: string }) {
    return API.API_V1_REPAIR_REQUEST_INVOICE+'?uuid='+uuid;
}

export function sendOtp({ contactNumber } : { contactNumber: string }) {
    return axios.post(API.API_V1_OTP, {
        type: 'account_verification',
        mobile_number: contactNumber
    });
}

export function verifyOtp({ contactNumber, verificationCode } : { contactNumber: string, verificationCode: string }) {
    return axios.post(API.API_V1_OTP_VERIFY, {
        type: 'account_verification',
        mobile_number: contactNumber,
        verification_code: verificationCode
    });
}

export function fileUpload({ file, onUploadSuccess, onUploadError, onUploadComplete, url = API.API_V1_FILE_UPLOAD } : FileUpload) {
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', file);  
    axios.post(url, FORM_DATA, config).then(function (response) {
        if ('file_uploaded' === response?.data?.response_code) {
            onUploadSuccess && onUploadSuccess(response?.data);
        }
        if ('file_uploaded' !== response?.data?.response_code) {
            onUploadError && onUploadError(response?.data);
        }
        onUploadComplete && onUploadComplete(response?.data);
    }).catch(function (error) {
        const errorObj = JSON.parse(JSON.stringify(error));
        if (errorObj.code == 'ECONNABORTED') {
            Alert.alert('Connection timed out, please try again.');
        }
    });
}
