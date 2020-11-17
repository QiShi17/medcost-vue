export const SYS_ROLE =  {
    USER:1,
    REVIEWER:2,
    DELIVER:3,
    REVIEWER_MASTER:4,
    ADMIN:5
}

export const ACCOUNT_STATUS={
    DRAFT:0,
    REVIEW:1,
    PASSED:2,
    UNPASSED:3,
    DELIVER:4,
    REJECT:5
}

export const USER_TYPE={
    STU:0,
    EMPLOYEE:1
}

export const APPLY_TYPE={
    //学生
    STU:{
        id:1,
        frate:80,
        lrate:90
    },
    //在职员工
    ONDUTY:{
        id:2,
        frate:80,
        lrate:90
    },
    //退休
    RETIRE:{
        id:3,
        frate:90,
        lrate:100
    },
    //离休
    OFF:{
        id:4,
        frate:100,
        lrate:100
    },
    //特殊群体
    OTHER:{
        id:5,
        frate:80,
        lrate:90
    }
}

