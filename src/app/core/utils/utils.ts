export function convertToBool(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();

    return val === 'true' || val === '';
  }

  return !!val;
}

export function isNotNullOrUndefined(val: any): boolean {
  return val !== null && val !== undefined;
}
