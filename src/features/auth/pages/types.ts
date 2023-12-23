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

// Login types
export type LoginInputs = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  photoURL?: string;
  provider: Provider;
};

// Reset password types
export type NewPasswordRequest = {
  password: string;
  oobCode: string | null;
};

export type GoogleAuthRequest = {
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  provider: Provider;
};
