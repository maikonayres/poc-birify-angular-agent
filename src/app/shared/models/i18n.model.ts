export interface I18nModel {
  audit: AuditModel;
  auth: AuthModel;
  pokedex: PokedexModel;
  fields: FieldsModel;
  languages: LanguagesModel;
  global: GlobalTexts;
  actions: GlobalActions;
  status: GlobalStatus;
  errors: GlobalErrors;
  ui: UiTexts;
  nav: NavModel;
  notFound: NotFoundModel;
  filters: StatusFiltersModel;
  formValidators: FormValidators;
}

export interface FormValidators {
  required: string;
  minlength: string;
  maxlength: string;
  pattern: string;
}

export interface AuditModel {
  images: AuditImagesModel;
}

export interface AuditImagesModel {
  title: string;
  description: string;
}

export interface PokedexModel {
  hero: PokedexHeroModel;
  table: PokedexTableModel;
}

export interface PokedexHeroModel {
  title: string;
  subtitle: string;
}

export interface PokedexTableModel {
  empty: string;
  columns: PokedexTableColumnsModel;
}

export interface PokedexTableColumnsModel {
  dexNumber: string;
  name: string;
  typePrimary: string;
  typeSecondary: string;
  heightDm: string;
  weightHg: string;
}

export interface AuthModel {
  login: AuthLoginModel;
  errors: AuthErrorsModel;
}

export interface AuthErrorsModel {
  invalidCredentials: string;
}

export interface AuthLoginModel {
  title: string;
  subtitle: string;
  forgotPassword: string;
  rememberMe: string;
}

export interface FieldsModel {
  email: FieldModel;
  password: FieldModel;
}

export interface FieldModel {
  label: string;
  placeholder: string;
}

export interface LanguagesModel {
  'en-US': string;
  'pt-BR': string;
}

export interface GlobalTexts {
  welcome: string;
  logout: string;
  login: string;
  selectLanguage: string;
  version: string;
  register: string;
  image: string;
  file: string;
  progress: string;
  of: string;
}

export interface GlobalActions {
  takePhoto: string;
  chooseFromGallery: string;
  cancel: string;
  open: string;
  view: string;
  retry: string;
  viewDetails: string;
  add: string;
  send: string;
  remove: string;
}

export interface GlobalStatus {
  pending: string;
  inReview: string;
  approved: string;
  rejected: string;
}

export interface GlobalErrors {
  cameraDenied: string;
  connection: string;
  photosDenied: string;
  noFile: string;
  fileTooLarge: string;
  generic: string;
}

export interface UiTexts {
  selectSource: string;
  pdfPreviewTitle: string;
  addRequestedPhotosToContinue: string;
  pdfOpenExternal: string;
  openMediaOptions: string;
  openCamera: string;
  openGallery: string;
  appLockTitle: string;
  appLockHint: string;
  appLockDialogAria: string;
  biometricPromptReason: string;
}

export interface NavModel {
  home: NavItemModel;
  notifications: NavItemModel;
  documents: NavItemModel;
  menu: NavItemModel;
  sidebar: SidebarMenuLabels;
}

export interface SidebarMenuLabels {
  homeGroup: string;
  dashboard: string;
  teste: string;
  auditGroup: string;
  auditImages: string;
  pokedexGroup: string;
  pokedexList: string;
}

export type SidebarMenuLabelKey = keyof SidebarMenuLabels;

export interface NavItemModel {
  label: string;
  aria: string;
  breadcrumb: string;
  tab: string;
}

export interface NotFoundModel {
  code: string;
  title: string;
  subtitle: string;
  backHome: string;
  goBack: string;
}

export interface StatusFiltersModel {
  all: string;
}
