const arrayToObject = (arr, keyField, arrObjItemKeyForValue = null, {
	collectInArray = false, collectInObject = false, collObjKeyField = null}) => {
	const obj = {};
	for(let item of arr){
		if(collectInArray){
			if(obj[item[keyField]] === undefined){
				obj[item[keyField]] = [];
			}
			obj[item[keyField]].push(item);
		} else if(collectInObject){
			if(obj[item[keyField]] === undefined){
				obj[item[keyField]] = {};
			}
			obj[item[keyField]][item[collObjKeyField]] = item
		} else if(arrObjItemKeyForValue != null) {
			if(item[arrObjItemKeyForValue] != null){
				obj[item[keyField]] = item[arrObjItemKeyForValue];
			} else {
				throw Error(`${arrObjItemKeyForValue} is not a property of ${item.toString()}`);
			}
		} else {
			obj[item[keyField]] = item;
		}
	}
	return obj;
}

const titleize = word => [word.slice(0,1).toUpperCase(), word.slice(1)].join('');

export { arrayToObject, titleize };
