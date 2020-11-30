import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}

export function policyExcel() {
  return request({
    url:'/aliyun/oss/policy_excel',
    method:'get',
  })
}
