export interface StudentApplication {
  username?              : string,
  lastname?              : string,
  firstname?             : string,
  middlename?            : string,
  fullname?              : string,
  gender?                : string,
  bday?                  : Date,
  home_address?          : string,
  lrn?                   : string,
  religion_id?           : number,
  nationality_id?        : number,
  nationality?           : string,
  school_id?             : number,
  student_cat_id?        : string,
  father?                : {
                              lastname?      : string,
                              firstname?     : string,
                              middlename?    : string,
                              email?         : string,
                              home_address?  : string,
                              mobile?        : string
                            },
  mother?                : {
                              lastname?      : string,
                              firstname?     : string,
                              middlename?    : string,
                              email?         : string,
                              home_address?  : string,
                              mobile?        : string
                            },
  Guardian?              : string,
  guardian?              : {
                              lastname?      : string,
                              firstname?     : string,
                              middlename?    : string,
                              email?         : string,
                              home_address?  : string,
                              mobile?        : string
                            },
}
