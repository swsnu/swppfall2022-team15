export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  let number = phoneNumber.replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
  return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
};
