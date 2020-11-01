//userType

let userTypeList=[{id:0,name:"员工"},
    {id:1,name:"学生"}]

export function  formatUserType(type) {
    return userTypeList[type].name
}

export function  getAllUserTypes() {
    return userTypeList
}

