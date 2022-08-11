export const getCurrentDateTime = () => {
    let current = new Date()
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate()
    let cTime = current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()
    let dateTime = cDate + ' ' + cTime
    return dateTime
}

export const compareTwoString = (character, str) => {
    return str.indexOf(character) < 0 ? false : true
}
