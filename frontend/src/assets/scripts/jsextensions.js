
Array.any = function (array) {
    return array && array.length > 0;
}

Array.prototype.firstOrDefault = function (callback) {
    const result = this.where(callback);
    const resultItem = {};
    if (Array.any(result)) {
        resultItem = result[0];
    }
    return resultItem;
}
Array.prototype.where = function (callback) {
    const result = [];
    for (const index = 0; index < this.length; index++) {
        if (!callback(this[index])) { continue; }
        result.push(this[index]);
    }
    return result;
}
Array.prototype.any = function (callback) {
    const result = [];
    for (const index = 0; index < this.length; index++) {
        if (!callback(this[index])) { continue; }
        result.push(this[index]);
    }
    return result.length > 0;
}
function dynamicCompare(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
Array.prototype.dynamicSort = function (prop, dir) {
    if( dir.toString().toLocaleUpperCase() === 'DESC') {
        prop = '-' + prop;
    }
    this.sort(dynamicCompare(prop));
}