export function returnDate() {
    let date = new Date().toISOString().slice(0, 10)
    return date
}