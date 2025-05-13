/**
 * Utilities for formatting data
 */

/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format a date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Get the appropriate color class for a payment status
 */
export const getStatusColorClass = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('pagada')) {
    return 'bg-green-100 text-green-800';
  } else if (statusLower.includes('vencida') || statusLower.includes('mora')) {
    return 'bg-red-100 text-red-800';
  } else if (statusLower.includes('pendiente')) {
    return 'bg-blue-100 text-blue-800';
  } else if (statusLower.includes('proceso')) {
    return 'bg-amber-100 text-amber-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Get the icon name for a payment status
 */
export const getStatusIconName = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('pagada')) {
    return 'check-circle';
  } else if (statusLower.includes('vencida') || statusLower.includes('mora')) {
    return 'alert-circle';
  } else if (statusLower.includes('pendiente')) {
    return 'clock';
  } else if (statusLower.includes('proceso')) {
    return 'loader';
  } else {
    return 'circle';
  }
};