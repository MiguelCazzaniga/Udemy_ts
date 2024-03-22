//Validation
export interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export function validate(validatableInput: Validatable) {
  let isValid = true
  // Verifica campo required
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().length !== 0
  }
  //Verifica campo minLength
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength
  }
  //Verifica campo maxLength
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  //Verifica campo min
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  //Verifica campo max
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  return isValid
}
