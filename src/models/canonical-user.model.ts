export interface Credentials {
  username?: string;
  password: string;
  newPassword?: string;
}
export class UpdateCanonicalUserRequest {
  public id: string;
  public first: string;
  public last: string;
  public initials: string;
  public phone: string;

  public constructor(user: CanonicalUser) {
    this.id = user.id;
    this.first = user.first;
    this.last = user.last;
    this.initials = user.initials;
    this.phone = user.phone;
  }
}
export class CanonicalUserResponse {
  public id: string;
  public first: string;
  public middle: string;
  public last: string;
  public initials: string;
  public phone: string;

  public constructor(user: CanonicalUserResponse | Object) {

    if (user instanceof CanonicalUserResponse) {
      // clone an instance of the UserResponse class

      Object.assign(this, user);
    }
    else {
      // create an instance of the UserResponse class from an instance of the Object class

      const object: CanonicalUserResponse = <CanonicalUserResponse>user; // the response object has the UserResponse class structure

      this.id = object.id;
      this.first = object.first;
      this.middle = object.middle;
      this.last = object.last;
      this.initials = object.initials;
      this.phone = object.phone;
    }
  }
}
export class CanonicalUser {
  public id: string;
  public first: string;
  public middle: string;
  public last: string;
  public initials: string;
  public phone: string;

  public constructor(user?: CanonicalUser | CanonicalUserResponse) {
    if (user) {
      if (user instanceof CanonicalUser){
        Object.assign(this, user);
      }
      else if (user instanceof CanonicalUserResponse) {
        this.id = user.id;
        this.first = user.first;
        this.middle = user.middle;
        this.last = user.last;
        this.initials = user.initials;
        this.phone = user.phone;
      }
    }
    else {
      this.id = '';
      this.first = '';
      this.middle = '';
      this.last = '';
      this.initials = '';
      this.phone = '';
    }
  }
}
