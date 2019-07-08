// Sort any array of objects by a property name.
// At time of writing this is from the second response here:
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
export function dynamicSort(property: string) {
    let sortOrder = 1;

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    return (a: any, b: any) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
