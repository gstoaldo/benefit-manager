export const EMPLOYEES = [
  {
    id: '1',
    name: 'Maria Silva',
    cpf: '09222123567',
    email: 'mariasilva@empr.br',
    address: {
      cep: '01310400',
      street: 'Av Paulista',
      city: 'São Paulo',
      district: 'São Paulo',
      complement: 'apto 88',
    },
    weight: 62,
    height: 1.6,
    meditationHoursInWeek: 5.3,
    benefitIds: ['1', '3'],
  },
];

export const CLIENTS = [
  {
    id: '1',
    name: 'Acme Co',
    benefitIds: ['1', '3'],
    employeeIds: ['1'],
  },
  {
    id: '2',
    name: 'Tio Patinhas Bank',
    benefitIds: ['2', '3', '4'],
    employeeIds: [],
  },
];

export const BENEFITS = [
  {
    id: '1',
    type: 'health',
    name: 'Norte Europa',
    requiredFields: ['name', 'cpf', 'admissionDate', 'email'],
  },
  {
    id: '2',
    type: 'health',
    name: 'Pompulha Intermédica',
    requiredFields: ['name', 'cpf', 'admissionDate', 'address'],
  },
  {
    id: '3',
    type: 'dental',
    name: 'Dental Sorriso',
    requiredFields: ['name', 'cpf', 'weight', 'height'],
  },
  {
    id: '4',
    type: 'mental',
    name: 'Mente Sã, Corpo São',
    requiredFields: ['cpf', 'meditationHoursInWeek'],
  },
];

const FIELDS = [
  'cpf',
  'admissionDate',
  'email',
  'address',
  'weight',
  'height',
  'meditationHoursInWeek',
];
