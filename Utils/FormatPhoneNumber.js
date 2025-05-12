// utils/formatPhoneNumber.js

const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // If it starts with '03', assume it's a Pakistani number and convert to +92
  if (cleaned.startsWith('03')) {
    return '+92' + cleaned.slice(1);
  }

  // If it starts with '92', just add '+'
  if (cleaned.startsWith('92')) {
    return '+' + cleaned;
  }

  // Already starts with + or other country code
  if (phone.startsWith('+')) {
    return phone;
  }

  // Fallback - return cleaned (you may want to handle other countries)
  return cleaned;
};

module.exports = formatPhoneNumber;
