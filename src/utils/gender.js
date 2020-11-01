//gender.js

let genderList=[{id:0,name:"男"},
    {id:1,name:"女"}]

export function  formatGender(gender) {
    return genderList[gender].name
}

export function  getAllGenders() {
    return genderList
}
