
export const calcClass = (type,ST, modifire) => {
    if(modifire===undefined) return ST[type]
    const elems = Object.keys(modifire).filter(el => modifire[el])
    return `${ST[type]} ${elems.map(el => ST[`${type}--${el}`]).join(' ')}`
  }