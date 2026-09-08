// Remove todos os caracteres que não são números.
export function onlyNumbers (value: string | number): string {
    return String(value ?? '').replace(/\D/g, '')
}

// CPF
export function cpfMask (value: string | number): string {
    return String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

// Telefone
export function phoneMask (value: string | number): string {
    return String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
}

// Telefone fixo ou celular.
export function phoneFlexibleMask (value: string | number): string {
    const numbers = String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 11)

    if (numbers.length <= 10) {
        return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }

    return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
}

// CEP
export function cepMask (value: string | number): string {
    return String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 8)
        .replace(/^(\d{5})(\d)/, '$1-$2')
}

// Data
export function dateMask (value: string | number): string {
    return String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 8)
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
}

// Somente números com quantidade máxima de caracteres.
export function numberMask (value: string | number, maxLength?: number): string {
    const numbers = String(value ?? '').replace(/\D/g, '')

    return maxLength
        ? numbers.slice(0, maxLength)
        : numbers
}

// CNPJ
export function cnpjMask (value: string | number): string {
    return String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 14)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
}