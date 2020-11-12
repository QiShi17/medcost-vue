import request from '@/utils/request'

const hospital_url='/hospital'

export function getHospitalList() {
    return request({
        url: hospital_url+'/create',
        method: 'get',
    })
}
