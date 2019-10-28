export const getThousandString = (val, fixNumber = 2, prefix = '') => {
  if (val >= 10000) {
    return `${prefix}${parseFloat(val / 1000).toFixed(fixNumber)}K`;
  }

  const numberFormated = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
  return `${prefix}${numberFormated}`;
};

export const getThousandFormat = (val, prefix = '') => {
  const numberFormated = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
  return `${prefix}${numberFormated}`;
};
