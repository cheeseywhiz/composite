export function range(a, b, step = 1) {
    const start = b === undefined ? 0 : a;
    const end = b === undefined ? a : b;
    const array = [];
    for (let i = start; i < end; i += step) array.push(i);
    return array;
}

export default function zip(...arrays) {
    const minLength = Math.min(...arrays.map((array) => array.length));
    return range(minLength)
        .map((index) => (
            arrays.map((array) => array[index])
        ))
}
