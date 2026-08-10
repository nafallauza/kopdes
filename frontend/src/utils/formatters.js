/**
 * Utility helper functions for currency, dates, and numbers formatting
 */

export const formatRupiah = (number) => {
  if (number === null || number === undefined) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export const formatDateIndonesian = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const formatNumberWithDot = (number) => {
  if (number === null || number === undefined) return '0';
  return new Intl.NumberFormat('id-ID').format(number);
};
