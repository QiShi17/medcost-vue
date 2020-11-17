import request from '@/utils/request'

const hospital_url='/hospital'

export function getHospitalList() {
    return request({
        url: hospital_url+'/get_list_all',
        method: 'get'
    })
}

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}
