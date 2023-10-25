async function asyncHandller(queryFunction: () => any, errorMessage: string) {
  try {
    const result = await queryFunction();
    return result;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
}
export { asyncHandller };
