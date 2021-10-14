export enum SYMPTOMS {
  BLUNT_TRAUMA = 'bluntTrauma',
  CHOKING = 'choking',
  DROWNING = 'drowning',
  HEMMORAGING = 'hemmoraging',
  OTHER = 'other',
  CARDIAC_ARREST = 'cardiacArrest',
}

export enum FCM_CHANNEL_ID {
  EMERGENCY = 'emergency',
  HERO = 'hero',
  BYSTANDER = 'bystander',
  DEFAULT = 'default_channel_id',
}

export const iconTypes = {
  other: { name: 'help', iconFamily: 'Icon' },
  choking: { name: 'open-mouth', iconFamily: 'FontistoIcon' },
  drowning: { name: 'swim', iconFamily: 'Icon' },
  hemmoraging: { name: 'blood-drop', iconFamily: 'FontistoIcon' },
  cardiacArrest: { name: 'heart-pulse', iconFamily: 'Icon' },
  bluntTrauma: { name: 'car-crash', iconFamily: 'FontAwesome5Icon' },
};
