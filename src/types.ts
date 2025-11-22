export interface Register {
  username: string;
  identifier: string;
  password: string;
}

export interface Login {
  identifier: string;
  password: string;
}

export interface VerifyOtp {
  identifier: string;
  password: string;
  otp: number;
}


export interface ResendOtp {
    identifier:string;
}