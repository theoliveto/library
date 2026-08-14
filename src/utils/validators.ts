export type ValidationRule = (value: unknown) => true | string

// Verifica se o campo é obrigatório.
export function required (message = 'Este campo é obrigatório'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || String(value).trim() === '') {
            return message
        }

        return true
    }
}

// Verifica o tamanho máximo do campo.
export function maxLength (length: number, message?: string): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const valueLength = String(value).length

        return (valueLength <= length || message || `Máximo de ${length} caracteres`)
    }
}

// Verifica o tamanho mínimo do campo.
export function minLength (length: number, message?: string): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const valueLength = String(value).length

        return (valueLength >= length || message || `Mínimo de ${length} caracteres`)
    }
}

// Permite somente números.
export function numeric (message = 'Digite apenas números'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        return /^\d+$/.test(String(value)) || message
    }
}

// Permite somente letras e espaços. Aceita caracteres acentuados.
export function textOnly (message = 'Digite apenas letras'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        return /^[A-Za-zÀ-ÿ\s]+$/.test(String(value)) || message
    }
}

// Valida e-mail.
export function email (message = 'Digite um e-mail válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

        return emailRegex.test(String(value)) || message
    }
}

// Valida CPF. Aceita CPF com ou sem máscara.
export function cpf (message = 'Digite um CPF válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const cpfValue = String(value).replace(/\D/g, '')

        if (cpfValue.length !== 11) {
            return message
        }

        if (/^(\d)\1{10}$/.test(cpfValue)) {
            return message
        }

        let sum = 0

        for (let i = 0; i < 9; i++) {
            sum += Number(cpfValue[i]) * (10 - i)
        }

        let digit = (sum * 10) % 11

        if (digit === 10) {
            digit = 0
        }

        if (digit !== Number(cpfValue[9])) {
            return message
        }

        sum = 0

        for (let i = 0; i < 10; i++) {
            sum += Number(cpfValue[i]) * (11 - i)
        }

        digit = (sum * 10) % 11

        if (digit === 10) {
            digit = 0
        }

        if (digit !== Number(cpfValue[10])) {
            return message
        }

        return true
    }
}

// Valida número inteiro.
export function integer (message = 'Digite um número inteiro válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        return /^-?\d+$/.test(String(value)) || message
    }
}

// Valida número decimal.
export function decimal (message = 'Digite um número válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        return /^-?\d+(?:[.,]\d+)?$/.test(String(value)) || message
    }
}

// Valida telefone brasileiro.
export function phone (message = 'Digite um telefone válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const phoneValue = String(value).replace(/\D/g, '')

        return (phoneValue.length === 10 || phoneValue.length === 11 || message)
    }
}

// Valida CEP brasileiro.
export function cep (message = 'Digite um CEP válido'): ValidationRule {
    return (value: unknown) => {
        if (value === null || value === undefined || value === '') {
            return true
        }

        const cepValue = String(value).replace(/\D/g, '')

        return cepValue.length === 8 || message
    }
}
