function validatePropertyInput(data = {}) {
  const { title, address, description, price } = data;

  if (!title || !address || !description || price === undefined || price === null) {
    return { valid: false, message: 'Missing property fields' };
  }

  if (Number(price) <= 0) {
    return { valid: false, message: 'Price must be greater than zero' };
  }

  return { valid: true };
}

function validateReservationInput(data = {}) {
  const { local_id, start_date, end_date } = data;

  if (!local_id || !start_date || !end_date) {
    return { valid: false, message: 'Missing reservation fields' };
  }

  if (new Date(start_date) > new Date(end_date)) {
    return { valid: false, message: 'Start date must be before end date' };
  }

  return { valid: true };
}

function validateEvaluationInput(data = {}) {
  const { local_id, rating } = data;

  if (!local_id || rating === undefined || rating === null) {
    return { valid: false, message: 'Missing evaluation fields' };
  }

  const numericRating = Number(rating);
  if (numericRating < 1 || numericRating > 5) {
    return { valid: false, message: 'Rating must be between 1 and 5' };
  }

  return { valid: true };
}

module.exports = {
  validatePropertyInput,
  validateReservationInput,
  validateEvaluationInput,
};
