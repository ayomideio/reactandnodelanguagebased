const getOperation = (mode) => {
  switch (mode) {
    case 'create':
      return 'Created';
    case 'edit':
      return 'Modified';
    case 'view':
      return 'Viewed';
    case 'delete':
      return 'Deleted';
    default:
      return 'Created';
  }
}
export {
  getOperation
}