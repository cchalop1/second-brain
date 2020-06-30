export const create_list_calc = (option) => {
    let arr = []
    for (let i = 0; i < option.size; i += 1) {
        let str = ''
        str += Math.floor((Math.random() * 10) + 1)
        str += option.operator[Math.floor((Math.random() * option.operator.length))]
        str += Math.floor((Math.random() * 10) + 1)
        arr.push(str)
    }
    return arr
}