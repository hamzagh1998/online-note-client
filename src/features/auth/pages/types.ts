type Provider = "email" | "google";

// Register types
export type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userFbToken?: string;
  provider?: Provider;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  photoURL?: string;
  userFbToken: string;
  provider: Provider;
};

export type RegisterResponse = {
  error?: boolean;
  userData?: object;
  statusCode: number;
};

// Login types

export type LoginRequest = {
  email: string;
  password?: string;
  userFbToken: string;
  provider: Provider;
};

// Reset password types

export type NewPasswordRequest = {
  password: string;
  oobCode: string | null;
};
