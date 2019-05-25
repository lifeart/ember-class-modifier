import makeFunctionalModifier from 'ember-functional-modifiers';

export default makeFunctionalModifier((element, classes, hash) => {
    const newClasses = [];
    classes.forEach((className)=>{
        if (Array.isArray(className)) {
            className.forEach((item)=>{
                newClasses.push(item);
            });
        } else {
            newClasses.push(className);
        }
    })
    Object.keys(hash).forEach((key)=>{
        if (hash[key]) {
            newClasses.push(key);
        }
    })
    element.classList = newClasses.sort().join(' ');
})