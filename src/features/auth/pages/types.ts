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
  photoURL?: string;
  provider: Provider;
};

export type RegisterResponse = {
  data: { error: boolean; detail: object | null };
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
