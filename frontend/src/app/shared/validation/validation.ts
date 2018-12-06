export const PhoneMask = {
    name: 'US Phone Number',
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    pattern: /\(\d{3}\) \d{3}-\d{4}/,
    placeholder: '(555) 495-3947'
};