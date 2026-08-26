import { reactive } from 'vue'

type SnackbarType = 'success' | 'error' | 'warning' | 'info'

interface SnackbarState {
    show: boolean
    message: string
    type: SnackbarType
    timeout: number
}

const snackbar = reactive<SnackbarState>({
    show: false,
    message: '',
    type: 'info',
    timeout: 4000
})

export function useSnackbar() {
    function showSnackbar(message: string, type: SnackbarType = 'info', timeout = 4000) {
        snackbar.message = message
        snackbar.type = type
        snackbar.timeout = timeout
        snackbar.show = true
    }

    function success(message: string, timeout = 4000) {
        showSnackbar(message, 'success', timeout)
    }

    function error(message: string, timeout = 5000) {
        showSnackbar(message, 'error', timeout)
    }

    function warning(message: string, timeout = 4000) {
        showSnackbar(message, 'warning', timeout)
    }

    function info(message: string, timeout = 4000) {
        showSnackbar(message, 'info', timeout)
    }

    function close() {
        snackbar.show = false
    }

    return {
        snackbar,
        showSnackbar,
        success,
        error,
        warning,
        info,
        close
    }
}