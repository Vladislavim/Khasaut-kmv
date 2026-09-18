export const bookingRules = {
  prepaymentPerPerson: 1500,
  cancellationRefundHours: 48,
  organizerCancellationRefund: true,
} as const

export const tripRules = {
  alcoholAllowed: false,
  petsAllowed: false,
  healthIssuesMustBeReported: true,
} as const

// These source notes are intentionally not applied by the calculator until the
// owner confirms how discounts and the *4,5 / 18-person conditions combine.
export const unconfirmedPriceRules = {
  childDiscount: 'requiresClarification',
  groupDiscount: 'requiresClarification',
  largeGroupOrganizer: 'requiresClarification',
  sourceNote45: 'requiresClarification',
} as const
