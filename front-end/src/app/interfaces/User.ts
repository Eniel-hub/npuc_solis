export interface User {
  username? : string;
  hash? : string;
  salt? : string;
  student_id? : Number;
  profile_picture? : Blob;
  password? : string;
  password2? : string;
}
