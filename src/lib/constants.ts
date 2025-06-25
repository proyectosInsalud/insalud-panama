export const TURNOS = {
  MANANA: 'mañana',
  TARDE: 'tarde'
} as const;

export const TURNO_LABELS = {
  [TURNOS.MANANA]: 'Mañana (9am a 1pm)',
  [TURNOS.TARDE]: 'Tarde (3pm a 7pm)'
} as const;

export const TURNOS_SELECT = {
  [TURNOS.MANANA]: 'Mañana', 
  [TURNOS.TARDE]: 'Tarde'
} as const;

export const TRATAMIENTOS = {
  VPH: 'VPH',
  ONDAS_CHOQUE: 'Ondas de Choque',
  PROSTATITIS: 'Prostatitis'
} as const;

export const SEDES = {
  PANAMA: 'Panamá'
} as const;

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_PHONE: 'Número de teléfono panameño inválido (debe tener 8 dígitos)',
  MIN_NAMES: 'El nombre debe tener al menos 2 caracteres'
} as const; 