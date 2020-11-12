import request from '@/utils/request'

export function apply(data) {
    return request({
        url: '/expense_account/create',
        method: 'post',
        data: data
    })
}
