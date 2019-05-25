import makeFunctionalModifier from 'ember-functional-modifiers';

export default makeFunctionalModifier((element, classes, hash) => {
    const newClasses = [];
    const validTypes = ['string', 'number'];
    classes.forEach((className)=>{
        if (Array.isArray(className)) {
            className.forEach((item)=>{
                newClasses.push(item);
            });
        } else {
            newClasses.push(className);
        }
    });
    Object.keys(hash).forEach((key)=>{
        if (hash[key]) {
            newClasses.push(key);
        }
    });
    const classList = newClasses
        .filter((el, index) => newClasses.indexOf(el) === index)
        .filter(el => {
            const type = typeof el;
            if (!validTypes.includes(type)) {
                return false;
            }
            if (type === 'number') {
              return !isNaN(el) && isFinite(el);
            } else {
              return el.length > 0;
            }
        })
        .map(el => String(el))
        .sort()
        .join(' ');
    element.classList = classList;
})