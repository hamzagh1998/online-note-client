// Utility function to check if any required fields in the inputs are empty and return an error if so
type FormValues = Record<string, { value: string; error: string | null }>;

export function checkRequiredFields<T extends FormValues>(
  formInputs: T,
  requiredFields: string[]
): boolean {
  let error = false;

  for (const key in formInputs) {
    const inputObject = formInputs[key];

    if (requiredFields.includes(key)) {
      if (!inputObject.value) {
        error = true;
      }
    }
  }

  return error;
}
