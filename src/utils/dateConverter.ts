export function paraIso(data: Date): string {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')
    return `${ano}-${mes}-${dia}`
}

export function paraDate(dataIso: string): Date {
    return new Date(dataIso)
}

export function paraDataBR(isoString: string | null): string {
    if (!isoString) return ''

    const data = new Date(isoString)

    if (isNaN(data.getTime())) return ''

    const dia = String(data.getUTCDate()).padStart(2, '0')
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
    const ano = data.getUTCFullYear()

    return `${dia}/${mes}/${ano}`
}