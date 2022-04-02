import { OptionsObject, SnackbarMessage } from 'notistack'

export type Snackbar = (message: SnackbarMessage, options?: OptionsObject) => void
