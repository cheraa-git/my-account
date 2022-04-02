export function formatPhone(phone: string) {
  {
    let r = phone.split('').filter((el) => !isNaN(Number(el)))
    let plus = phone[0] === '+' ? '+' : ''
    if (r.length === 11) {
      return `${plus + r[0]} (${r[1] + r[2] + r[3]}) ${r[4] + r[5] + r[6]}-${r[7] + r[8]}-${r[9] + r[10]}`
    }

    console.log('formatPhoneError')
    return phone
  }
}
