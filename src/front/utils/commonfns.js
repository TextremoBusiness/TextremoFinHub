function isObjEmpty(obj){
    // obj has to not undefine, not null
    // obj has to be empty inside
    // obj has to an instance of `Object`
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}

export {isObjEmpty};